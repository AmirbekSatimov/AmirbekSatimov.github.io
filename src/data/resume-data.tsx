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

type Project = {
  title: string;
  date: string;
  techStack: readonly string[];
  description: string;
  link?: { label: string; href: string };
  media?: readonly { src: string; alt: string; type?: "image" | "video" }[];
};

export const RESUME_DATA = {
  name: "Amir Satimov",
  initials: "AS",
  location: "Toronto, Canada",
  locationLink: "https://www.google.com/maps/place/Toronto",
  about:
    "Investment Analyst at Fiera Infrastructure",
  summary:
    "I build at the seam between engineering and business. Mechatronics and Ivey at Western, then investment banking and infrastructure private equity — renewable power portfolios, fiber networks, and the occasional Python model that replaced a spreadsheet nobody wanted to maintain. I've founded things, scaled them, and learned that I'd rather be close to what's being built than a step removed from it. Currently focused on early-stage work where the mandate is broad and the outcome is yours to own.",
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
      {
        name: "GitHub",
        url: "https://github.com/AmirbekSatimov",
        icon: GitHubIcon,
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
      company: "Lore.",
      link: "https://lorecinemas.com/",
      badges: [],
      title: "Co-Founder",
      logo: ClevertechLogo,
      start: "April 2026",
      end: "Present",
      description:
        "Co-founded mobile-first entertainment ranking platform that replaces traditional star ratings with a comparative ranking system to capture how people actually think about movies and TV shows and to “intentionalize” consumption.",
      media: [
        {
          src: "/work/lore-app.webp",
          alt: "Lore app home screen showing a title card and recommendations",
        },
        {
          src: "/work/lore-demo.mp4",
          alt: "Screen recording demo of the Lore app",
          type: "video",
        },
      ],
    },
    {
      company: "Fiera Infrastructure.",
      link: "https://www.fierainfrastructure.com/en/",
      badges: ["Python", "AI Automation"],
      title: "Investment Analyst",
      logo: ClevertechLogo,
      start: "July 2025",
      end: "Present",
      description: [
        "Member of Investments team, managing and deploying $4.8B in funds across infrastructure-class assets. Providing analytical, modelling, and due diligence support for transaction execution and asset management (AM) duties.",
        "Led AI integration into asset management and reporting. Automated quarterly operating reports using Python and Claude Code, cutting reporting turnaround by ~75%. Automated tracking-related workstream, cutting turnaround time by ~80%.",
      ],
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
    "Python & Automation (Pandas)",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Expo",
    "Supabase",
    "Git",
    "Claude Code / AI-assisted development",
    "Financial Modelling",
    "Valuation",
    "Excel",
    "Stakeholder-Facing Work",
    "GTM",
  ],
  projects: [
    {
      title: "Capstone Project",
      date: "April 2025",
      techStack: ["Solidworks", "Engineering Design"],
      description:
        "Designed and contructed a portable, loom for weaving biomaterials into a 3D structure. Key member in CAD design, group coordinator",
      media: [
        {
          src: "/projects/No_T-Slot_V2.webp",
          alt: "CAD render of the loom assembly",
        },
        {
          src: "/projects/IMG_5169.webp",
          alt: "Assembled loom prototype on the workbench",
        },
        {
          src: "/projects/IMG_5424.mp4",
          alt: "Clip of the loom weaving",
          type: "video",
        },
      ],
    },
  ] as readonly Project[],
  pieces: [
    {
      title: 'Exploring "Why Nations Fail"',
      date: "Nov 2025",
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
      date: "Feb 2024",
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
      date: "Dec 2023",
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
