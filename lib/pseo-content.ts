/**
 * pSEO Content Library
 *
 * Unique content for each category+location and city page
 * Per Section 10-12 requirements: Each page needs unique intro paragraph (100-150 words) and FAQs
 */

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PSEOPageContent {
  introContent: string;
  metaDescription: string;
  faqs: FAQItem[];
  jobCount?: number;
  averageSalary?: string;
  topEmployers?: string[];
}

// ============================================
// Category + Location Content
// ============================================

type CategoryLocationKey = `${string}-${string}`;

const categoryLocationContent: Record<CategoryLocationKey, PSEOPageContent> = {
  // Gauteng - Security
  "security-gauteng": {
    introContent: `Gauteng is the heart of South Africa's security industry, employing over 50,000 security professionals across Johannesburg, Pretoria, and surrounding areas. From armed response officers patrolling Sandton's business district to access control personnel at major shopping centres, security careers in Gauteng offer stable employment with growth opportunities. The province's high-value commercial properties, banks, and residential estates create constant demand for qualified security officers. Companies like ADT, Fidelity, and G4S maintain their largest operations here. With PSIRA registration and Grade certifications, you can access roles paying R6,000 to R15,000 monthly, with armed response positions commanding premium salaries.`,
    metaDescription:
      "Find security jobs in Gauteng. Browse armed response, access control & security officer positions in Johannesburg, Pretoria & Sandton. PSIRA certified roles available.",
    faqs: [
      {
        question: "What is the average security officer salary in Gauteng?",
        answer:
          "Entry-level security officers in Gauteng typically earn R4,500-R6,500 per month. Armed response officers earn R7,000-R12,000, while supervisory roles pay R10,000-R18,000. Sandton-based corporate security positions often pay 20-30% more than suburban roles.",
      },
      {
        question:
          "Do I need PSIRA registration to work as a security officer in Gauteng?",
        answer:
          "Yes, PSIRA (Private Security Industry Regulatory Authority) registration is legally required for all security work in South Africa, including Gauteng. You'll need at least Grade E for basic security work, with Grades A-D required for armed positions.",
      },
      {
        question: "Which areas in Gauteng have the most security jobs?",
        answer:
          "Sandton has the highest concentration of security jobs due to corporate offices and malls. Pretoria East and Centurion have growing demand. Industrial areas like Kempton Park and Midrand also employ many security personnel for warehouse and logistics operations.",
      },
      {
        question:
          "What qualifications do I need for armed response jobs in Gauteng?",
        answer:
          "Armed response positions require: valid PSIRA Grade C or higher, firearm competency certificate, driver's license (Code 8 or 10), clean criminal record, and at least 2 years security experience. Some companies require SASSETA or similar tactical training.",
      },
    ],
  },

  // Gauteng - Retail
  "retail-gauteng": {
    introContent: `Gauteng dominates South Africa's retail sector, with Johannesburg and Pretoria housing the country's largest shopping centres including Sandton City, Mall of Africa, and Menlyn Park. The province offers thousands of retail positions from entry-level cashiers to store managers. Major retailers like Shoprite, Pick n Pay, Woolworths, and Clicks maintain their headquarters here, creating management and head office opportunities alongside in-store roles. Black Friday and December holiday seasons see retail hiring surge by 40%. With customer service skills and Grade 12, you can start at R4,500 monthly as a sales assistant, progressing to R15,000+ as a department or store manager within 3-5 years.`,
    metaDescription:
      "Find retail jobs in Gauteng. Browse cashier, sales assistant & store manager positions at Sandton City, Mall of Africa & more. Apply today!",
    faqs: [
      {
        question: "What is the minimum wage for retail workers in Gauteng?",
        answer:
          "The national minimum wage is R27.58 per hour (2024), approximately R4,800 monthly. However, most Gauteng retailers pay R5,000-R6,500 for full-time sales assistants, with Sandton and upmarket areas typically paying R500-R1,000 more.",
      },
      {
        question: "Do retail jobs in Gauteng require experience?",
        answer:
          "Many entry-level retail positions don't require experience - just Grade 12 and good communication skills. However, having 6-12 months retail experience significantly improves your chances. Most stores provide on-the-job training for POS systems and product knowledge.",
      },
      {
        question: "Which Gauteng malls hire the most retail staff?",
        answer:
          "Mall of Africa (Midrand), Sandton City, Eastgate, Menlyn Park, and Clearwater Mall are the largest employers. Newer malls like Fourways Mall and Rosebank Mall also have frequent openings, especially for anchor tenants like Edgars, Woolworths, and Game.",
      },
      {
        question:
          "Are there management trainee programs for retail in Gauteng?",
        answer:
          "Yes! Major retailers like Shoprite, Pick n Pay, and Massmart run graduate trainee programs based in Gauteng. These typically require a degree/diploma in retail management, business, or marketing, and lead to store management roles within 18-24 months.",
      },
    ],
  },

  // Gauteng - Call Centre
  "call-centre-gauteng": {
    introContent: `Gauteng is South Africa's call centre capital, with major hubs in Johannesburg CBD, Sandton, Midrand, and Centurion employing over 100,000 agents. International companies like Amazon, Microsoft, and Discovery have established contact centres here, alongside local giants like Vodacom, MTN, and the major banks. Call centre work offers flexible shifts, performance bonuses, and career progression from agent to team leader within 12-18 months. Entry requirements are typically just Grade 12 with clear communication skills. Inbound customer service roles start at R6,000-R8,000 monthly, while outbound sales positions with commission can earn R10,000-R20,000. Sandton-based centres typically pay 15-20% premiums.`,
    metaDescription:
      "Find call centre jobs in Gauteng. Browse customer service, technical support & sales agent positions in Johannesburg & Pretoria. Flexible shifts available.",
    faqs: [
      {
        question:
          "What qualifications do I need for call centre jobs in Gauteng?",
        answer:
          "Most call centres require only Grade 12 (Matric) and clear communication in English and one other SA language. Computer literacy is essential. Some technical support roles require N+ or A+ certifications, while financial services centres prefer candidates with banking knowledge.",
      },
      {
        question: "What are the working hours for call centre jobs in Gauteng?",
        answer:
          "Call centres operate various shifts: day (8am-5pm), afternoon (12pm-9pm), night (6pm-3am), and 24/7 operations with rotating shifts. Many centres offer work-from-home options post-COVID. Weekend work is common, especially in customer service roles.",
      },
      {
        question: "Which areas in Gauteng have the most call centre jobs?",
        answer:
          "The top call centre hubs are: Sandton (Discovery, banks), Midrand (Amazon, Microsoft), Centurion (government, insurance), Braamfontein (various BPOs), and Pretoria CBD (telcos, government). Rosebank and Illovo also have growing call centre presence.",
      },
      {
        question: "Do call centre jobs in Gauteng offer career growth?",
        answer:
          "Absolutely. Typical progression: Agent → Senior Agent (6-12 months) → Team Leader (12-24 months) → Quality Analyst or Trainer (24-36 months) → Operations Manager. Top performers can reach management within 3-4 years, earning R25,000-R45,000 monthly.",
      },
    ],
  },

  // Gauteng - Admin
  "admin-gauteng": {
    introContent: `Gauteng's concentration of corporate headquarters, government departments, and professional services firms creates South Africa's largest market for administrative professionals. From executive assistants supporting CEOs in Sandton high-rises to data capturers in Pretoria's government buildings, admin roles span every industry. Key skills like MS Office proficiency, filing, and basic bookkeeping open doors to positions paying R8,000-R15,000 monthly. Receptionists and admin clerks start at R6,000-R8,000, while experienced office managers earn R18,000-R30,000. The province's business districts in Sandton, Rosebank, Centurion, and Pretoria CBD offer the highest-paying opportunities, often with benefits like medical aid and pension contributions.`,
    metaDescription:
      "Find admin jobs in Gauteng. Browse receptionist, office administrator & secretary positions in Johannesburg & Pretoria. Apply to top companies today!",
    faqs: [
      {
        question: "What skills are required for admin jobs in Gauteng?",
        answer:
          "Essential skills include: MS Office (Word, Excel, Outlook), typing speed 40+ WPM, filing and document management, professional phone manner, and basic bookkeeping. Advanced roles require SAP, Pastel, or industry-specific software knowledge. A diploma in office administration is advantageous but not always required.",
      },
      {
        question:
          "What is the salary range for administrative assistants in Gauteng?",
        answer:
          "Admin assistant salaries in Gauteng range from R7,000 (entry-level) to R18,000 (senior/executive level). Sandton and Rosebank typically pay 20% more than other areas. Legal and financial sector admin roles command premiums of R2,000-R5,000 over general admin positions.",
      },
      {
        question:
          "Are there admin jobs in Gauteng for people without experience?",
        answer:
          "Yes, many companies hire entry-level admin staff and provide training. Positions like data capturer, filing clerk, and junior receptionist typically require only Grade 12. Temp agencies like Kelly, Adcorp, and Quest place many first-time admin workers in Gauteng offices.",
      },
      {
        question: "Which industries hire the most admin staff in Gauteng?",
        answer:
          "Top employers: Financial services (banks, insurance), Legal firms (Sandton, Johannesburg), Mining head offices, Government departments (Pretoria), Healthcare (private hospitals), Property and real estate, and Manufacturing head offices in Midrand/Kempton Park.",
      },
    ],
  },

  // Gauteng - IT
  "it-gauteng": {
    introContent: `Gauteng anchors South Africa's tech ecosystem, with Johannesburg, Sandton, and Pretoria hosting everything from global tech giants to innovative startups. Microsoft, Amazon AWS, IBM, and Accenture maintain significant operations here, while local unicorns and scale-ups cluster around Braamfontein, Rosebank, and Woodmead. IT roles span software development, network engineering, cybersecurity, cloud architecture, and data science. Junior developers start at R15,000-R25,000 monthly, mid-level earns R35,000-R55,000, and senior/lead positions command R70,000-R120,000+. Remote work is common, but Sandton-based roles often include car allowances and premium benefits. The skills shortage means qualified IT professionals have multiple offers within weeks.`,
    metaDescription:
      "Find IT jobs in Gauteng. Browse software developer, network engineer & cybersecurity positions in Johannesburg & Sandton. Top tech salaries available.",
    faqs: [
      {
        question: "What are the most in-demand IT skills in Gauteng?",
        answer:
          "Highest demand in 2024-2025: Cloud (AWS, Azure, GCP), Python/JavaScript development, DevOps/CI-CD, Cybersecurity (especially SOC analysts), Data Engineering, React/Angular frontend, and SAP consultants. Java and .NET remain steady for enterprise roles.",
      },
      {
        question: "What is the average IT salary in Johannesburg?",
        answer:
          "Junior (0-2 years): R180k-R300k p.a. | Mid (3-5 years): R400k-R650k p.a. | Senior (6-10 years): R700k-R1M p.a. | Lead/Architect: R1M-R1.8M p.a. Contractors typically earn 30-50% more but without benefits. Sandton and consulting firms pay top rates.",
      },
      {
        question: "Do IT jobs in Gauteng offer remote work?",
        answer:
          "Yes, most IT roles offer hybrid (2-3 days office) or fully remote options post-COVID. Approximately 60% of Gauteng tech jobs are hybrid, 25% fully remote, and 15% fully on-site (usually government or banking). Remote roles may have slightly lower salaries than on-site Sandton positions.",
      },
      {
        question: "Which companies hire the most IT professionals in Gauteng?",
        answer:
          "Top employers: Banks (FNB, Standard Bank, Nedbank, Absa), Consulting (Accenture, Deloitte, PwC), Tech giants (Microsoft, Amazon, IBM), Telecoms (Vodacom, MTN), Insurance (Discovery, Sanlam), and startups in Braamfontein's Tshimologong precinct and Rosebank area.",
      },
    ],
  },

  // Western Cape - Security
  "security-western-cape": {
    introContent: `The Western Cape's security industry serves a unique mix of tourist hotspots, wine estates, and residential communities across Cape Town and surrounds. From guarding the V&A Waterfront and upmarket Constantia estates to patrolling Stellenbosch's university campus, security professionals enjoy diverse work environments. The province employs approximately 25,000 registered security personnel, with companies like Chubb, Thorburn, and ADT leading recruitment. Cape Town CBD and Century City have the highest demand for corporate security, while estate security in the Winelands offers scenic postings. Salaries range from R5,000 for basic guarding to R12,000+ for armed response, with tourist-area positions sometimes including accommodation benefits.`,
    metaDescription:
      "Find security jobs in Western Cape. Browse armed response, estate security & access control positions in Cape Town & Stellenbosch. PSIRA roles available.",
    faqs: [
      {
        question:
          "What security jobs are available in Cape Town's tourism areas?",
        answer:
          "Tourist areas like V&A Waterfront, Sea Point, and Camps Bay hire security for hotels, restaurants, and attractions. These roles often require customer service skills alongside security training. Pay is R5,500-R8,000 with potential tips at hospitality venues.",
      },
      {
        question: "Are there security jobs in the Cape Winelands?",
        answer:
          "Yes, wine estates in Stellenbosch, Franschhoek, and Paarl hire estate security officers. These positions often include accommodation and meals. Requirements typically include driver's license, PSIRA Grade D+, and some positions require firearms competency for farm protection.",
      },
      {
        question: "What is the demand for security officers in Cape Town?",
        answer:
          "Demand remains strong due to high property values and tourism. The CBD, Century City, and N1 City corridor have consistent openings. Seasonal peaks occur during tourist season (December-January) and major events like the Cape Town Cycle Tour and Jazz Festival.",
      },
      {
        question: "Which security companies hire in Western Cape?",
        answer:
          "Major employers: ADT Security, Chubb, Fidelity ADT, G4S, Thorburn Security, CSS Tactical, and Hi-Tech Security. Estate security companies like Vox Telecoms Security and local neighborhood watches also employ in the southern suburbs and Atlantic Seaboard.",
      },
    ],
  },

  // Western Cape - Retail
  "retail-western-cape": {
    introContent: `The Western Cape retail sector spans Cape Town's world-class shopping destinations and the charming boutiques of Stellenbosch and Franschhoek. The V&A Waterfront, Canal Walk, and Century City house major retailers offering career opportunities from sales floor to management. Tourism drives unique retail dynamics – seasonal hiring peaks December-January bring 30-40% more positions, while curio shops and luxury boutiques cater to international visitors year-round. Entry-level retail pays R4,500-R6,000 monthly, with management positions reaching R18,000-R25,000. The province's strong fashion and design scene creates opportunities at boutiques paying commission on top of base salaries.`,
    metaDescription:
      "Find retail jobs in Western Cape. Browse sales, cashier & store manager positions at V&A Waterfront, Canal Walk & Century City. Apply now!",
    faqs: [
      {
        question: "Do retail jobs at V&A Waterfront pay more than other areas?",
        answer:
          "Generally yes, V&A Waterfront positions pay 10-20% above standard retail wages due to tourist traffic and premium brands. Sales assistants earn R5,500-R7,500, with luxury brand positions paying R8,000-R12,000. Commission on international sales can significantly boost earnings.",
      },
      {
        question: "Are there seasonal retail jobs in Cape Town?",
        answer:
          "Yes, December-January tourist season creates thousands of temporary positions. Retailers at Waterfront, Long Street, and beach towns hire extensively from October. Summer season temps who perform well often receive permanent offers for March onwards.",
      },
      {
        question: "Which malls in Western Cape have the most retail jobs?",
        answer:
          "Canal Walk (largest mall), V&A Waterfront (tourism focus), Century City, Cavendish Square (southern suburbs), Tyger Valley (northern suburbs), and Somerset Mall (Helderberg) are the main employers. Garden Route Mall in George also has growing opportunities.",
      },
      {
        question: "Is retail experience required for jobs in Western Cape?",
        answer:
          "Entry-level positions like cashier and sales assistant often accept candidates without experience if you have Grade 12 and good communication skills. Bilingual ability (English/Afrikaans) is highly valued in Western Cape retail, and some tourist-facing roles prefer a third language.",
      },
    ],
  },

  // Western Cape - IT
  "it-western-cape": {
    introContent: `Cape Town has emerged as Africa's leading tech hub, with the CBD's Foreshore, Woodstock's "Silicon Cape," and Century City attracting global tech companies and startups. Amazon, Microsoft, and Capitec's tech divisions operate here alongside local success stories like Takealot, Luno, and Yoco. The Western Cape offers a unique tech lifestyle – developers can surf before work and hike Table Mountain on weekends. Salaries are 10-15% lower than Johannesburg but the lifestyle premium attracts talent seeking work-life balance. Junior developers earn R15,000-R22,000, mid-level R30,000-R50,000, and seniors R60,000-R100,000. Remote-friendly culture means many roles accept candidates anywhere in SA.`,
    metaDescription:
      "Find IT jobs in Western Cape. Browse developer, DevOps & data science positions in Cape Town's tech hub. Startup culture & work-life balance.",
    faqs: [
      {
        question: "Is Cape Town a good place for tech careers?",
        answer:
          "Excellent. Cape Town ranks as Africa's top tech city, with strong startup ecosystem, accelerators (Silicon Cape, Bandwidth Barn), and corporate tech centres. While salaries are slightly lower than Joburg, the lifestyle, safety, and international exposure compensate. Many developers relocate for quality of life.",
      },
      {
        question: "Which tech companies are based in Cape Town?",
        answer:
          "Major players: Amazon Web Services, Capitec (tech division), Takealot, Naspers/Prosus labs, Luno (crypto), Yoco (fintech), OfferZen, Platform45. Banks like Allan Gray and Sanlam have Cape Town tech hubs. The Woodstock/Observatory area hosts most startups and digital agencies.",
      },
      {
        question: "What programming languages are in demand in Western Cape?",
        answer:
          "JavaScript/TypeScript (React, Node.js) dominates, followed by Python (data/ML), Ruby on Rails (startups), and PHP (agencies). Java and .NET are common at corporates. Cape Town has strong demand for full-stack developers, with many companies using modern stacks like Next.js, Tailwind, and AWS.",
      },
      {
        question: "Do Cape Town IT jobs offer remote work options?",
        answer:
          "Cape Town tech is highly remote-friendly – approximately 70% of jobs offer hybrid or fully remote options. Many startups are remote-first. This attracts talent from other provinces and allows Cape Town developers to work for international companies while enjoying the lifestyle.",
      },
    ],
  },

  // KwaZulu-Natal - Security
  "security-kwazulu-natal": {
    introContent: `KwaZulu-Natal's security sector serves Durban's busy port, booming Umhlanga developments, and the province's tourist attractions from uShaka Marine World to the Drakensberg. The province employs over 30,000 security personnel across corporate, residential, and industrial sites. Durban's Golden Mile and North Coast holiday towns see increased demand during peak tourist seasons. Richards Bay's industrial zone and port operations offer lucrative contracts for security companies. Entry-level guards earn R4,500-R6,000 monthly, with port security and armed response positions paying R8,000-R13,000. Companies like Magnum, Enforce Security, and national brands actively recruit in the province.`,
    metaDescription:
      "Find security jobs in KwaZulu-Natal. Browse port security, estate guarding & armed response positions in Durban & Umhlanga. Apply today!",
    faqs: [
      {
        question: "What types of security jobs are available in Durban?",
        answer:
          "Durban offers diverse security roles: port and maritime security (requires ISPS certification), hotel and hospitality security along the beachfront, corporate security in Umhlanga Ridge, industrial security in Prospecton, and residential estate security in Hillcrest/Kloof. Tourism security peaks December-January.",
      },
      {
        question: "Is there demand for security at Durban's port?",
        answer:
          "Yes, Durban port is Africa's busiest container terminal, creating constant demand for ISPS-certified security personnel. Port security pays R8,000-R15,000 monthly with shift allowances. Requirements include PSIRA registration, ISPS training, and often maritime security certifications.",
      },
      {
        question: "Which security companies hire in KwaZulu-Natal?",
        answer:
          "Major employers: Magnum Security, Enforce Security, ADT, Fidelity, G4S, and Stallion Security. Many residential estates on the North Coast and Midlands use local companies like Ballito Reaction Unit. Industrial sites in Richards Bay often contract with specialized security providers.",
      },
      {
        question: "What qualifications do I need for security work in KZN?",
        answer:
          "Minimum: PSIRA Grade E registration, clear criminal record, Grade 10+ education. Higher grades (A-D) needed for armed positions. Durban port requires ISPS certification. Driver's license essential for armed response. Zulu language ability is advantageous for community relations in many areas.",
      },
    ],
  },

  // KwaZulu-Natal - Hospitality
  "hospitality-kwazulu-natal": {
    introContent: `KwaZulu-Natal is South Africa's premier hospitality destination, from Durban's beachfront hotels to Umhlanga's five-star resorts and the Drakensberg's mountain lodges. The province's warm climate and diverse attractions create year-round demand for hospitality professionals. Peak season (December-January) sees hotels at 100% occupancy, driving intensive seasonal hiring. Entry-level positions like housekeeping and waitstaff start at R4,000-R5,500 monthly, while supervisory roles earn R8,000-R12,000. Chefs command R10,000-R25,000 depending on experience. The Oyster Box, Sun Coast Casino, and Drakensberg resorts offer excellent career development programs and staff benefits including meals and accommodation.`,
    metaDescription:
      "Find hospitality jobs in KwaZulu-Natal. Browse hotel, restaurant & resort positions in Durban, Umhlanga & Drakensberg. Peak season hiring now!",
    faqs: [
      {
        question: "Which hotels hire the most staff in Durban?",
        answer:
          "Major employers: The Oyster Box (Umhlanga), Sun Coast Casino complex, Southern Sun hotels (Elangeni, Suncoast Towers), Hilton Durban, and Protea Hotels. The Umhlanga area has the highest concentration of upmarket hotels, while North Coast towns like Ballito have boutique properties.",
      },
      {
        question: "Are there hospitality jobs at Drakensberg resorts?",
        answer:
          "Yes, resorts like Champagne Sports Resort, Cathedral Peak Hotel, and The Cavern offer positions with accommodation included. Roles include front desk, food service, maintenance, and activity guides. The mountain setting attracts staff seeking lifestyle positions with beautiful surroundings.",
      },
      {
        question: "What is the peak hiring season for hospitality in KZN?",
        answer:
          "Peak hiring occurs October-November for the December-January summer rush. Easter (March-April) is secondary peak. Sardine Run (June-July) drives coastal tourism. Many positions start as seasonal contracts with permanent offers for top performers.",
      },
      {
        question:
          "Do I need qualifications for hospitality jobs in KwaZulu-Natal?",
        answer:
          "Entry-level positions often accept Grade 12 with good English. Having hospitality diplomas from Durban Varsity College or Rosebank College improves prospects. Food handlers need health certificates. Management roles typically require 2-3 years experience or a hospitality degree from DUT or UKZN.",
      },
    ],
  },

  // Johannesburg specific
  "security-johannesburg": {
    introContent: `Johannesburg's security industry is the largest in Africa, protecting everything from Sandton's gleaming corporate towers to Soweto's vibrant communities. The city employs over 35,000 security personnel, making it South Africa's security job capital. Armed response in affluent suburbs like Hyde Park and Bryanston pays R9,000-R14,000 monthly, while CBD security roles offer R6,000-R8,000. Major mining houses, banks, and shopping centres maintain extensive security operations. The security career ladder here moves quickly – dedicated officers can progress from Grade E to armed response within 18-24 months. Companies like ADT, Fidelity, and Chubb have their largest operations in Johannesburg.`,
    metaDescription:
      "Find security jobs in Johannesburg. Browse armed response, corporate security & CBD patrolling positions. PSIRA certified roles R6,000-R14,000/month.",
    faqs: [
      {
        question: "Which Johannesburg suburbs have the most security jobs?",
        answer:
          "Sandton has the highest security employment due to corporate headquarters and malls. Rosebank, Hyde Park, Fourways, and Midrand follow closely. The northern suburbs' residential estates employ many estate security officers. Industrial areas like Kempton Park and Germiston need warehouse security.",
      },
      {
        question: "What does armed response pay in Johannesburg?",
        answer:
          "Armed response officers in Johannesburg earn R8,000-R14,000 monthly depending on the area and company. Northern suburbs (Sandton, Hyde Park) pay the highest rates. Shift allowances and vehicle allowances can add R1,500-R3,000 to the base salary.",
      },
      {
        question: "Is Johannesburg CBD safe for security work?",
        answer:
          "CBD security work is demanding but well-compensated. Officers typically work in teams and receive specialized training. Major clients include banks, government buildings, and Carlton Centre. The CBD revitalization is creating new security positions in refurbished buildings.",
      },
      {
        question:
          "Which companies are hiring security officers in Johannesburg now?",
        answer:
          "Active recruiters: ADT Security (constant demand), Fidelity Services Group, G4S, Chubb, and Blue Security. Estate and residential security companies like Vumacam and community-based initiatives also hire regularly. Check Johannesburg security vacancies weekly as turnover creates ongoing opportunities.",
      },
    ],
  },

  // Cape Town specific
  "security-cape-town": {
    introContent: `Cape Town's security industry uniquely blends tourist protection, corporate security, and residential guarding across the Mother City's diverse neighbourhoods. From patrolling the V&A Waterfront's bustling retail spaces to protecting Sea Point's beachfront apartments, security professionals enjoy varied work environments with ocean views. The city employs approximately 20,000 security personnel, with peak demand during tourist season (December-January). Atlantic Seaboard and Constantia positions often pay premiums – armed response officers can earn R10,000-R12,000 monthly. Cape Town's lower crime rates compared to Johannesburg mean security work focuses more on access control and customer service than high-risk interventions.`,
    metaDescription:
      "Find security jobs in Cape Town. Browse V&A Waterfront, corporate & residential security positions. Tourist area & estate security R5,500-R12,000/month.",
    faqs: [
      {
        question: "What security jobs are available at V&A Waterfront?",
        answer:
          "The Waterfront employs security for retail spaces, parking areas, hotels, and the aquarium. Positions require good customer service skills alongside security training. Pay ranges R5,500-R8,000 with potential overtime during busy seasons. Bilingual ability (English/Afrikaans) is advantageous.",
      },
      {
        question: "Are Cape Town security jobs safer than Johannesburg?",
        answer:
          "Cape Town generally has lower violent crime rates than Johannesburg, though property crime remains a concern. Security work here often emphasizes access control and customer service over armed intervention. The Atlantic Seaboard and Southern Suburbs are considered safer working environments.",
      },
      {
        question: "Do Cape Town security jobs include accommodation?",
        answer:
          "Some positions, particularly at wine estates in Constantia, Durbanville, and the Winelands, include accommodation or housing subsidies. Security officers at boutique hotels and lodges along the Garden Route may also receive staff accommodation as part of their package.",
      },
      {
        question:
          "What is the demand for security officers in Cape Town's CBD?",
        answer:
          "CBD demand is growing with urban regeneration projects. New developments in Foreshore and renovated buildings in the city centre need security. Government buildings, banks, and the CTICC (convention centre) are major employers. CBD positions pay R5,500-R8,000 monthly.",
      },
    ],
  },

  // Durban specific
  "security-durban": {
    introContent: `Durban's security sector serves Africa's busiest port, the iconic Golden Mile beachfront, and the booming Umhlanga development corridor. The city's subtropical climate and tourism industry create unique security demands – from protecting beach-goers along the promenade to securing cruise ships at the port. Industrial security in Prospecton and Jacobs offers stable employment, while hospitality security at Sun Coast Casino and Moses Mabhida Stadium provides varied shift work. Entry-level officers earn R4,500-R6,500, with port security and armed response positions commanding R8,000-R13,000. The Zulu language is an asset for community relations in many Durban postings.`,
    metaDescription:
      "Find security jobs in Durban. Browse port security, beachfront patrol & armed response positions. ISPS certified roles at Africa's busiest port.",
    faqs: [
      {
        question: "What are the security opportunities at Durban port?",
        answer:
          "Durban port requires ISPS-certified security personnel for container terminals, cargo areas, and cruise ship docking. Pay ranges R8,000-R15,000 with shift allowances. Career progression can lead to maritime security supervision paying R20,000+. Requirements include PSIRA, ISPS certification, and clear background checks.",
      },
      {
        question: "Is there security work along Durban's beachfront?",
        answer:
          "Yes, the Golden Mile employs security for hotels, restaurants, and public beaches. Municipal beach security and lifeguard support positions are available. Private security firms patrol the promenade alongside metro police. Tourist season (December-January) brings increased hiring.",
      },
      {
        question: "Which Durban areas have the highest security employment?",
        answer:
          "Umhlanga Ridge has the most corporate security jobs due to business parks. La Lucia and Umhlanga Rocks employ estate security. Gateway Theatre of Shopping is a major employer. The Point and CBD have diverse security needs including government buildings and transport hubs.",
      },
      {
        question: "Do I need to speak Zulu for security jobs in Durban?",
        answer:
          "While English is the business language, Zulu language ability is highly valued in Durban security work. It helps with community relations, suspect interaction, and working with diverse teams. Many employers prefer bilingual candidates for residential and retail security positions.",
      },
    ],
  },

  // Pretoria specific
  "government-pretoria": {
    introContent: `Pretoria is South Africa's administrative capital, making it the epicentre of government employment. The city's Union Buildings, departmental head offices, and parastatals employ thousands of public servants across every discipline. Government positions offer job security, excellent benefits (medical aid, pension, housing allowance), and structured career progression. Entry-level administrative positions start at salary level 5 (approximately R180,000 p.a.), while senior management can reach level 15+ (R1.8M+ p.a.). The DPSA, Treasury, and major departments like Home Affairs, SARS, and SAPS maintain their headquarters here. Graduate internships and learnerships provide entry paths for young job seekers.`,
    metaDescription:
      "Find government jobs in Pretoria. Browse DPSA, Treasury & departmental positions at Union Buildings. Internships & senior roles available.",
    faqs: [
      {
        question: "How do I apply for government jobs in Pretoria?",
        answer:
          "Apply through the DPSA e-Recruitment portal (www.dpsa.gov.za) or individual department websites. Jobs are advertised on PSIRA Job circular and government Facebook pages. Always use the Z83 form and submit certified copies of qualifications. Applications are competitive – apply early and ensure all requirements are met.",
      },
      {
        question: "What qualifications do I need for government positions?",
        answer:
          "Requirements vary by level: Administrative posts typically need Grade 12 + relevant experience. Professional posts require degrees/diplomas. Senior positions need Honours/Masters + 5-10 years management experience. Some roles require specific registrations (SAQA, professional boards).",
      },
      {
        question:
          "What is the salary scale for government employees in Pretoria?",
        answer:
          "Government uses salary levels 1-16: Entry admin (Level 5): R180k-R212k p.a. | Skilled (Level 7-8): R280k-R380k p.a. | Management (Level 11-12): R550k-R800k p.a. | Senior Management: R1M-R2.5M p.a. Benefits add 30-40% to total package value.",
      },
      {
        question: "Are there government internships available in Pretoria?",
        answer:
          "Yes, most departments run internship and learnership programs for youth. DPSA coordinates the Presidential Youth Employment Initiative. Requirements are typically a degree/diploma with no prior work experience. Stipends range R5,000-R7,000 monthly. These often lead to permanent appointments.",
      },
    ],
  },

  // Eastern Cape
  "security-eastern-cape": {
    introContent: `The Eastern Cape's security industry serves the automotive manufacturing hub of Port Elizabeth (Gqeberha), the educational institutions of Grahamstown (Makhanda), and the administrative centre of Bhisho. Major employers include the Volkswagen and Mercedes-Benz plants, which require industrial security personnel, and the numerous universities and hospitals across the province. Port Elizabeth's beachfront and Boardwalk Casino also provide hospitality-focused security roles. Entry-level positions pay R4,000-R5,500 monthly, with automotive plant security reaching R7,000-R10,000 due to specialized requirements. The province offers lower living costs than Gauteng, making similar salaries go further.`,
    metaDescription:
      "Find security jobs in Eastern Cape. Browse factory security at VW/Mercedes plants & campus security positions in Port Elizabeth & East London.",
    faqs: [
      {
        question: "What security jobs are available at car factories in PE?",
        answer:
          "Volkswagen Uitenhage, Mercedes-Benz East London, and component suppliers hire industrial security officers. These positions require PSIRA registration, sometimes Grade 10 minimum, and clear criminal records. Factory security pays R6,000-R10,000 with benefits including medical aid and transport.",
      },
      {
        question: "Is there campus security work in the Eastern Cape?",
        answer:
          "Yes, Rhodes University, Nelson Mandela University, and Walter Sisulu University all employ campus security. These positions combine access control, patrol duties, and student interaction. Pay ranges R5,000-R7,500. University security often includes benefits and follows academic calendars.",
      },
      {
        question: "Which Eastern Cape cities have the most security jobs?",
        answer:
          "Port Elizabeth (Gqeberha) has the largest security job market due to manufacturing and tourism. East London's Buffalo City metro follows with harbour and industrial security. Mthatha has growing demand due to government buildings and Wild Coast tourism development.",
      },
      {
        question:
          "What is the cost of living advantage for security workers in EC?",
        answer:
          "Eastern Cape living costs are 25-35% lower than Gauteng. A security salary of R6,000 in PE provides equivalent lifestyle to R8,000-R9,000 in Johannesburg. Housing, transport, and food are significantly cheaper, making the province attractive for building savings.",
      },
    ],
  },
};

