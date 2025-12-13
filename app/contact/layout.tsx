import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | CareerCVPro",
  description:
    "Get in touch with CareerCVPro. Contact us via WhatsApp, email, or our contact form for job inquiries, CV services, or general questions. Based in Gauteng, serving all of South Africa.",
  keywords: [
    "contact CareerCVPro",
    "South Africa job support",
    "CV services contact",
    "WhatsApp job help",
    "career support South Africa",
    "job search assistance",
  ],
  openGraph: {
    title: "Contact Us | CareerCVPro",
    description:
      "Get in touch with CareerCVPro via WhatsApp or email. We're here to help with your job search and CV needs.",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
