const TestimonialsSection: React.FC = () => {
  return (
    <section className="w-full bg-orange-500 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        
        {/* Heading */}
        <h2 className="text-center text-3xl md:text-4xl font-bold text-white">
          Our blessed client <br className="sm:hidden" />
          said about us 😍
        </h2>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Card 1 */}
          <TestimonialCard
            title="Incredible Experience"
            text="We had an incredible experience working with Mixland and were impressed they made such a big difference in only three weeks. Our team is so grateful for the wonderful improvements they made and their ability to get familiar with the concept so quickly."
            name="Wade Warren"
            role="CEO, ABC Corporation"
            img="https://i.pravatar.cc/80?img=11"
          />

          {/* Card 2 */}
          <TestimonialCard
            title="Dependable, Responsive, Professional"
            text="Fermin Apps has collaborated with Mixland team for several projects such as Photo Sharing Apps and Custom Social Networking Apps. The experience has been pleasant, professional and exceeding our expectations. The team is always thinking beyond."
            name="Esther Howard"
            role="CEO, ABC Corporation"
            img="https://i.pravatar.cc/80?img=32"
          />

        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

/* ---------------- SUB COMPONENT ---------------- */

interface CardProps {
  title: string;
  text: string;
  name: string;
  role: string;
  img: string;
}

const TestimonialCard = ({ title, text, name, role, img }: CardProps) => {
  return (
    <div className="relative bg-white rounded-2xl px-6 pt-8 pb-10 text-center shadow-lg">
      
      <h3 className="text-orange-500 font-semibold text-lg">
        “{title}”
      </h3>

      <p className="mt-4 text-gray-600 text-sm leading-relaxed">
        {text}
      </p>

      {/* Speech Bubble Tail */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rotate-45" />

      {/* Author */}
      <div className="mt-10 flex flex-col items-center">
        <img
          src={img}
          alt={name}
          className="h-12 w-12 rounded-full border-4 border-orange-500"
        />
        <p className="mt-3 font-semibold text-white">{name}</p>
        <p className="text-sm text-white/80">{role}</p>
      </div>
    </div>
  );
};
