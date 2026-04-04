import { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import FadeIn from "@/components/FadeIn";
import CTAGroup from "@/components/CTAGroup";

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-slate-200 py-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between text-left focus:outline-none"
            >
                <span className="text-lg font-semibold text-[#022B59] hover:text-secondary transition-colors">
                    {question}
                </span>
                <span className="ml-4 text-slate-500">
                    {isOpen ? <FiMinus size={20} /> : <FiPlus size={20} />}
                </span>
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                    }`}
            >
                <p className="text-slate-600 leading-relaxed">
                    {answer}
                </p>
            </div>
        </div>
    );
};

const FAQSection = () => {
    const faqs = [
        {
            question: "Do you offer chauffeur services in Atlanta?",
            answer: "Yes, we provide professional luxury chauffeur services for clients who prefer to be driven. In addition, we partnered with Black Wolf Security to offer armed executive drivers, giving you an added layer of safety and peace of mind."
        },
        {
            question: "Where is the pickup and drop-off location for exotic car rentals?",
            answer: "All rentals are based out of , Atlanta. Vehicles are typically picked up and dropped off at Nobu in Phipps Plaza. If you’d like your exotic car delivered to you, see the next questions on delivery options."
        },
        {
            question: "How much does it cost to have an exotic car delivered in Georgia?",
            answer: "We offer luxury car delivery within Georgia for an additional fee based on mileage. This allows you to enjoy your exotic rental anywhere in the state without needing to come to ."
        },
        {
            question: "Do you provide out-of-state exotic car delivery?",
            answer: "Yes, we deliver to clients across the Southeast. For example, from  to Birmingham (157 miles), delivery is $1,700 with a 3-day minimum rental. Out-of-state deliveries are best suited for multi-day bookings to make the trip worthwhile."
        }
    ];

    return (
        <div>
            {/* Bottom CTA */}
            <section className="bg-[#062C1B] py-16 md:py-20">
                <div className="container text-center">
                    <FadeIn>
                        <h2 className="font-serif text-2xl font-semibold text-gold md:text-3xl">
                            Ready to Reserve Your Vehicle?
                        </h2>
                        <p className="mx-auto mt-3 max-w-md text-sm text-white">
                            Choose the option that fits your needs — from daily rentals to
                            full-service concierge arrangements.
                        </p>
                        <CTAGroup className="mt-8" />
                    </FadeIn>
                </div>
            </section>
            <section className="mx-auto max-w-3xl px-6 py-12">
                <h2 className="mb-8 text-3xl font-black text-gold text-center uppercase tracking-tight">
                    Frequently Asked Questions
                </h2>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default FAQSection;