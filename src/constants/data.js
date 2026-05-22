export const PAGES = ["Home", "About", "Resume", "Projects", "Research", "Contact"];

export const PAGE_ICONS = {
  Home: "bi-house",
  About: "bi-person",
  Resume: "bi-file-text",
  Projects: "bi-grid",
  Research: "bi-journal-text",
  Contact: "bi-envelope",
};

export const TYPED_STRINGS = ["Hardware Engineer", "HCI Researcher", "FPGA Builder", "MIT EECS Graduate", "Maker & Inventor"];

export const SKILLS_DATA = [
  { title: "Programming Languages", tags: ["C/C++","Python","Java","SystemVerilog","8080 Assembly","SQL"] },
  { title: "Web Design & Development", tags: ["HTML","CSS","JavaScript","Flask","NodeJS","JQuery","D3"] },
  { title: "Electronic & Mechanical Design", tags: ["MATLAB","SolidWorks","Fusion 360","SPICE","KiCAD","Rhino/Grasshopper"] },
  { title: "Development Ecosystems", tags: ["Visual Studio","Vivado","Eclipse","Oracle SQL","PyCharm/IntelliJ"] },
  { title: "Machining & Manufacturing", tags: ["3D Printing","Laser Cutting","PCB Fabrication","Arduino","Milling","Welding","Woodworking"] },
];

export const SKILL_BARS = [
  { label: "C/C++ & Embedded", pct: 90 },
  { label: "Python", pct: 88 },
  { label: "HTML/CSS/JS", pct: 80 },
  { label: "FPGA / SystemVerilog", pct: 85 },
  { label: "PCB Design (KiCAD)", pct: 82 },
  { label: "3D Design (SolidWorks/Fusion)", pct: 78 },
];

export const EDU = [
  { period: "2019 – 2023", title: "Bachelor of Engineering, EECS", place: "Massachusetts Institute of Technology, Cambridge, MA", desc: "Relevant courses: Introductory Digital Systems Laboratory, Special Subject in Digital Design, Embedded Systems, Computer Systems Engineering, Software Construction, How to Make Almost Anything" },
  { period: "2019 – 2023", title: "Minor in Physics", place: "Massachusetts Institute of Technology, Cambridge, MA", desc: "Statistical Mechanics, Classical Mechanics, Advanced Classical Mechanics, Waves and Vibrations, Quantum Mechanics, Special Relativity" },
];

export const EXP = [
  { period: "Aug 2023 – Present", title: "Partner", place: "Spock Consulting, Cambridge, MA", bullets: ["Worked with small businesses and startups to develop products — spock-consulting.com","Delivered MVPs for 10+ clients: AI Chatbot, Chocolate Tempering Oven, Portfolio Sites, Commercial Music Player","Managed a team of 2 Software Developers to deliver projects on time"] },
  { period: "Jun 2023 – Present", title: "Co-Founder", place: "The New Fitness Corporation (ApeFit), Cambridge, MA", bullets: ["Developed unique hardware sensor technology alongside a team of 2 engineers — apefit.io","Raised over $50K in non-dilutive funding: MIT delta v, MIT Sandbox, C10 Labs Winter 2023 Cohort","Conducted 130+ customer interviews; developed hypothesis validation pipeline","Garnered partnerships with multiple local gyms"] },
  { period: "Jan 2021 – Jul 2023", title: "HCI Researcher", place: "MIT CSAIL, Cambridge, MA", bullets: ["Co-authored 3 papers (1 nominated Best Demo at CHI 2022) at intersection of robotics and 3D printing","Created software for embedding 2D tags in STL files","Evaluated techniques and implemented web-based applications","Designed hardware for lab group and other projects"] },
  { period: "Dec 2021 – Jan 2022", title: "Contract PCB Designer", place: "Timeback Incorporated, New York City", bullets: ["Created custom PCBs to client specification"] },
  { period: "Jun 2019 – Aug 2021", title: "Software Engineer", place: "Chainbridge Solutions, Chantilly, VA", bullets: ["Developed web-based infographics, user-interfaces, presentations, and automations","Implemented FFT and BoofCV image processing to build an Image Processing PDF Reader","Built a data visualization dashboard in JavaScript for improved customer experience","Spearheaded Robotic Process Automation to speed up cross-platform development"] },
];

