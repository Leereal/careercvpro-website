// Location data for the /jobs/[slug] province and city pages.
// Shared by the page route and the sitemap so both agree on which URLs exist.

// Province data for static generation and metadata
export const provinceData: Record<
  string,
  {
    name: string;
    capital: string;
    description: string;
    cities: string[];
  }
> = {
  gauteng: {
    name: "Gauteng",
    capital: "Johannesburg",
    description:
      "South Africa's economic hub with the highest concentration of jobs. Home to Johannesburg, Pretoria, and major business districts.",
    cities: [
      "Johannesburg",
      "Pretoria",
      "Sandton",
      "Midrand",
      "Centurion",
      "Soweto",
      "Randburg",
      "Roodepoort",
    ],
  },
  "western-cape": {
    name: "Western Cape",
    capital: "Cape Town",
    description:
      "A diverse economy with strong tourism, agriculture, and tech sectors. Cape Town is a major business and tourism destination.",
    cities: [
      "Cape Town",
      "Stellenbosch",
      "Paarl",
      "Somerset West",
      "Bellville",
      "Century City",
      "Tyger Valley",
    ],
  },
  "kwazulu-natal": {
    name: "KwaZulu-Natal",
    capital: "Durban",
    description:
      "Major port city and industrial hub. Strong manufacturing, tourism, and agricultural sectors along the coast.",
    cities: [
      "Durban",
      "Pietermaritzburg",
      "Richards Bay",
      "Newcastle",
      "Umhlanga",
      "Ballito",
      "Pinetown",
    ],
  },
  "eastern-cape": {
    name: "Eastern Cape",
    capital: "Bhisho",
    description:
      "Growing economy with automotive manufacturing in Port Elizabeth and East London. Government and education sectors.",
    cities: [
      "Port Elizabeth",
      "East London",
      "Mthatha",
      "Grahamstown",
      "Uitenhage",
      "King William's Town",
    ],
  },
  limpopo: {
    name: "Limpopo",
    capital: "Polokwane",
    description:
      "Rich in mining and agriculture. Growing tourism sector around Kruger National Park. Government services hub.",
    cities: [
      "Polokwane",
      "Tzaneen",
      "Thohoyandou",
      "Louis Trichardt",
      "Mokopane",
      "Musina",
    ],
  },
  mpumalanga: {
    name: "Mpumalanga",
    capital: "Mbombela (Nelspruit)",
    description:
      "Major mining province with coal and other minerals. Strong tourism around Kruger Park and Panorama Route.",
    cities: [
      "Nelspruit",
      "Witbank",
      "Middelburg",
      "Secunda",
      "Ermelo",
      "Standerton",
    ],
  },
  "north-west": {
    name: "North West",
    capital: "Mahikeng",
    description:
      "Platinum mining capital of the world. Sun City tourism. Agricultural and gaming industries.",
    cities: [
      "Rustenburg",
      "Potchefstroom",
      "Klerksdorp",
      "Mahikeng",
      "Brits",
      "Hartbeespoort",
    ],
  },
  "free-state": {
    name: "Free State",
    capital: "Bloemfontein",
    description:
      "Judicial capital of South Africa. Strong agricultural sector and gold mining. Education hub with multiple universities.",
    cities: [
      "Bloemfontein",
      "Welkom",
      "Bethlehem",
      "Kroonstad",
      "Sasolburg",
      "Parys",
    ],
  },
  "northern-cape": {
    name: "Northern Cape",
    capital: "Kimberley",
    description:
      "Diamond mining heritage in Kimberley. Solar energy boom. Agriculture along the Orange River.",
    cities: [
      "Kimberley",
      "Upington",
      "Springbok",
      "De Aar",
      "Kuruman",
      "Kathu",
    ],
  },
};

// City data for city-only pages (Phase 2)
export const cityData: Record<
  string,
  {
    name: string;
    province: string;
    provinceSlug: string;
    description: string;
  }
