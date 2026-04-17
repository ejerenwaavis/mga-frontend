import FadeIn from "@/components/FadeIn";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSEO } from "@/hooks/useSEO";

const faqs = [
  {
    q: "What deposits are required?",
    a: "A refundable security deposit is collected prior to pickup. The deposit amount varies by vehicle and is fully refunded upon return of the vehicle in satisfactory condition. Deposit details are provided during the booking or inquiry process.",
  },
  {
    q: "What insurance do I need?",
    a: "Full coverage auto insurance is required for all rentals. You must provide proof of valid insurance before pickup. If you do not have your own coverage, please contact us to discuss available options.",
  },
  {
    q: "What identification is required?",
    a: "A valid driver's license is required for all renters. We also verify your identity as part of our approval process for private rentals. All renters must be at least 25 years of age.",
  },
  {
    q: "What is the difference between Turo and private rentals?",
    a: "Booking on Turo offers instant availability with Turo's built-in insurance and support. Private rentals go through our direct approval process and may offer more flexible terms, competitive pricing, and personalized arrangements.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Cancellation policies vary depending on the booking method. Turo bookings follow Turo's cancellation policy. Private rental cancellations must be made at least 48 hours before the scheduled pickup for a full deposit refund.",
  },
  {
    q: "How does pickup and drop-off work?",
    a: "We offer convenient pickup and drop-off near Hartsfield-Jackson Atlanta International Airport. Specific meeting points and scheduling are confirmed during the booking process. Alternative locations may be arranged upon request.",
  },
  {
    q: "Do you offer long-term or corporate rentals?",
    a: "Yes. We offer extended rental arrangements for individuals and businesses. Long-term and corporate rentals benefit from favorable pricing and flexible terms. Please submit a private inquiry with your needs.",
  },
];

export default function FAQ() {
  useSEO({
    title: "FAQ | Mead Green Autos — Atlanta Car Rental Questions",
    description: "Frequently asked questions about Mead Green Autos car rentals in Atlanta. Deposits, insurance, pickup, corporate rentals, and more.",
    canonical: "https://meadgreenautos.com/faq",
  });
  return (
    <>
      <section className="py-16 md:py-20">
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

      <section className="py-12 md:py-16">
        <div className="container max-w-2xl">
          <FadeIn>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-gray-700">
                  <AccordionTrigger className="text-left font-serif text-base font-semibold text-white hover:text-gray-300">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-gray-300">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
