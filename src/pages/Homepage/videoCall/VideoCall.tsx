import React, { useEffect, useRef, useState } from "react";
import socket from "../../../api/socket";
import { useNavigate, useParams, useLocation } from "react-router-dom";

type CallState = "calling" | "incoming" | "connected" | "ended";

const VideoCall = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { isIncoming, callerId } = location.state || {};

  const [callState, setCallState] = useState<CallState>(
    isIncoming ? "incoming" : "calling"
  );

  const localVideo = useRef<HTMLVideoElement>(null);
  const remoteVideo = useRef<HTMLVideoElement>(null);
  const peer = useRef<RTCPeerConnection | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

 const startCamera = async () => {
  try {
    if (streamRef.current) return streamRef.current;

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    streamRef.current = stream;

    if (localVideo.current) {
      localVideo.current.srcObject = stream;
    }

    return stream;
  } catch (err) {
    console.error("❌ Camera/Mic permission error:", err);
    alert("Camera or Mic permission denied");
  }
};


  const createPeer = () => {
    if (peer.current) return peer.current;

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    pc.ontrack = (e) => {
      if (remoteVideo.current) {
        remoteVideo.current.srcObject = e.streams[0];
      }
    };

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit("ice-candidate", { chatId, candidate: e.candidate });
      }
    };

    peer.current = pc;
    return pc;
  };

  const createOffer = async () => {
    const stream = await startCamera();
    const pc = createPeer();
    stream.getTracks().forEach((t) => pc.addTrack(t, stream));

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    socket.emit("webrtc-offer", { chatId, offer });
  };

  useEffect(() => {
    socket.on("call-accepted", () => setCallState("connected"));
    socket.on("call-rejected", () => setCallState("ended"));
    socket.on("call-ended", () => setCallState("ended"));

    socket.on("webrtc-offer", async ({ offer }) => {
      const stream = await startCamera();
      const pc = createPeer();
      stream.getTracks().forEach((t) => pc.addTrack(t, stream));

      await pc.setRemoteDescription(offer);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      socket.emit("webrtc-answer", { chatId, answer });
    });

    socket.on("webrtc-answer", async ({ answer }) => {
      await peer.current?.setRemoteDescription(answer);
    });

    socket.on("ice-candidate", async ({ candidate }) => {
      await peer.current?.addIceCandidate(candidate);
    });

    return () => socket.off();
  }, []);

  useEffect(() => {
  if (callState === "connected" && !isIncoming) {
    startCamera().then(createOffer);
  }
}, [callState]);


  const endCall = () => {
    socket.emit("end-video-call", { chatId });
    setCallState("ended");
  };

  useEffect(() => {
    if (callState === "ended") {
      setTimeout(() => navigate(-1), 500);
    }
  }, [callState]);

  if (callState === "calling") {
    return <button onClick={endCall}>Cancel</button>;
  }

  if (callState === "incoming") {
    return (
      <>
        <button
          onClick={async() => {
             await startCamera();   
            socket.emit("accept-video-call", {
              chatId,
              callerId,
            });
            setCallState("connected");
          }}
        >
          Accept
        </button>

        <button
          onClick={() => {
            socket.emit("reject-video-call", {
              chatId,
              callerId,
            });
            setCallState("ended");
          }}
        >
          Reject
        </button>
      </>
    );
  }

  if (callState === "connected") {
    return (
      <>
       <video
  ref={localVideo}
  autoPlay
  muted        // 👈 REQUIRED
  playsInline  // 👈 REQUIRED (mobile)
  className="w-40 h-56"
/>

<video
  ref={remoteVideo}
  autoPlay
  playsInline
  className="w-full h-full"
/>
        <button onClick={endCall}>End</button>
      </>
    );
  }

  return <h2>Call Ended</h2>;
};

export default VideoCall;
