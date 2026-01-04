import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header, Footer } from "@/components/layout";
import PlausibleProvider from "next-plausible";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.careercvpro.co.za"),
  title: {
    default:
      "CareerCVPro - South Africa's Career Platform | Jobs & CV Services",
    template: "%s | CareerCVPro",
  },
  description:
    "We don't just post jobs — we help South Africans get hired. Find jobs in Gauteng, Western Cape, KZN and across South Africa. Professional CV writing services available.",
  keywords: [
    "CareerCVPro",
    "Career CV Pro",
    "jobs in South Africa",
    "South Africa jobs",
    "Gauteng jobs",

    "Western Cape jobs",
    "KwaZulu-Natal jobs",
    "CV writing South Africa",
    "career tips",
    "job search",
    "entry level jobs",
    "no experience jobs",
  ],
  authors: [{ name: "CareerCVPro" }],
  creator: "CareerCVPro",
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://www.careercvpro.co.za",
    siteName: "CareerCVPro",
    title: "CareerCVPro - South Africa's Career Platform",
    description:
      "We don't just post jobs — we help South Africans get hired. Find jobs and professional CV services.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CareerCVPro - South Africa's Career Platform",
    description:
      "We don't just post jobs — we help South Africans get hired. Find jobs and professional CV services.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "DoD7GnGpnyUcImuz1a-jfjSkdUUs05EZbweXpEaa0x8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <PlausibleProvider
          domain="careercvpro.co.za"
          customDomain="https://plausible.tredique.com"
          selfHosted
          trackOutboundLinks
        />
        <Script
          src="https://rybbit.tredique.com/api/script.js"
          data-site-id="1"
          data-session-replay="true"
          data-track-errors="true"
          strategy="lazyOnload"
        />
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '910425904839963');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=910425904839963&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main className="min-h-screen pt-16 lg:pt-[7.25rem]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