export const PROJECTS = [
  { name: "GameMan", cat: "Hardware", img: "https://ahmadtak-3212.github.io/assets/img/projects/gameman/nintendo_logo.jpg", desc: "A cycle-accurate FPGA implementation of the original DMG GameBoy.", link: "https://ahmadtak-3212.github.io/page/gameman-project-details.html" },
  { name: "Nikolai V1", cat: "Build", img: "https://ahmadtak-3212.github.io/assets/img/projects/nikolai/nikolai-photo.jpg", desc: "An electromagnetically attractive embedded system gauntlet.", link: "https://ahmadtak-3212.github.io/page/nikolai-project-details.html" },
  { name: "Galina", cat: "Hardware", img: "https://ahmadtak-3212.github.io/assets/img/projects/galina/galina_photo.gif", desc: "An FPGA-driven 3D RGB LED driver with real-time rendering pipeline.", link: "https://ahmadtak-3212.github.io/page/galina-project-details.html" },
  { name: "Rasputin", cat: "Build", img: "https://ahmadtak-3212.github.io/assets/img/projects/rasputin/rasputin_photo_1.jpeg", desc: "A low-cost custom 3D printer, fully designed and built from scratch.", link: "https://ahmadtak-3212.github.io/page/rasputin-project-details.html" },
  { name: "Web-based IR Scanner", cat: "Web", img: "https://ahmadtak-3212.github.io/assets/img/projects/irscanner/irscanner_photo_1.jpg", desc: "Browser app for capturing and decoding near-infrared tags in 3D-printed objects.", link: "https://ahmadtak-3212.github.io/page/irscanner-project-details.html" },
  { name: "Volya", cat: "Build", img: "https://ahmadtak-3212.github.io/assets/img/projects/volya/volya_photo_1.jpg", desc: "A custom 3D-printed brushless motor wound from bare laminations.", link: "https://ahmadtak-3212.github.io/page/volya-project-details.html" },
  { name: "Ruka", cat: "Hardware", img: "https://ahmadtak-3212.github.io/assets/img/projects/ruka/ruka_photo_1.jpg", desc: "A custom 3D-printed mechanical arm stand.", link: "https://ahmadtak-3212.github.io/page/ruka-project-details.html" },
  { name: "Esfir", cat: "Build", img: "https://ahmadtak-3212.github.io/assets/img/projects/esfir/esfir_photo_1.png", desc: "A smart light embedded system with custom MCU board and wireless control.", link: "https://ahmadtak-3212.github.io/page/esfir-project-details.html" },
  { name: "IR Camera Racing Game", cat: "Web", img: "https://ahmadtak-3212.github.io/assets/img/projects/irwebgame/irwebgame_photo_1.gif", desc: "A browser racing game controlled by IR camera input.", link: "https://ahmadtak-3212.github.io/page/irwebgame-project-details.html" },
  { name: "Taka Spectrum Analyzer", cat: "Electronics", img: "https://ahmadtak-3212.github.io/assets/img/progress/week-7/result.jpg", desc: "Real-time embedded audio spectrum analyzer with FFT visualization.", link: "https://ahmadtak-3212.github.io/page/week-7-details.html" },
  { name: "PCB with OLED Display", cat: "Electronics", img: "https://ahmadtak-3212.github.io/assets/img/progress/week-5/final-board.jpg", desc: "Custom KiCAD PCB with OLED display, fabricated from scratch.", link: "https://ahmadtak-3212.github.io/page/week-5-details.html" },
  { name: "Neanderthal 2170XR", cat: "Hardware", img: "https://ahmadtak-3212.github.io/assets/img/projects/neanderthal2170xr/neanderthal2170xr.jpg", desc: "Superscalar 2-way custom FPGA CPU with full pipeline and branch prediction.", link: "https://github.com/nmondal417/Neanderthal2170XR" },
  { name: "Electric ATV", cat: "Build", img: "https://ahmadtak-3212.github.io/assets/img/progress/final_project/project_image.jpg", desc: "Fully custom electric ATV with bespoke motor controller and chassis.", link: "https://ahmadtak-3212.github.io/page/final-project-details.html" },
];

export const RESEARCH = [
  { icon: "🔴", title: "InfraredTags", desc: "2D markers and barcodes imperceptible to the naked eye that can be 3D printed as part of objects, and detected rapidly by low-cost near-infrared cameras.", link: "https://hcie.csail.mit.edu/research/infraredtags/infraredtags.html" },
  { icon: "🔵", title: "StructCodes", desc: "Unobtrusive codes embedded into the structure of laser-cut objects — invisible to the eye but machine-readable, enabling smart physical objects.", link: "https://hcie.csail.mit.edu/research/structcode/structcode.html" },
  { icon: "🟢", title: "BrightMarker", desc: "A fabrication method using fluorescent filaments to embed easily trackable markers in 3D-printed color objects — nominated for Best Demo at CHI 2022.", link: "https://hcie.csail.mit.edu/research/brightmarker/brightmarker.html" },
  { icon: "🟡", title: "FabRobotics", desc: "A digital fabrication pipeline combining traditional 3D printing with mobile robots, enabling automated assembly and fabrication workflows.", link: "https://www.axlab.cs.uchicago.edu/projects/fabrobotics" },
  { icon: "🧠", title: "InfraredTags + CNN", desc: "Extension of InfraredTags showing how embedded tags can be decoded using a convolutional neural network after capture by low-cost near-infrared cameras.", link: "https://dl.acm.org/doi/10.1145/3491101.3519905" },
];

export const BOT_R = {
  degree: ["I graduated from MIT in 2023 with a B.Eng in EECS (Course 6-2), plus a minor in Physics. MIT's combined program exposed me to both software construction and solid-state circuits! ⚡", "MIT Course 6 — EECS — Class of 2023. Physics minor covering Classical Mechanics through Quantum Mechanics and Special Relativity."],
  research: ["I co-authored 3 papers at MIT CSAIL: InfraredTags, StructCodes, BrightMarker, FabRobotics, and an InfraredTags CNN extension. BrightMarker was nominated for Best Demo at CHI 2022! 🔬", "My research is at the intersection of digital fabrication and HCI — embedding invisible, machine-readable tags directly into physical objects during the fabrication process."],
  projects: ["Key projects: GameMan (FPGA GameBoy), Galina (3D LED driver), Nikolai (electromagnetic gauntlet), Rasputin (custom 3D printer), Volya (brushless motor), Electric ATV. Plus PCB work and web tools! 🛠", "I've built across hardware, fabrication, and web. The Electric ATV is probably the most ambitious. Check the Projects page for details on each one!"],
  work: ["Currently Partner at Spock Consulting and Co-Founder of ApeFit (raised $50K+, MIT delta v). Previously HCI researcher at MIT CSAIL and software engineer at Chainbridge Solutions. 🚀", "Wearing many hats: researcher, PCB designer, software engineer, startup founder. Open to new opportunities — reach out!"],
  default: ["That's a great question! My background uniquely bridges FPGA hardware, physical fabrication, HCI research, and web dev. Anything specific you'd like to know? 😄", "Best to reach Ahmad directly at ahmadtak@mit.edu — he'll get back to you personally!"],
};