> = {
  johannesburg: {
    name: "Johannesburg",
    province: "Gauteng",
    provinceSlug: "gauteng",
    description:
      "South Africa's largest city and economic hub. Home to major corporations, finance sector, and diverse employment opportunities.",
  },
  pretoria: {
    name: "Pretoria",
    province: "Gauteng",
    provinceSlug: "gauteng",
    description:
      "South Africa's administrative capital with government jobs, embassies, and universities. Strong public sector employment.",
  },
  "cape-town": {
    name: "Cape Town",
    province: "Western Cape",
    provinceSlug: "western-cape",
    description:
      "Legislative capital with booming tech, tourism, and creative industries. Major port city with diverse job market.",
  },
  durban: {
    name: "Durban",
    province: "KwaZulu-Natal",
    provinceSlug: "kwazulu-natal",
    description:
      "Africa's busiest port city. Strong manufacturing, logistics, tourism, and maritime employment opportunities.",
  },
  "port-elizabeth": {
    name: "Port Elizabeth",
    province: "Eastern Cape",
    provinceSlug: "eastern-cape",
    description:
      "Major automotive manufacturing hub. Also known as Gqeberha. Growing industrial and tourism sectors.",
  },
  bloemfontein: {
    name: "Bloemfontein",
    province: "Free State",
    provinceSlug: "free-state",
    description:
      "Judicial capital of South Africa. University town with legal, education, and healthcare jobs.",
  },
  sandton: {
    name: "Sandton",
    province: "Gauteng",
    provinceSlug: "gauteng",
    description:
      "Africa's richest square mile. Financial hub with corporate headquarters, banks, and professional services.",
  },
  midrand: {
    name: "Midrand",
    province: "Gauteng",
    provinceSlug: "gauteng",
    description:
      "Major business and industrial hub between Johannesburg and Pretoria. Gallagher Convention Centre area.",
  },
  centurion: {
    name: "Centurion",
    province: "Gauteng",
    provinceSlug: "gauteng",
    description:
      "Growing business district south of Pretoria. IT, retail, and corporate park opportunities.",
  },
  polokwane: {
    name: "Polokwane",
    province: "Limpopo",
    provinceSlug: "limpopo",
    description:
      "Limpopo's capital and commercial hub. Government, retail, and mining-related employment.",
  },
  nelspruit: {
    name: "Nelspruit",
    province: "Mpumalanga",
    provinceSlug: "mpumalanga",
    description:
      "Gateway to Kruger Park. Also known as Mbombela. Tourism, agriculture, and government jobs.",
  },
  rustenburg: {
    name: "Rustenburg",
    province: "North West",
    provinceSlug: "north-west",
    description:
      "Platinum capital of the world. Major mining operations and Sun City tourism nearby.",
  },
  kimberley: {
    name: "Kimberley",
    province: "Northern Cape",
    provinceSlug: "northern-cape",
    description:
      "Historic diamond mining city. Big Hole landmark. Government and mining sector employment.",
  },
  pietermaritzburg: {
    name: "Pietermaritzburg",
    province: "KwaZulu-Natal",
    provinceSlug: "kwazulu-natal",
    description:
      "KZN's capital city. Government services, education, and aluminium manufacturing.",
  },
  "east-london": {
    name: "East London",
    province: "Eastern Cape",
    provinceSlug: "eastern-cape",
    description:
      "Only river port in South Africa. Mercedes-Benz plant. Automotive and manufacturing jobs.",
  },
  stellenbosch: {
    name: "Stellenbosch",
    province: "Western Cape",
    provinceSlug: "western-cape",
    description:
      "University town in wine country. Tech startups, education, agriculture, and tourism.",
  },
  umhlanga: {
    name: "Umhlanga",
    province: "KwaZulu-Natal",
    provinceSlug: "kwazulu-natal",
    description:
      "Upmarket coastal suburb of Durban. Gateway Theatre of Shopping. Hospitality and corporate jobs.",
  },
  "richards-bay": {
    name: "Richards Bay",
    province: "KwaZulu-Natal",
    provinceSlug: "kwazulu-natal",
    description:
      "Major coal export terminal. Heavy industry, aluminium smelting, and port operations.",
  },
  witbank: {
    name: "Witbank",
    province: "Mpumalanga",
    provinceSlug: "mpumalanga",
    description:
      "Also known as eMalahleni. Coal mining capital with power generation and heavy industry.",
  },
  klerksdorp: {
    name: "Klerksdorp",
    province: "North West",
    provinceSlug: "north-west",
    description:
      "Gold mining heritage. Retail, agriculture, and education employment opportunities.",
  },
};
