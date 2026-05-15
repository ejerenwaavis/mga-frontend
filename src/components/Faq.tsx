import { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import FadeIn from "@/components/FadeIn";
import CTAGroup from "@/components/CTAGroup";

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-white/20 py-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
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

const FAQSection = () => {
    const faqs = [
        {
            question: "What do I need to rent a vehicle?",
            answer: "A valid driver’s license, full-coverage auto insurance in your name that transfers to rental vehicles, and a valid payment method are required."
        },
        {
            question: "What is the minimum age to rent?",
            answer: "Renters must be at least 21 years old with a valid driver’s license and qualifying full-coverage auto insurance. Certain vehicles may require drivers to be 25 or older."
        },
        {
            question: "How much does it cost to have an exotic car delivered in Georgia?",
            answer: "We offer luxury car delivery within Georgia. This allows you to enjoy your exotic rental anywhere in the state without needing to come to ."
        },
        {
            question: "Do you require a security deposit?",
            answer: "Yes. A refundable security deposit is required for every rental. Deposit amounts vary by vehicle and are typically refunded within 24–48 hours after return, pending inspection and any additional charges."
        },
        {
            question: "Do you offer airport pickup and custom delivery?",
            answer: "Yes. We offer airport pickup and return at Hartsfield–Jackson Atlanta International Airport, along with custom pickup and delivery throughout Atlanta for an additional fee."
        },
        {
            question: "Is there a mileage limit?",
            answer: "Yes. Each vehicle includes a daily mileage allowance. Additional miles may be purchased in advance, and overage charges apply if the mileage limit is exceeded."
        },
        {
            question: "Are your vehicles allowed to be used for off-roading?",
            answer: "No. Off-roading or driving on unpaved terrain is strictly prohibited. Any damage, excessive wear, or recovery costs resulting from off-road use will be the renter’s responsibility."
        },
        {
            question: "What is your cancellation policy?",
            answer: "Cancellations made 48+ hours before pickup qualify for a full refund. Cancellations made within 24–48 hours may qualify for a partial refund or reservation credit. Cancellations made less than 24 hours before pickup, or no-shows, are non-refundable."
        },
        {
            question: "Are there smoking or cleaning fees?",
            answer: "Smoking or vaping is strictly prohibited. Vehicles returned excessively dirty may result in a $150 cleaning fee, while smoke-related cleaning starts at $300."
        },
        {
            question: "Who is responsible for tolls, tickets, or parking violations?",
            answer: "The renter is responsible for all tolls, parking fees, tickets, and violations incurred during the rental period, including those received after return. Charges may be processed to the payment method on file."
        }
    ];

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
                            Select the rental option that works best for your schedule and travel plans..
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
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default FAQSection;
