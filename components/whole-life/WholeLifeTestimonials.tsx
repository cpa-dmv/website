
"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    names: "Arjun Mehta & Emily Carter",
    location: "Virginia",
    quote:
      "Our biggest challenge was the different expectations we brought into the relationship. Family traditions, responsibilities and our ideas about the future often pulled us in different directions. WholeLife helped us have those conversations more openly and find practical common ground.",
  },
  {
    names: "Priya Kapoor & Daniel Brooks",
    location: "Maryland",
    quote:
      "We had never really discussed how we would manage finances, family responsibilities and major decisions after marriage. WholeLife helped us address these questions before they became sources of resentment.",
  },
  {
    names: "James Anderson & Sophie Bennett",
    location: "California",
    quote:
      "A career opportunity meant that relocation suddenly became a decision about our relationship as well. The guidance helped us look at the situation from both perspectives instead of treating it as one person's career decision.",
  },
  {
    names: "Michael Thompson & Claire Wilson",
    location: "Washington, D.C.",
    quote:
      "Becoming parents changed the way we approached our relationship. We agreed on what we wanted for our children, but not always on how to get there. The conversations helped us understand each other's priorities.",
  },
  {
    names: "Ethan Miller & Olivia Parker",
    location: "New Jersey",
    quote:
      "We had become comfortable avoiding difficult conversations because they usually ended in an argument. WholeLife gave us a neutral space to address issues we had been putting aside.",
  },
  {
    names: "Lucas Martin & Emma Laurent",
    location: "Texas",
    quote:
      "Our differences were never the problem by themselves. The difficulty came when they affected everyday decisions and expectations. WholeLife helped us recognise where we were interpreting the same situation differently.",
  },
  {
    names: "Alexander Brown & Isabella Rossi",
    location: "New York",
    quote:
      "We were preparing for marriage and realised that we had never discussed some very practical questions — finances, lifestyle, family expectations and long-term plans. The process helped us approach those conversations with much more clarity.",
  },
  {
    names: "Daniel Harris & Amelia Johnson",
    location: "Virginia",
    quote:
      "We had been together for years, but certain disagreements kept returning in different forms. The guidance helped us look beyond individual arguments and understand the patterns behind them.",
  },
  {
    names: "Ryan Mitchell & Sophia Reed",
    location: "Florida",
    quote:
      "We had different ideas about balancing work, family, and our personal lives. Dr. Praveen helped us look at the bigger picture and approach these conversations with greater clarity. We came away with a better understanding of each other's priorities.",
  },
  {
    names: "Nathan Wilson & Grace Bennett",
    location: "Illinois",
    quote:
      "We were struggling to communicate without becoming defensive. Dr. Praveen's guidance helped us slow down, listen more carefully, and focus on resolving the issue rather than winning the argument.",
  },
  {
    names: "Christopher Evans & Maya Sharma",
    location: "Virginia",
    quote:
      "Combining two families and their expectations was more complicated than we had anticipated. Dr. Praveen helped us discuss boundaries, responsibilities, and family involvement in a constructive way.",
  },
  {
    names: "Benjamin Scott & Hannah Lewis",
    location: "Maryland",
    quote:
      "We wanted to make thoughtful decisions before getting married, particularly around finances, future goals, and responsibilities. Dr. Praveen helped us structure those conversations and identify areas where we needed greater clarity.",
  },
  {
    names: "Matthew Turner & Isabella Garcia",
    location: "Texas",
    quote:
      "Our relationship was strong, but we had different approaches to handling stress and disagreements. WholeLife gave us a framework for understanding those differences. Dr. Praveen's practical approach made the discussions feel manageable.",
  },
  {
    names: "Andrew Parker & Chloe Martin",
    location: "New York",
    quote:
      "We had been postponing conversations about our long-term plans because we worried they might create unnecessary tension. Dr. Praveen helped us approach these topics openly and consider each other's perspectives without pressure.",
  },
];

const carouselItems = [...testimonials, ...testimonials];

export default function WholeLifeTestimonials() {
  return (
    <section
      aria-labelledby="wholelife-testimonials-heading"
      className="overflow-hidden bg-[#f7f5f1] py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto mb-9 max-w-7xl px-5 text-center sm:mb-11 sm:px-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#c87568] sm:text-sm">
          Words from couples
        </p>

        <h2
          id="wholelife-testimonials-heading"
          className="text-3xl font-semibold tracking-tight text-[#263f57] sm:text-4xl lg:text-[42px]"
        >
          Every relationship has a story.
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#596674] sm:text-base sm:leading-7">
          Real challenges. Thoughtful conversations. A clearer path forward.
        </p>

        <div className="mx-auto mt-5 h-1 w-14 rounded-full bg-[#c87568]" />
      </div>

      <div className="group relative">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#f7f5f1] to-transparent sm:w-16 lg:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#f7f5f1] to-transparent sm:w-16 lg:w-24" />

        <motion.div
          className="flex w-max gap-5 pr-5 sm:gap-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 100,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{ willChange: "transform" }}
        >
          {carouselItems.map((testimonial, index) => (
            <article
              key={`${testimonial.names}-${index}`}
              aria-label={`${testimonial.names}, ${testimonial.location}`}
              className="flex w-[290px] shrink-0 flex-col rounded-2xl border border-[#263f57]/10 bg-white p-5 shadow-[0_5px_22px_rgba(38,63,87,0.05)] transition-shadow duration-300 hover:shadow-[0_12px_30px_rgba(38,63,87,0.12)] sm:w-[340px] sm:p-6"
            >
              <div
                aria-hidden="true"
                className="mb-3 font-serif text-4xl leading-none text-[#c87568]"
              >
                “
              </div>

              <blockquote className="flex-1 text-sm leading-6 text-[#465362]">
                {testimonial.quote}
              </blockquote>

              <div className="mt-5 border-t border-[#263f57]/10 pt-4">
                <p className="text-sm font-semibold leading-5 text-[#263f57]">
                  {testimonial.names}
                </p>
                <p className="mt-1 text-xs text-[#89929b]">
                  {testimonial.location}
                </p>
              </div>
            </article>
          ))}
        </motion.div>
      </div>

      <p className="mt-6 text-center text-xs text-[#89929b]">
        <span aria-hidden="true">← </span>
        Stories of understanding and connection
        <span aria-hidden="true"> →</span>
      </p>

      <style jsx>{`
        .group:hover > div {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .group > div {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
