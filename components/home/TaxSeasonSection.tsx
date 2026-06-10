import AnimatedSection from "@/components/shared/AnimatedSection";

export default function TaxSeasonSection() {
  return (
    <section className="bg-white py-16 lg:py-20 border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="font-display font-bold text-[#082B5C] text-3xl lg:text-4xl xl:text-5xl leading-tight mb-5">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] to-[#FF8500]">
              Tax Season
            </span>{" "}
            isn&apos;t a surprise when you<br className="hidden sm:block" /> have a proactive strategy.
          </h2>
          <p className="text-[#6B7280] text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            Our year-round process combines planning, software, and a team of experts tailored to your industry, location, and goals.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