// ============================================
// City-Only Page Content
// ============================================

const cityContent: Record<string, PSEOPageContent> = {
  johannesburg: {
    introContent: `Johannesburg, South Africa's economic powerhouse, offers unparalleled employment opportunities across every sector. From the gleaming towers of Sandton – Africa's richest square mile – to the creative hubs of Braamfontein, the City of Gold employs millions in finance, mining, technology, retail, and services. Major employers include the big four banks, mining houses like Anglo American and Sibanye, and tech companies clustering in Rosebank and Midrand. Entry-level salaries typically run 15-20% higher than other cities, though living costs are proportionally higher. The city's efficient Gautrain connects key business districts, while the M1 and N1 highways link industrial zones. Job seekers find Johannesburg offers the fastest career progression in Africa.`,
    metaDescription:
      "Find jobs in Johannesburg, South Africa's largest city. Browse positions in Sandton, Rosebank & Midrand across finance, IT, retail & more. Apply today!",
    faqs: [
      {
        question: "What is the average salary in Johannesburg?",
        answer:
          "Johannesburg salaries vary widely by industry: Entry-level admin/retail: R6,000-R10,000/month | Technical/trades: R12,000-R25,000 | Professional (accountants, engineers): R25,000-R60,000 | Management: R50,000-R120,000 | Executives: R150,000+. Sandton-based roles typically pay 10-20% premiums.",
      },
      {
        question: "Which areas of Johannesburg have the most jobs?",
        answer:
          "Sandton is the primary business hub with corporate headquarters and financial services. Rosebank has creative and tech companies. Midrand hosts logistics, IT parks, and manufacturing. The Johannesburg CBD has government and financial sector jobs. Industrial areas like Kempton Park and Germiston offer manufacturing and logistics positions.",
      },
      {
        question: "Is Johannesburg safe for job seekers?",
        answer:
          "Like any major city, Johannesburg requires awareness. Business districts like Sandton, Rosebank, and Melrose are well-secured. Use Gautrain for safe commuting. Many companies offer secure parking or transport. Research your specific workplace location and use common sense precautions.",
      },
      {
        question: "How can I find jobs in Johannesburg?",
        answer:
          "Top job portals: CareerCVPro, Indeed SA, Careers24, PNet, LinkedIn. Recruitment agencies like Kelly, Adcorp, and Michael Page specialize in Johannesburg placements. Network at industry events in Sandton and Rosebank. Many companies post on their career pages – check target employers directly.",
      },
    ],
  },

  "cape-town": {
    introContent: `Cape Town combines world-class career opportunities with an unmatched lifestyle, making it South Africa's most desired work destination. The Mother City excels in technology (Africa's leading tech hub), tourism and hospitality, financial services, film and media production, and renewable energy. Major employers include Allan Gray, Capitec, Naspers, and a thriving startup ecosystem in Woodstock and the CBD. While salaries may be 10-15% lower than Johannesburg, the lifestyle compensation – mountain hikes, beaches, and wine country – attracts top talent willing to trade slightly for quality of life. The City Bowl, Century City, and Claremont form the primary business districts. Remote work culture thrives here, with many companies offering flexible arrangements.`,
    metaDescription:
      "Find jobs in Cape Town, South Africa's tech hub & lifestyle capital. Browse IT, tourism, finance & creative positions. Work-life balance awaits!",
    faqs: [
      {
        question: "Is Cape Town a good city for career growth?",
        answer:
          "Excellent for tech, creative, and tourism careers. The startup ecosystem offers rapid growth for those willing to take risks. Corporate careers progress well at companies like Allan Gray, Capitec, and Sanlam. The film and media industry is Africa's largest. Career changers and remote workers particularly thrive here.",
      },
      {
        question: "What is the cost of living vs salary in Cape Town?",
        answer:
          "Cape Town salaries average 10-15% less than Johannesburg, but housing can be 20-30% more in desirable areas (Seapoint, Camps Bay). Northern suburbs (Durbanville, Bellville) offer affordable living with lower salaries matching. Many workers accept lifestyle trade-off for beaches, safety, and outdoor activities.",
      },
      {
        question: "Which industries are strongest in Cape Town?",
        answer:
          "Technology (IT, startups, fintech), Tourism & Hospitality, Financial Services (insurance, asset management), Film & Media Production, Wine & Agriculture, Renewable Energy, Retail (V&A Waterfront, Canal Walk). The creative and digital marketing sectors are particularly vibrant.",
      },
      {
        question: "Do Cape Town jobs offer remote work?",
        answer:
          "Cape Town has South Africa's highest rate of remote/hybrid work – approximately 60-70% of white-collar jobs offer flexibility. Tech companies are often remote-first. This has attracted digital nomads and remote workers from Johannesburg and internationally, further boosting the talent pool.",
      },
    ],
  },

  durban: {
    introContent: `Durban, Africa's busiest port city, offers career opportunities anchored in logistics, manufacturing, tourism, and maritime industries. The warm subtropical climate and beachfront lifestyle attract workers seeking a more relaxed pace than Johannesburg while maintaining solid career prospects. Key employment sectors include port operations, automotive manufacturing at Toyota's Prospecton plant, sugar and chemical industries, and the booming Umhlanga business corridor. Gateway Theatre of Shopping and the La Lucia office parks house major employers including banking operations and call centres. Salaries are approximately 15-20% lower than Johannesburg, but housing costs are significantly more affordable. The city's multiculturalism, reflected in its Indian, Zulu, and colonial heritage, creates a unique workplace environment.`,
    metaDescription:
      "Find jobs in Durban, Africa's busiest port city. Browse logistics, manufacturing, tourism & corporate positions in Umhlanga & beyond. Apply today!",
    faqs: [
      {
        question: "What are Durban's main employment sectors?",
        answer:
          "Port & Logistics (container terminal, shipping), Manufacturing (Toyota, chemical plants), Tourism & Hospitality (hotels, restaurants), Financial Services (Umhlanga business parks), Call Centres (numerous BPOs), Sugar & Agriculture, and Government (provincial administration).",
      },
      {
        question: "How does Durban salary compare to Johannesburg?",
        answer:
          "Durban salaries are typically 15-20% lower than Johannesburg equivalents. However, housing is 30-40% cheaper, and the lifestyle costs (entertainment, transport) are lower. A R15,000 salary in Durban can provide a similar lifestyle to R20,000+ in Johannesburg, especially if living in suburbs rather than Umhlanga.",
      },
      {
        question: "Is Umhlanga the best area to work in Durban?",
        answer:
          "Umhlanga Ridge is the premier business district with corporate headquarters, shopping, and upmarket living. However, the CBD has government and traditional businesses. Pinetown and Westville have manufacturing and distribution. La Lucia and Mount Edgecombe office parks are growing rapidly.",
      },
      {
        question: "What is the job market like for graduates in Durban?",
        answer:
          "UKZN and DUT produce many graduates competing for positions. Graduate programs at Toyota, Unilever, and banks actively recruit. Tourism and hospitality welcome fresh graduates. The competition is less intense than Johannesburg, but positions may be fewer. Networking through industry events is valuable.",
      },
    ],
  },

  pretoria: {
    introContent: `Pretoria, South Africa's administrative capital, is the heart of government employment and a major hub for education, healthcare, and technology. The city houses Union Buildings, every national department's head office, and numerous parastatals creating stable public sector careers with excellent benefits. Beyond government, Pretoria hosts major employers like the CSIR (science and innovation), universities (UP, TUT, UNISA), and private companies in Centurion and Menlyn. The city's lifestyle offers lower crime rates and less congestion than Johannesburg, just 50km away via the Gautrain. Salaries match Johannesburg levels while living costs are 10-20% lower. The blend of jacaranda-lined streets, academic institutions, and government authority creates a unique professional environment.`,
    metaDescription:
      "Find jobs in Pretoria, South Africa's administrative capital. Browse government, education, healthcare & tech positions. Secure careers with benefits!",
    faqs: [
      {
        question: "What types of jobs are available in Pretoria?",
        answer:
          "Government (national departments, parastatals), Education (universities, research institutions), Healthcare (Steve Biko Hospital, private hospitals), Technology (CSIR, tech parks), Financial Services (Menlyn area), Automotive (BMW training, dealerships), and Legal (courts, law firms serving government).",
      },
      {
        question: "How do I get a government job in Pretoria?",
        answer:
          "Apply through DPSA e-Recruitment portal using Z83 forms. Monitor vacancy circulars published Fridays. Prepare for lengthy processes (3-6 months). Entry requires matric minimum; professional roles need degrees. Government careers offer security, benefits, and structured progression but can be bureaucratic.",
      },
      {
        question: "Is Centurion better than Pretoria CBD for jobs?",
        answer:
          "Centurion has grown into a modern business hub with tech companies, malls (Centurion Mall), and office parks. It's preferred for private sector roles. Pretoria CBD houses government and traditional businesses. Menlyn is emerging as a commercial centre. Each area serves different career paths.",
      },
      {
        question: "Can I live in Pretoria and work in Johannesburg?",
        answer:
          "Yes, many professionals commute via Gautrain (30 minutes Hatfield to Sandton). Road commute takes 45-90 minutes depending on traffic. Living in Pretoria offers lower costs and safer suburbs while accessing Johannesburg's job market. Centurion is optimal for commuters.",
      },
    ],
  },

  sandton: {
    introContent: `Sandton, known as Africa's richest square mile, is the continent's premier business district and South Africa's corporate heart. This glittering suburb houses the Johannesburg Stock Exchange, headquarters of major banks (Standard Bank, FNB, Investec), mining giants (Anglo American, AngloGold), and multinational corporations. Career opportunities here command premium salaries – often 20-30% above similar roles elsewhere – but competition is fierce. The area buzzes with deal-making in glass towers connected by the Gautrain and upmarket malls like Sandton City and Nelson Mandela Square. Entry-level positions start around R10,000, while senior professionals easily earn R80,000-R200,000+ monthly. The trade-off: high-pressure environments, demanding hours, and expensive living costs.`,
    metaDescription:
      "Find jobs in Sandton, Africa's business capital. Browse finance, legal, IT & executive positions at top companies. Premium salaries in SA's richest district.",
    faqs: [
      {
        question: "What is the average salary in Sandton?",
        answer:
          "Sandton salaries are South Africa's highest: Admin/Reception: R8,000-R15,000 | Professional (finance, legal): R30,000-R80,000 | Management: R60,000-R150,000 | Executives/Partners: R200,000-R500,000+. Performance bonuses can add 20-100% to base salaries at top firms.",
      },
      {
        question: "Which companies have headquarters in Sandton?",
        answer:
          "Major employers: JSE, Standard Bank, FNB (Merchant), Investec, Discovery, Anglo American, AngloGold Ashanti, Sasol, PwC, Deloitte, KPMG, EY, top law firms (ENS, Webber Wentzel, Cliffe Dekker), and tech companies like BCG, McKinsey, and Microsoft SA.",
      },
      {
        question: "How do I get a job in Sandton?",
        answer:
          "Sandton recruitment is competitive. Use specialized recruiters (Robert Walters, Michael Page, Hays), apply directly to company career pages, network at industry events (Sandton Convention Centre), and leverage LinkedIn presence. Candidates from top universities and professional qualifications (CA, CFA) have advantages.",
      },
      {
        question: "Is Sandton worth the high cost of living?",
        answer:
          "Sandton living is expensive – rentals R10,000-R30,000+ for apartments, R25,000-R50,000 for houses. Many professionals live in nearby suburbs (Bryanston, Rivonia, Morningside) for 20-40% less while commuting. The career acceleration and salary premiums can justify the investment for ambitious professionals.",
      },
    ],
  },

  midrand: {
    introContent: `Midrand, strategically positioned between Johannesburg and Pretoria, has transformed from a dormitory town into a major business hub. The area hosts Gallagher Convention Centre, Mall of Africa (South Africa's largest single-phase mall), and numerous office parks attracting technology, logistics, and corporate headquarters. Major employers include Microsoft South Africa, Amazon Web Services, Massmart (Walmart affiliate), and financial services call centres. The Gautrain and N1 highway provide excellent connectivity to both Johannesburg and Pretoria. Midrand offers a middle ground – salaries slightly below Sandton but significantly lower living costs and commute times. The area's growth shows no signs of slowing, with new developments creating opportunities across all sectors.`,
    metaDescription:
      "Find jobs in Midrand, Gauteng's growing business hub. Browse tech, logistics & corporate positions at Mall of Africa, Gallagher & office parks. Apply now!",
    faqs: [
      {
        question: "What types of jobs are available in Midrand?",
        answer:
          "Technology (Microsoft, Amazon, IT companies), Logistics & Distribution (warehouses, supply chain), Retail (Mall of Africa, Boulders Mall), Call Centres & BPOs, Financial Services (insurance, admin centres), Events & Hospitality (Gallagher), and Manufacturing/Industrial parks along the N1.",
      },
      {
        question: "How does Midrand compare to Sandton for careers?",
        answer:
          "Midrand offers 80-90% of Sandton salaries with significantly lower living costs and less traffic stress. Tech careers are equally strong. Corporate headquarters are fewer but growing. Midrand suits professionals prioritizing work-life balance while maintaining good earning potential.",
      },
      {
        question: "Is Midrand a good place to live and work?",
        answer:
          "Midrand has grown into a complete live-work-play destination with Mall of Africa, good schools, and residential estates. Commuting to either Johannesburg or Pretoria is feasible. The area is generally safer than Johannesburg CBD and offers modern infrastructure.",
      },
      {
        question: "Which tech companies are based in Midrand?",
        answer:
          "Microsoft South Africa, Amazon Web Services (AWS), Dimension Data offices, various cloud and data centre providers, IT support companies, and numerous software development firms. The area has become Gauteng's secondary tech hub after Sandton/Rosebank.",
      },
    ],
  },
};

// ============================================
// Content Access Functions
// ============================================

export function getCategoryLocationContent(
  category: string,
  location: string
): PSEOPageContent | null {
  const key = `${category}-${location}` as CategoryLocationKey;
  return categoryLocationContent[key] || null;
}

export function getCityContent(city: string): PSEOPageContent | null {
  return cityContent[city] || null;
}

export const pSEOContent = {
  categoryLocation: categoryLocationContent,
  city: cityContent,
};
