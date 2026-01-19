import React, { useState, useEffect, useRef } from "react";
import socket from "../../../api/socket";
import { useParams, useNavigate, useLocation } from "react-router-dom";

type CallState = "calling" | "incoming" | "connected" | "ended";

const VideoCall = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const isIncoming = location.state?.isIncoming || false;

  const [callState, setCallState] = useState<CallState>(
    isIncoming ? "incoming" : "calling"
  );

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  /* ---------------- CAMERA ---------------- */

  const startCamera = async () => {
    if (localStreamRef.current) return localStreamRef.current;

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    localStreamRef.current = stream;
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }
    return stream;
  };

  /* ---------------- PEER ---------------- */

  const createPeer = () => {
    if (peerRef.current) return peerRef.current;

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    pc.ontrack = (e) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = e.streams[0];
      }
    };

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit("ice-candidate", { chatId, candidate: e.candidate });
      }
    };

    peerRef.current = pc;
    return pc;
  };

  const addTracks = (pc: RTCPeerConnection, stream: MediaStream) => {
    stream.getTracks().forEach((t) => pc.addTrack(t, stream));
  };

  /* ---------------- OFFER (CALLER) ---------------- */

  const createOffer = async () => {
    const stream = await startCamera();
    const pc = createPeer();
    addTracks(pc, stream);

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    socket.emit("webrtc-offer", { chatId, offer });
  };

  /* ---------------- SOCKET EVENTS ---------------- */

  useEffect(() => {
    if (!chatId) return;

    if (!isIncoming) {
      socket.emit("start-video-call", { chatId });
    }

    socket.on("call-accepted", () => setCallState("connected"));
    socket.on("call-rejected", () => setCallState("ended"));
    socket.on("call-ended", () => setCallState("ended"));

    socket.on("webrtc-offer", async ({ offer }) => {
      const stream = await startCamera();
      const pc = createPeer();
      addTracks(pc, stream);

      await pc.setRemoteDescription(offer);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      socket.emit("webrtc-answer", { chatId, answer });
    });

    socket.on("webrtc-answer", async ({ answer }) => {
      if (peerRef.current) {
        await peerRef.current.setRemoteDescription(answer);
      }
    });

    socket.on("ice-candidate", async ({ candidate }) => {
      if (peerRef.current) {
        await peerRef.current.addIceCandidate(candidate);
      }
    });

    return () => {
      socket.off("call-accepted");
      socket.off("call-rejected");
      socket.off("call-ended");
      socket.off("webrtc-offer");
      socket.off("webrtc-answer");
      socket.off("ice-candidate");
    };
  }, [chatId, isIncoming]);

  /* ---------------- START OFFER WHEN CONNECTED ---------------- */

  useEffect(() => {
    if (callState === "connected" && !isIncoming) {
      createOffer();
    }
  }, [callState]);

  /* ---------------- END CALL ---------------- */

  const endCall = () => {
    socket.emit("end-video-call", { chatId });
    setCallState("ended");
  };

  useEffect(() => {
    if (callState === "ended") {
      const t = setTimeout(() => navigate(-1), 800);
      return () => clearTimeout(t);
    }
  }, [callState]);

  /* ---------------- UI ---------------- */

  if (callState === "calling") {
    return (
      <Screen>
        <h2>Calling…</h2>
        <button onClick={endCall}>Cancel</button>
      </Screen>
    );
  }

  if (callState === "incoming") {
    return (
      <Screen>
        <h2>📞 Incoming Call</h2>
        <button onClick={() => {
          socket.emit("accept-video-call", { chatId });
          setCallState("connected");
        }}>Accept</button>
        <button onClick={endCall}>Reject</button>
      </Screen>
    );
  }

  if (callState === "connected") {
    return (
    <div className="relative w-full h-screen bg-black overflow-hidden">

  {/* Remote Video */}
  <video
    ref={remoteVideoRef}
    autoPlay
    playsInline
    className="
      w-full h-full
      object-cover
      rounded-none
    "
  />

  {/* Local Video (Picture-in-Picture) */}
  <video
    ref={localVideoRef}
    autoPlay
    muted
    playsInline
    className="
      absolute
      bottom-5 right-5
      w-[140px] h-[200px]
      object-cover
      rounded-xl
      border-2 border-white/80
      shadow-2xl
      z-10
    "
  />


        <button
          onClick={endCall}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-red-600 px-6 py-3 rounded-full text-white"
        >
          End Call
        </button>
      </div>
    );
  }

  return (
    <Screen>
      <h2>Call Ended</h2>
    </Screen>
  );
};

/* ---------------- UI HELPER ---------------- */

const Screen = ({ children }: { children: React.ReactNode }) => (
  <div className="h-screen bg-black text-white flex items-center justify-center">
    <div className="text-center space-y-4">{children}</div>
  </div>
);

export default VideoCall;
