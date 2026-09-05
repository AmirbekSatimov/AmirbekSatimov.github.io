import {
  AmbitLogo,
  BarepapersLogo,
  BimLogo,
  CDGOLogo,
  ClevertechLogo,
  ConsultlyLogo,
  EvercastLogo,
  Howdy,
  JarockiMeLogo,
  JojoMobileLogo,
  Minimal,
  MobileVikingsLogo,
  MonitoLogo,
  NSNLogo,
  ParabolLogo,
  TastyCloudLogo,
  YearProgressLogo,
} from "@/images/logos";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";
import headshot from "@/images/headshot.jpg";

export const RESUME_DATA = {
  name: "Amir Satimov",
  initials: "AS",
  location: "Toronto, Canada",
  locationLink: "https://www.google.com/maps/place/Toronto",
  about:
    "Investment Analyst at Fiera Infrastructure",
  summary:
    "I am currently working as an analyst at Fiera Infrastructure, a global middle-market infrastructure investment firm. I graduated in April 2025 as a dual-degree student attending the Ivey Business and Western Engineering for business administration and mechatronics systems engineering respectively. I am passionate about the markets, economics, technology, and space exploration.",
  avatarUrl: headshot.src,
  personalWebsiteUrl: "TEMPLATE", // Update
  contact: {
    email: "asatimov.hba2025@ivey.ca",
    tel: "+14165207960",
    social: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/amirbeksatimov/",
        icon: LinkedInIcon,
      },
    ],
  },
  education: [
    {
      school: "Ivey Business School",
      degree: "Honours of Business Adminstration",
      start: "2022",
      end: "2025",
    },
    {
      school: "Western University",
      degree: "Mechatronics Systems Engineering",
      start: "2020",
      end: "2025",
    },
  ],
  work: [
    {
      company: "Fiera Infrastructure.",
      link: "https://www.fierainfrastructure.com/en/",
      badges: [],
      title: "Investment Analyst",
      logo: ClevertechLogo,
      start: "July 2025",
      end: "Present",
      description:
        "Assisting in investment and asset management processes.",
    },
    {
      company: "Fort Capital.",
      link: "https://www.fortcapital.ca/",
      badges: [],
      title: "Summer Investment Banking Analyst",
      logo: ClevertechLogo,
      start: "May 2024",
      end: "August 2024",
      description:
        "Assisted in developing financial models, supporting senior partners with client-related activities including financial analysis and banker support; Gained industry-specific expertise in Metals & Mining and Technology",
    },
    {
      company: "Enbridge Inc.",
      link: "https://www.enbridge.com/",
      badges: [],
      title: "Resource Management - Engineering Summer Student",
      logo: ClevertechLogo,
      start: "May 2022",
      end: "August 2022",
      description:
        "Analyzed historical data points to determine errors within forecasting models for work orders and labour hours to allow senior managers to adequately budget and hire crew members to meet customer needs for the next three years ",
    },
  ],

  extracurriculars: [
    {
      company: "Western Algorithmic Trading Club",
      badges: [],
      title: "Co-Founder, VP External",
      logo: ClevertechLogo,
      start: "July 2021",
      end: "Present",
      description:
        "Co-founded Western-ratified club that builds projects that relate algorithmic trading and quantitative finance, gaining valuable hands-on experience in the field of algorithmic trading and quantative finance",
    },

    {
      company: "Ivey Business Review",
      link: "https://www.iveybusinessreview.ca/",
      badges: [],
      title: "Editor, Previously Author",
      logo: ClevertechLogo,
      start: "September 2023",
      end: "Present",
      description:
        "Authored report, 'Amazon: Ascent to Space', aided in the editing of multiple pieces.",
    },
  ],

  skills: [
    "Valuations",
    "Python",
    "Data Analysis",
    "Excel"
  ],
  projects: [
    {
      title: 'Exploring "Why Nations Fail"',
      date: "November 2025",
      techStack: [
        "Substack",
        "Institutional Economics",
      ],
      description: "Published on my Substack, this piece works through Acemoglu and Robinson's case that inclusive versus extractive institutions drive national prosperity, and questions what globalization and rapid technological change mean for that thesis.",
      logo: ConsultlyLogo,
      link: {
        label: "asatimov.substack.com",
        href: "https://asatimov.substack.com/p/exploring-why-nations-fail",
      },
    },
    {
      title: "Rocket Lab Inc. Equity Research",
      date: "February 2024",
      techStack: [
        "Rocket Lab Inc.",
        "Aerospace",
      ],
      description: "Report on Rocket Lab, produced as part of Western Algorithmic Trading Club. Report covers the internal business, industry positioning, and valuation.",
      logo: ConsultlyLogo,
      link: {
        label: "rocketlab-research-report.pdf",
        href: "/reports/rocketlab-research-report.pdf",
      },
    },
    {
      title: "Amazon: Ascent to Space",
      date: "December 2023",
      techStack: [
        "Amazon.com Inc",
      ],
      description: "As a part of Ivey Business Review, this report analyzed Amazon's Kuiper Project and proposed recommendations.",
      logo: ConsultlyLogo,
      link: {
        label: "consultly.com",
        href: "https://www.iveybusinessreview.ca/magazine/articles/amazon-the-ascent-to-space?rq=amazon",
      },
    },
    {
      title: "Intel Corp. Equity Research",
      date: "May 2023",
      techStack: [
        "Intel Corp.",
        "Semiconductors",
      ],
      description: "Report on Intel, produced as part of Western Algorithmic Trading Club. Report covers the internal business, industry positioning, and valuation.",
      logo: ConsultlyLogo,
      link: {
        label: "intel-research-report.pdf",
        href: "/reports/intel-research-report.pdf",
      },
    },
  ],
} as const;
