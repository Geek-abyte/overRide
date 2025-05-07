// Portfolio data for Jeremiah Oladele

export const personalData = {
  name: "Jeremiah Oladele",
  title: "Software Developer",
  email: "jeremiah.oladele@example.com",
  location: "Lagos, Nigeria",
  availability: "Available for new opportunities",
  about: `
    I'm a software developer with a passion for building exceptional digital experiences. 
    Like crafting in Minecraft, I enjoy building things from scratch and seeing them come to life. 
    I specialize in creating efficient, maintainable, and scalable applications 
    that solve real-world problems.
  `,
  socialLinks: {
    github: "https://github.com/jeremiaholadele",
    linkedin: "https://linkedin.com/in/jeremiaholadele",
    twitter: "https://twitter.com/jeremiaholadele",
  },
};

export const skills = [
  {
    category: "Frontend",
    technologies: [
      "JavaScript (ES6+)",
      "TypeScript",
      "React.js",
      "Next.js",
      "HTML & CSS",
      "Tailwind CSS",
    ],
  },
  {
    category: "Backend",
    technologies: ["Node.js", "Express", "Python", "Django", "MongoDB", "PostgreSQL"],
  },
  {
    category: "Tools",
    technologies: ["Git", "GitHub", "VS Code", "Docker", "Figma", "AWS"],
  },
];

export const projects = [
  {
    id: 1,
    title: "BlockCraft CMS",
    description:
      "A content management system built with React and Node.js, featuring real-time editing, custom block architecture, and responsive design.",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    github: "https://github.com/jeremiaholadele/blockcraft-cms",
    demo: "https://blockcraft-cms.demo.com",
    image: "/images/blockcraft-cms.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "Pixel Analytics",
    description:
      "A data visualization dashboard that transforms complex data into easy-to-understand pixels. Built with React, D3.js, and Firebase.",
    technologies: ["React", "D3.js", "Firebase", "TypeScript"],
    github: "https://github.com/jeremiaholadele/pixel-analytics",
    demo: "https://pixel-analytics.demo.com",
    image: "/images/pixel-analytics.jpg",
    featured: true,
  },
  {
    id: 3,
    title: "CubeWorld E-commerce",
    description:
      "A full-stack e-commerce platform with pixel-perfect UI, cart functionality, and payment processing.",
    technologies: ["Next.js", "MongoDB", "Stripe", "Tailwind CSS"],
    github: "https://github.com/jeremiaholadele/cubeworld-ecommerce",
    demo: "https://cubeworld-shop.demo.com",
    image: "/images/cubeworld-ecommerce.jpg",
    featured: true,
  },
  {
    id: 4,
    title: "MineTask",
    description:
      "A task management application with a Minecraft-inspired UI, featuring drag-and-drop functionality and progress tracking.",
    technologies: ["Vue.js", "Firebase", "CSS3"],
    github: "https://github.com/jeremiaholadele/minetask",
    demo: "https://minetask.demo.com",
    image: "/images/minetask.jpg",
    featured: false,
  },
  {
    id: 5,
    title: "BlockChat",
    description:
      "A real-time chat application with block-based UI elements, user authentication, and message encryption.",
    technologies: ["React", "Socket.io", "Express", "MongoDB"],
    github: "https://github.com/jeremiaholadele/blockchat",
    demo: "https://blockchat.demo.com",
    image: "/images/blockchat.jpg",
    featured: false,
  },
];

export const experience = [
  {
    id: 1,
    position: "Senior Frontend Developer",
    company: "BlockTech Solutions",
    location: "Lagos, Nigeria",
    duration: "January 2023 - Present",
    responsibilities: [
      "Lead a team of 5 developers in building responsive and accessible web applications",
      "Implemented CI/CD pipelines that reduced deployment time by 40%",
      "Refactored legacy codebase to modern React patterns, improving performance by 30%",
      "Mentored junior developers through code reviews and pair programming sessions",
    ],
  },
  {
    id: 2,
    position: "Full Stack Developer",
    company: "Pixel Perfect Agency",
    location: "Remote",
    duration: "June 2021 - December 2022",
    responsibilities: [
      "Developed full-stack web applications using React, Node.js, and MongoDB",
      "Implemented RESTful APIs that handled over 1M requests per day",
      "Collaborated with designers to implement pixel-perfect UIs with responsive designs",
      "Optimized database queries, reducing load times by 50%",
    ],
  },
  {
    id: 3,
    position: "Frontend Developer",
    company: "CubeTech Innovations",
    location: "Abuja, Nigeria",
    duration: "February 2020 - May 2021",    responsibilities: [
      "Built and maintained responsive websites using HTML, CSS, and JavaScript",
      "Implemented new features and fixed bugs in existing applications",
      "Collaborated with designers and backend developers to create cohesive user experiences",
      "Participated in code reviews and contributed to team documentation",
    ],
  },
];
