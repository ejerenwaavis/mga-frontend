export type FAQItem = {
  question: string;
  answer: string;
};

export const faqs: FAQItem[] = [
  {
    question: "What do I need to rent a vehicle?",
    answer:
      "A valid driver’s license, full-coverage auto insurance in your name that transfers to rental vehicles, and a valid payment method are required. If you do not already have rental insurance, contact us before booking for guidance.",
  },
  {
    question: "What is the minimum age to rent?",
    answer:
      "Renters must be at least 21 years old with a valid driver’s license and qualifying full-coverage auto insurance. Certain vehicles and private rental approvals may require drivers to be 25 or older.",
  },
  {
    question: "What deposits are required?",
    answer:
      "A refundable security deposit is required for every rental. Deposit amounts vary by vehicle and are held prior to pickup, then released within 24–48 hours after return once the vehicle is inspected.",
  },
  {
    question: "What insurance do I need?",
    answer:
      "Full coverage auto insurance is required for all rentals. You must provide proof of valid insurance before pickup. If you do not have your own coverage, contact us to discuss available options.",
  },
  {
    question: "What identification is required?",
    answer:
      "A valid driver’s license is required for all renters. We also verify your identity as part of our approval process for private rentals.",
  },
  {
    question: "Do you offer airport pickup and custom delivery?",
    answer:
      "Yes. We offer airport pickup and return at Hartsfield-Jackson Atlanta International Airport, along with custom pickup and delivery throughout Atlanta and Georgia for an additional fee.",
  },
  {
    question: "Is there a mileage limit?",
    answer:
      "Yes. Each vehicle includes a daily mileage allowance. Additional miles may be purchased in advance, and overage charges apply if the mileage limit is exceeded.",
  },
  {
    question: "Are off-roading or unauthorized uses allowed?",
    answer:
      "No. Off-roading, racing, or driving on unpaved or restricted terrain is strictly prohibited. Any damage or recovery costs resulting from prohibited use are the renter’s responsibility.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Cancellations made 48+ hours before pickup qualify for a full refund. Cancellations within 24–48 hours may qualify for a partial refund or reservation credit. Cancellations less than 24 hours before pickup, or no-shows, are non-refundable.",
  },
  {
    question: "Who is responsible for tolls, tickets, or parking violations?",
    answer:
      "The renter is responsible for all tolls, parking fees, tickets, and violations incurred during the rental period, including those received after return. Charges may be processed to the payment method on file.",
  },
];
