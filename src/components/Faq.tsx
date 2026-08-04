import { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import FadeIn from "@/components/FadeIn";
import CTAGroup from "@/components/CTAGroup";
import { useQuery } from "react-query";
import { getAllFaqsQuery } from "@/services/queries";
import { faqs as staticFaqs } from "@/lib/faqs";

const FAQItem = ({ question, answer, onToggle }: { question: string; answer: string; onToggle?: (isOpen: boolean) => void }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        if (onToggle) onToggle(newState);
    };

    return (
        <div className="border-b border-white/20 py-4">
            <button
                onClick={handleClick}
                className="flex w-full items-center justify-between text-left focus:outline-none"
            >
                <span className="text-lg font-semibold text-gold hover:text-gold/80 transition-colors">
                    {question}
                </span>
                <span className="ml-4 text-white/60">
                    {isOpen ? <FiMinus size={20} /> : <FiPlus size={20} />}
                </span>
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                    }`}
            >
                <p className="text-white/80 leading-relaxed">
                    {answer}
                </p>
            </div>
        </div>
    );
};

const FAQSection = ({ onAnyOpenChange }: { onAnyOpenChange?: (isOpen: boolean) => void }) => {
    const { data: faqData, isLoading } = useQuery("faqs", getAllFaqsQuery);
    const [openCount, setOpenCount] = useState(0);
    
    // Fallback to static faqs if the API fails or is loading and we want to show something
    const displayFaqs = faqData?.faqs && faqData.faqs.length > 0 ? faqData.faqs : staticFaqs;

    const handleToggle = (isOpen: boolean) => {
        setOpenCount(prev => {
            const next = isOpen ? prev + 1 : prev - 1;
            if (onAnyOpenChange) {
                onAnyOpenChange(next > 0);
            }
            return next;
        });
    };

    return (
        <div>
            {/* CTA Section - removed background */}
            <section className="py-16 md:py-20">
                <div className="container text-center">
                    <FadeIn>
                        <h2 className="font-serif text-2xl font-semibold text-gold md:text-3xl">
                            Ready to Reserve Your Vehicle?
                        </h2>
                        <p className="mx-auto mt-3 max-w-md text-sm text-white/90">
                            Select the rental option that works best for your schedule and travel plans
                        </p>
                        <CTAGroup className="mt-8" />
                    </FadeIn>
                </div>
            </section>
            
            {/* FAQ Section - removed white background */}
            <section className="mx-auto max-w-3xl px-6 py-12">
                <h2 className="mb-8 text-3xl font-black text-gold text-center uppercase tracking-tight">
                    Frequently Asked Questions
                </h2>
                <div className="rounded-2xl p-6">
                    {isLoading && !faqData ? (
                        <div className="text-white/60 text-center">Loading FAQs...</div>
                    ) : (
                        displayFaqs.map((faq, index) => (
                            <FAQItem key={index} question={faq.question} answer={faq.answer} onToggle={handleToggle} />
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};

export default FAQSection;
