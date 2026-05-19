import FadeIn from "@/components/FadeIn";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSEO } from "@/hooks/useSEO";
import { faqs } from "@/lib/faqs";

export default function FAQ() {
  useSEO({
    title: "FAQ | Mead Green Autos — Atlanta Car Rental Questions",
    description: "Frequently asked questions about Mead Green Autos car rentals in Atlanta. Deposits, insurance, pickup, corporate rentals, and more.",
    canonical: "https://meadgreenautos.com/faq",
  });
  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-8 md:pt-32 md:pb-12">
        <div className="container text-center">
          <FadeIn>
            <h1 className="font-serif text-3xl font-semibold text-white md:text-4xl">
              Frequently Asked Questions
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-sm text-gray-300">
              Answers to common questions about our vehicles, policies, and
              rental process.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Content Section with White Container */}
      <section className="pb-20 md:pb-28">
        <div className="container max-w-3xl">
          <FadeIn>
            <div className="rounded-xl bg-white p-6 shadow-lg md:p-8">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border-gray-200 last:border-0">
                    <AccordionTrigger className="text-left font-serif text-base font-semibold text-gray-900 hover:text-gray-600">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
