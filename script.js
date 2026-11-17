/* ==========================================================================
   BRUNO BORJES — PORTFOLIO ARCHITECTURE, I18N, THEME ENGINE & CANVAS GAME
   ========================================================================== */

let currentLang = localStorage.getItem("bb_lang") || "pt";
let currentStackFilter = "all";
let gameStateMode = "idle"; // "idle" | "playing" | "gameover"
let lastGameScore = 0;
let lastGameHighScore = Number(localStorage.getItem("bb_dev_highscore")) || 0;

/* --------------------------------------------------------------------------
   BILINGUAL DICTIONARY (PT-BR & EN)
   -------------------------------------------------------------------------- */
const TRANSLATIONS = {
  pt: {
    metaTitle: "Bruno Borjes — Desenvolvedor Full Stack",
    metaDescription:
      "Portfólio de Bruno Borjes, Desenvolvedor Full Stack formado em Análise e Desenvolvimento de Sistemas. Desenvolvimento de aplicações web, interfaces modernas, APIs e automações.",
    "nav.about": "Sobre",
    "nav.stack": "Stack",
    "nav.services": "Serviços",
    "nav.playground": "Playground",
    "nav.contact": "Contato",
    "nav.cta": "Iniciar Conversa",

    "hero.status": "Disponível para projetos & oportunidades",
    "hero.eyebrow": "BRUNO BORJES — DESENVOLVEDOR FULL STACK",
    "hero.title":
      'Arquitetura sólida e interfaces que transformam ideias em <span class="text-accent-highlight">produtos digitais.</span>',
    "hero.description":
      "Desenvolvo aplicações web completas, landing pages de alta conversão e automações inteligentes — unindo precisão técnica no back-end e experiência refinada no front-end.",
    "hero.ctaPrimary": "Entrar em Contato",
    "hero.ctaSecondary": "Conhecer Serviços",
    "hero.connections": "Conexões:",

    "code.education": '"Análise e Desenvolvimento de Sistemas"',
    "code.feComment": "// Componentização modular e acessibilidade",
    "code.beComment": "// APIs RESTful e automação de fluxos",

    "about.index": "01 // SOBRE MIM",
    "about.heading":
      "Visão de produto aliada à engenharia de software de ponta a ponta.",
    "about.badge": "Trajetória & Formação",
    "about.mainTitle":
      "Construindo software funcional, escalável e orientado à experiência real.",
    "about.p1":
      "Sou <strong>Bruno Borjes</strong>, desenvolvedor Full Stack com formação em <strong>Análise e Desenvolvimento de Sistemas</strong>. Minha atuação é focada em transformar demandas de negócios e ideias em aplicações web estruturadas, rápidas e intuitivas.",
    "about.p2":
      "Transitando com naturalidade entre o design de interface e a lógica de servidor, acompanho todo o ciclo de desenvolvimento: da arquitetura semântica e responsiva no Front-end até a construção de APIs, regras de negócio e automações no Back-end.",
    "about.roleSubtitle": "Analista e Desenvolvedor de Sistemas",
    "about.feTitle": "Engenharia Front-end",
    "about.feDesc":
      "Interfaces modernas e acessíveis com HTML5, CSS3, JavaScript e React. Foco em hierarquia visual, microinterações fluidas e responsividade real em qualquer tela.",
    "about.beTitle": "Back-end & Automação",
    "about.beDesc":
      "Estruturação de serviços em Node.js, integração de dados e automação de processos operacionais para eliminar gargalos e tarefas manuais.",
    "about.qaTitle": "Código Limpo & Manutenibilidade",
    "about.qaDesc":
      "Organização modular, controle de versão rigoroso com Git e GitHub, boas práticas de SEO técnico e atenção aos detalhes que sustentam o crescimento do produto.",

    "stack.index": "02 // STACK TECNOLÓGICA",
    "stack.heading": "Tecnologias e ferramentas do meu fluxo de trabalho.",
    "stack.filterAll": "Todas",
    "stack.filterFrontend": "Front-end",
    "stack.filterBackend": "Back-end",
    "stack.filterTools": "Versionamento",

    "services.index": "03 // SERVIÇOS & ESCOPO",
    "services.heading": "Como posso contribuir com o seu projeto ou empresa.",
    "services.s1Title": "Landing Pages",
    "services.s1Desc":
      "Páginas rápidas, responsivas e estruturadas com foco em clareza de proposta de valor e conversão de visitantes.",
    "services.s2Title": "Sites Profissionais",
    "services.s2Desc":
      "Presença digital institucional com identidade visual consistente, código limpo e otimização para mecanismos de busca.",
    "services.s3Title": "Sistemas Personalizados",
    "services.s3Desc":
      "Plataformas web sob medida para centralizar operações, organizar informações e apoiar a gestão do negócio.",
    "services.s4Title": "Aplicações Web (SPA)",
    "services.s4Desc":
      "Interfaces interativas construídas em React com navegação fluida, componentização reutilizável e excelente usabilidade.",
    "services.s5Title": "Automação de Processos",
    "services.s5Desc":
      "Integração de fluxos de trabalho com Node.js e scripts automatizados para reduzir tarefas manuais repetitivas.",
    "services.s6Title": "Refatoração & Evolução",
    "services.s6Desc":
      "Melhoria de performance, modernização de interfaces, correção de bugs e reestruturação de código existente.",

    "game.index": "04 // PLAYGROUND INTERATIVO",
    "game.heading": "Desafio do Desenvolvedor",
    "game.lead":
      "Uma pausa interativa: capture blocos de código válido (<code>&lt;/&gt;</code>, <code>{}</code>) e evite os <code>BUG</code>s antes que a integridade do build chegue a zero.",
    "game.scoreLabel": "SCORE",
    "game.integrityLabel": "INTEGRIDADE",
    "game.highScoreLabel": "RECORDE",
    "game.idleTitle": "Pronto para compilar?",
    "game.idleText":
      "Mova com as setas <strong>&larr; &rarr;</strong>, teclas <strong>A / D</strong> ou toque nos controles abaixo.",
    "game.startBtn": "Iniciar Execução",
    "game.overTitle": "Build interrompido!",
    "game.restartBtn": "Executar Novamente",

    "contact.index": "05 // CONTATO",
    "contact.heading": "Vamos construir algo relevante juntos.",
    "contact.lead":
      "Disponível para oportunidades como Desenvolvedor Full Stack, freelas especializados e desenvolvimento de projetos sob medida para empresas.",
    "contact.waLabel": "WhatsApp Direto",
    "contact.emailLabel": "E-mail Profissional",
    "contact.waText":
      "Olá Bruno, vim pelo seu portfólio e gostaria de conversar sobre um projeto.",

    "form.title": "Envie uma mensagem",
    "form.subtitle": "As respostas são encaminhadas diretamente ao meu e-mail.",
    "form.nameLabel": "Seu Nome",
    "form.namePlaceholder": "Ex: Carlos Silva",
    "form.emailLabel": "Seu E-mail",
    "form.emailPlaceholder": "carlos@empresa.com",
    "form.subjectLabel": "Assunto / Tipo de Projeto",
    "form.optLanding": "Landing Page",
    "form.optWebsite": "Site Profissional",
    "form.optSystem": "Sistema Web / Aplicação",
    "form.optAutomation": "Automação de Processos",
    "form.optHiring": "Oportunidade / Recrutamento",
    "form.optOther": "Outro",
    "form.messageLabel": "Mensagem",
    "form.messagePlaceholder":
      "Descreva brevemente o contexto, objetivo ou oportunidade...",
    "form.submitBtn": "Enviar Mensagem",
    "form.sending": "Enviando...",
    "form.success":
      "Mensagem enviada com sucesso! Retornarei o contato em breve.",
    "form.error":
      "Não foi possível enviar automaticamente. Você pode me chamar diretamente pelo WhatsApp ao lado.",

    "footer.copy":
      '&copy; <span id="currentYear">2026</span> Bruno Borjes. Desenvolvido com arquitetura limpa e sem dependências desnecessárias.'
  },

  en: {
    metaTitle: "Bruno Borjes — Full Stack Developer",
    metaDescription:
      "Portfolio of Bruno Borjes, Full Stack Developer with a degree in Systems Analysis and Development. Building web applications, modern interfaces, APIs, and automations.",
    "nav.about": "About",
    "nav.stack": "Stack",
    "nav.services": "Services",
    "nav.playground": "Playground",
    "nav.contact": "Contact",
    "nav.cta": "Get in Touch",

    "hero.status": "Available for projects & opportunities",
    "hero.eyebrow": "BRUNO BORJES — FULL STACK DEVELOPER",
    "hero.title":
      'Solid architecture and interfaces that turn ideas into <span class="text-accent-highlight">digital products.</span>',
    "hero.description":
      "I build end-to-end web applications, high-converting landing pages, and smart automations — combining back-end precision with refined front-end experiences.",
    "hero.ctaPrimary": "Get in Touch",
    "hero.ctaSecondary": "Explore Services",
    "hero.connections": "Connect:",

    "code.education": '"Systems Analysis and Development"',
    "code.feComment": "// Modular componentization & accessibility",
    "code.beComment": "// RESTful APIs & workflow automation",

    "about.index": "01 // ABOUT ME",
    "about.heading":
      "Product mindset paired with end-to-end software engineering.",
    "about.badge": "Background & Education",
    "about.mainTitle":
      "Building functional, scalable software driven by real user experience.",
    "about.p1":
      "I'm <strong>Bruno Borjes</strong>, a Full Stack Developer with a degree in <strong>Systems Analysis and Development</strong>. My work focuses on turning business needs and ideas into structured, fast, and intuitive web applications.",
    "about.p2":
      "Moving seamlessly between interface design and server-side logic, I cover the full development lifecycle: from semantic, responsive front-end architecture to building APIs, business logic, and back-end automations.",
    "about.roleSubtitle": "Systems Analyst & Full Stack Developer",
    "about.feTitle": "Front-end Engineering",
    "about.feDesc":
      "Modern, accessible interfaces built with HTML5, CSS3, JavaScript, and React. Focused on visual hierarchy, fluid micro-interactions, and true cross-device responsiveness.",
    "about.beTitle": "Back-end & Automation",
    "about.beDesc":
      "Structuring Node.js services, data integrations, and operational workflow automations to eliminate bottlenecks and repetitive manual tasks.",
    "about.qaTitle": "Clean Code & Maintainability",
    "about.qaDesc":
      "Modular architecture, disciplined version control with Git and GitHub, technical SEO best practices, and attention to detail that sustains long-term growth.",

    "stack.index": "02 // TECH STACK",
    "stack.heading": "Technologies and tools in my development workflow.",
    "stack.filterAll": "All",
    "stack.filterFrontend": "Front-end",
    "stack.filterBackend": "Back-end",
    "stack.filterTools": "Version Control",

    "services.index": "03 // SERVICES & SCOPE",
    "services.heading": "How I can contribute to your project or company.",
    "services.s1Title": "Landing Pages",
    "services.s1Desc":
      "Fast, responsive pages engineered with clear value proposition hierarchy and visitor conversion in mind.",
    "services.s2Title": "Professional Websites",
    "services.s2Desc":
      "Institutional web presence with cohesive visual identity, clean code, and search engine optimization.",
    "services.s3Title": "Custom Web Systems",
    "services.s3Desc":
      "Tailor-made web platforms designed to centralize operations, organize data, and support business management.",
    "services.s4Title": "Web Applications (SPA)",
    "services.s4Desc":
      "Interactive interfaces built in React with smooth navigation, reusable components, and intuitive usability.",
    "services.s5Title": "Process Automation",
    "services.s5Desc":
      "Workflow integrations using Node.js and automated scripts to streamline operations and cut repetitive work.",
    "services.s6Title": "Refactoring & Evolution",
    "services.s6Desc":
      "Performance optimization, UI modernization, bug fixing, and structural improvements to existing codebases.",

    "game.index": "04 // INTERACTIVE PLAYGROUND",
    "game.heading": "Developer Challenge",
    "game.lead":
      "Take a quick interactive break: catch valid code blocks (<code>&lt;/&gt;</code>, <code>{}</code>) and dodge <code>BUG</code>s before build integrity hits zero.",
    "game.scoreLabel": "SCORE",
    "game.integrityLabel": "INTEGRITY",
    "game.highScoreLabel": "HIGH SCORE",
    "game.idleTitle": "Ready to compile?",
    "game.idleText":
      "Move with arrow keys <strong>&larr; &rarr;</strong>, <strong>A / D</strong> keys, or tap the touch controls below.",
    "game.startBtn": "Start Run",
    "game.overTitle": "Build interrupted!",
    "game.restartBtn": "Run Again",

    "contact.index": "05 // CONTACT",
    "contact.heading": "Let's build something meaningful together.",
    "contact.lead":
      "Available for Full Stack Developer roles, specialized freelance engagements, and custom web development for companies.",
    "contact.waLabel": "Direct WhatsApp",
    "contact.emailLabel": "Professional Email",
    "contact.waText":
      "Hi Bruno, I visited your portfolio and would like to talk about a project.",

    "form.title": "Send a message",
    "form.subtitle": "Submissions are delivered directly to my inbox.",
    "form.nameLabel": "Your Name",
    "form.namePlaceholder": "e.g., Alex Morgan",
    "form.emailLabel": "Your Email",
    "form.emailPlaceholder": "alex@company.com",
    "form.subjectLabel": "Subject / Project Type",
    "form.optLanding": "Landing Page",
    "form.optWebsite": "Professional Website",
    "form.optSystem": "Web System / Application",
    "form.optAutomation": "Process Automation",
    "form.optHiring": "Job Opportunity / Recruiting",
    "form.optOther": "Other",
    "form.messageLabel": "Message",
    "form.messagePlaceholder":
      "Briefly describe your project context, goals, or opportunity...",
    "form.submitBtn": "Send Message",
    "form.sending": "Sending...",
    "form.success":
      "Message sent successfully! I will get back to you shortly.",
    "form.error":
      "Automatic delivery failed. Feel free to reach out directly via WhatsApp on the left.",

    "footer.copy":
      '&copy; <span id="currentYear">2026</span> Bruno Borjes. Built with clean architecture and zero unnecessary dependencies.'
  }
};

/* --------------------------------------------------------------------------
   EXTENSIBLE TECH STACK DATA (PT & EN)
   -------------------------------------------------------------------------- */
const TECH_STACK = [
  {
    name: "HTML5",
    category: "frontend",
    icon: "fa-brands fa-html5",
    color: "#e34f26",
    pt: {
      categoryLabel: "Front-end",
      description:
        "Estruturação semântica, SEO técnico e acessibilidade (a11y) na web."
    },
    en: {
      categoryLabel: "Front-end",
      description:
        "Semantic markup, technical SEO, and web accessibility (a11y) standards."
    }
  },
  {
    name: "CSS3",
    category: "frontend",
    icon: "fa-brands fa-css3-alt",
    color: "#38bdf8",
    pt: {
      categoryLabel: "Front-end",
      description:
        "Arquitetura responsiva com CSS Grid, Flexbox, variáveis e microinterações."
    },
    en: {
      categoryLabel: "Front-end",
      description:
        "Responsive layouts with CSS Grid, Flexbox, custom properties, and micro-interactions."
    }
  },
  {
    name: "JavaScript",
    category: "frontend",
    icon: "fa-brands fa-js",
    color: "#eab308",
    pt: {
      categoryLabel: "Linguagem",
      description:
        "ES6+, programação assíncrona, consumo de APIs e manipulação eficiente do DOM."
    },
    en: {
      categoryLabel: "Language",
      description:
        "ES6+, asynchronous programming, API integration, and efficient DOM manipulation."
    }
  },
  {
    name: "React",
    category: "frontend",
    icon: "fa-brands fa-react",
    color: "#0ea5e9",
    pt: {
      categoryLabel: "Front-end",
      description:
        "Interfaces reativas baseadas em componentes reutilizáveis, hooks e estado."
    },
    en: {
      categoryLabel: "Front-end",
      description:
        "Reactive user interfaces built with reusable components, hooks, and state management."
    }
  },
  {
    name: "Node.js",
    category: "backend",
    icon: "fa-brands fa-node-js",
    color: "#16a34a",
    pt: {
      categoryLabel: "Back-end",
      description:
        "Desenvolvimento de serviços server-side, APIs REST e scripts de automação."
    },
    en: {
      categoryLabel: "Back-end",
      description:
        "Server-side services, REST APIs, and automated workflow scripts."
    }
  },
  {
    name: "Git",
    category: "tools",
    icon: "fa-brands fa-git-alt",
    color: "#f97316",
    pt: {
      categoryLabel: "Versionamento",
      description:
        "Controle de histórico, branches organizados e rastreabilidade de alterações."
    },
    en: {
      categoryLabel: "Version Control",
      description:
        "Version history management, structured branching, and full change traceability."
    }
  },
  {
    name: "GitHub",
    category: "tools",
    icon: "fa-brands fa-github",
    color: "var(--text-primary)",
    pt: {
      categoryLabel: "Colaboração",
      description:
        "Hospedagem de repositórios, revisão de código e integração contínua."
    },
    en: {
      categoryLabel: "Collaboration",
      description:
        "Repository hosting, code review workflows, and continuous deployment."
    }
  }
];

document.addEventListener("DOMContentLoaded", () => {
  initThemeSwitcher();
  initNavigation();
  initScrollEffects();
  initSpotlightCards();
  initHeroWorkbench();
  initTechStack();
  initLanguageSwitcher();
  initContactSystem();
  initDevMinigame();
});

/* --------------------------------------------------------------------------
   1. THEME SWITCHER (LIGHT & DARK MODE)
   -------------------------------------------------------------------------- */
function initThemeSwitcher() {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');

  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("bb_theme", theme);

    if (themeIcon) {
      themeIcon.className =
        theme === "light" ? "fa-solid fa-moon" : "fa-solid fa-sun";
    }
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        theme === "light" ? "#f8fafc" : "#07080a"
      );
    }

    // Notify canvas game to redraw with updated theme colors
    window.dispatchEvent(new CustomEvent("bb:themechange", { detail: theme }));
  };

  const initialTheme =
    document.documentElement.getAttribute("data-theme") || "dark";
  applyTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      applyTheme(current === "light" ? "dark" : "light");
    });
  }
}

/* --------------------------------------------------------------------------
   2. LANGUAGE SWITCHER (PT-BR & EN)
   -------------------------------------------------------------------------- */
function initLanguageSwitcher() {
  const langButtons = document.querySelectorAll(".lang-option");

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedLang = btn.getAttribute("data-lang");
      if (selectedLang && selectedLang !== currentLang) {
        applyLanguage(selectedLang);
      }
    });
  });

  applyLanguage(currentLang);
}

function applyLanguage(lang) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.pt;
  currentLang = lang;
  localStorage.setItem("bb_lang", lang);

  document.documentElement.setAttribute("lang", lang === "en" ? "en" : "pt-BR");
  document.title = dict.metaTitle;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", dict.metaDescription);

  // Update active state on PT | EN buttons
  document.querySelectorAll(".lang-option").forEach((btn) => {
    const isActive = btn.getAttribute("data-lang") === lang;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });

  // Plain text elements
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) {
      el.textContent = dict[key];
    }
  });

  // Rich HTML elements
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    if (dict[key] !== undefined) {
      el.innerHTML = dict[key];
    }
  });

  // Input & textarea placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key] !== undefined) {
      el.setAttribute("placeholder", dict[key]);
    }
  });

  // Update WhatsApp pre-filled message links
  const encodedMsg = encodeURIComponent(dict["contact.waText"]);
  document.querySelectorAll(".js-whatsapp-link").forEach((link) => {
    link.setAttribute("href", `https://wa.me/5532999273236?text=${encodedMsg}`);
  });

  // Refresh dynamic year in footer
  const currentYear = document.getElementById("currentYear");
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Re-render Tech Stack in active language
  renderTechStack();

  // Refresh Minigame Overlay if visible
  syncGameOverlayLanguage();
}

function syncGameOverlayLanguage() {
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.pt;
  const overlayTitle = document.getElementById("overlayTitle");
  const overlayText = document.getElementById("overlayText");
  const startGameBtn = document.getElementById("startGameBtn");

  if (!overlayTitle || !overlayText || !startGameBtn) return;

  if (gameStateMode === "gameover") {
    overlayTitle.textContent = dict["game.overTitle"];
    overlayText.innerHTML =
      currentLang === "en"
        ? `Final score: <strong>${lastGameScore} pts</strong> &bull; High score: <strong>${lastGameHighScore} pts</strong>`
        : `Pontuação final: <strong>${lastGameScore} pts</strong> &bull; Recorde: <strong>${lastGameHighScore} pts</strong>`;
    startGameBtn.innerHTML = `<i class="fa-solid fa-rotate-right"></i><span>${dict["game.restartBtn"]}</span>`;
  } else {
    overlayTitle.textContent = dict["game.idleTitle"];
    overlayText.innerHTML = dict["game.idleText"];
    startGameBtn.innerHTML = `<i class="fa-solid fa-play"></i><span>${dict["game.startBtn"]}</span>`;
  }
}

/* --------------------------------------------------------------------------
   3. NAVIGATION & MOBILE DRAWER
   -------------------------------------------------------------------------- */
function initNavigation() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!hamburger || !navMenu) return;

  const toggleMenu = (forceClose = false) => {
    const isOpen = forceClose ? false : !navMenu.classList.contains("active");
    navMenu.classList.toggle("active", isOpen);
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  };

  hamburger.addEventListener("click", () => toggleMenu());

  navLinks.forEach((link) => {
    link.addEventListener("click", () => toggleMenu(true));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("active")) {
      toggleMenu(true);
    }
  });
}

/* --------------------------------------------------------------------------
   4. SCROLL PROGRESS, ACTIVE SECTION SPY & REVEAL OBSERVER
   -------------------------------------------------------------------------- */
function initScrollEffects() {
  const scrollProgress = document.getElementById("scrollProgress");
  const header = document.getElementById("header");
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-menu .nav-link");
  const backToTop = document.getElementById("backToTop");

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const updateScrollUI = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgress) {
      scrollProgress.style.width = `${progress}%`;
    }

    if (header) {
      header.classList.toggle("scrolled", scrollTop > 24);
    }

    let currentSectionId = "";
    sections.forEach((sec) => {
      const top = sec.offsetTop - 160;
      if (scrollTop >= top) {
        currentSectionId = sec.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      link.classList.toggle("active", href === `#${currentSectionId}`);
    });
  };

  window.addEventListener("scroll", updateScrollUI, { passive: true });
  updateScrollUI();

  const revealEls = document.querySelectorAll("[data-reveal]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const delay = entry.target.getAttribute("data-delay") || 0;
        entry.target.style.transitionDelay = `${delay}ms`;
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------------------------
   5. MOUSE-TRACKING RADIAL SPOTLIGHT ON CARDS
   -------------------------------------------------------------------------- */
function initSpotlightCards() {
  const cards = document.querySelectorAll(".spotlight-card");

  cards.forEach((card) => {
    if (card.dataset.spotlightBound) return;
    card.dataset.spotlightBound = "true";

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });
}

/* --------------------------------------------------------------------------
   6. HERO INTERACTIVE WORKBENCH TABS
   -------------------------------------------------------------------------- */
function initHeroWorkbench() {
  const tabs = document.querySelectorAll(".wb-tab");
  const panels = document.querySelectorAll(".code-panel");

  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-tab");

      tabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle("active", active);
        t.setAttribute("aria-selected", String(active));
      });

      panels.forEach((panel) => {
        panel.classList.toggle(
          "active",
          panel.getAttribute("data-panel") === target
        );
      });
    });
  });
}

/* --------------------------------------------------------------------------
   7. EXTENSIBLE TECH STACK RENDERER & FILTER
   -------------------------------------------------------------------------- */
function initTechStack() {
  const filterBtns = document.querySelectorAll(".filter-btn");

  renderTechStack();

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentStackFilter = btn.getAttribute("data-filter") || "all";
      filterBtns.forEach((b) => b.classList.toggle("active", b === btn));
      applyStackFilter();
    });
  });
}

function renderTechStack() {
  const stackGrid = document.getElementById("stackGrid");
  if (!stackGrid) return;

  stackGrid.innerHTML = TECH_STACK.map((tech) => {
    const localized = tech[currentLang] || tech.pt;
    return `
      <article class="skill-card spotlight-card" data-category="${tech.category}">
        <div class="skill-header">
          <i class="${tech.icon} skill-icon" style="color: ${tech.color};" aria-hidden="true"></i>
          <span class="skill-cat-tag">${localized.categoryLabel}</span>
        </div>
        <h3>${tech.name}</h3>
        <p>${localized.description}</p>
      </article>
    `;
  }).join("");

  initSpotlightCards();
  applyStackFilter();
}

function applyStackFilter() {
  const stackGrid = document.getElementById("stackGrid");
  if (!stackGrid) return;

  const cards = stackGrid.querySelectorAll(".skill-card");
  cards.forEach((card) => {
    const match =
      currentStackFilter === "all" ||
      card.getAttribute("data-category") === currentStackFilter;
    card.classList.toggle("hidden-skill", !match);
  });
}

/* --------------------------------------------------------------------------
   8. CONTACT FORM (DIRECT EMAIL VIA FORMSUBMIT AJAX) & CLIPBOARD COPY
   -------------------------------------------------------------------------- */
function initContactSystem() {
  const copyBtn = document.getElementById("copyEmailBtn");
  const emailText = document.getElementById("emailText");
  const contactForm = document.getElementById("contactForm");
  const formFeedback = document.getElementById("formFeedback");
  const submitBtn = document.getElementById("submitBtn");

  if (copyBtn && emailText) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(emailText.textContent.trim());
        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
        copyBtn.style.color = "var(--accent)";
        setTimeout(() => {
          copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
          copyBtn.style.color = "";
        }, 2000);
      } catch {
        // Fallback silencioso
      }
    });
  }

  if (contactForm && formFeedback && submitBtn) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.pt;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>${dict["form.sending"]}</span><i class="fa-solid fa-spinner fa-spin"></i>`;
      formFeedback.textContent = "";

      const formData = new FormData(contactForm);
      formData.append("_subject", "Novo contato pelo Portfólio — Bruno Borjes");
      formData.append("_captcha", "false");

      try {
        const response = await fetch(
          "https://formsubmit.co/ajax/brunoborjes.dev@gmail.com",
          {
            method: "POST",
            headers: { Accept: "application/json" },
            body: formData
          }
        );

        if (!response.ok) throw new Error("Send failed");

        formFeedback.style.color = "var(--accent)";
        formFeedback.textContent = dict["form.success"];
        contactForm.reset();
      } catch {
        formFeedback.style.color = "#ef4444";
        formFeedback.textContent = dict["form.error"];
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span data-i18n="form.submitBtn">${dict["form.submitBtn"]}</span><i class="fa-solid fa-paper-plane"></i>`;
      }
    });
  }
}

/* --------------------------------------------------------------------------
   9. MINIGAME: "DESAFIO DO DESENVOLVEDOR" (THEME-AWARE CANVAS ENGINE)
   -------------------------------------------------------------------------- */
function initDevMinigame() {
  const canvas = document.getElementById("gameCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const startGameBtn = document.getElementById("startGameBtn");
  const gameOverlay = document.getElementById("gameOverlay");
  const gameScoreEl = document.getElementById("gameScore");
  const gameHighScoreEl = document.getElementById("gameHighScore");
  const gameLivesEl = document.getElementById("gameLives");
  const btnLeft = document.getElementById("btnLeft");
  const btnRight = document.getElementById("btnRight");

  const LOGICAL_WIDTH = 760;
  const LOGICAL_HEIGHT = 360;

  const setupCanvasResolution = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = LOGICAL_WIDTH * dpr;
    canvas.height = LOGICAL_HEIGHT * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  setupCanvasResolution();

  let animationId = null;
  let score = 0;
  let lives = 3;
  let frameCount = 0;
  let items = [];
  let particles = [];

  if (gameHighScoreEl) gameHighScoreEl.textContent = lastGameHighScore;

  const player = {
    x: LOGICAL_WIDTH / 2 - 28,
    y: LOGICAL_HEIGHT - 42,
    width: 56,
    height: 24,
    speed: 6.5,
    dx: 0
  };

  const itemCatalog = [
    { kind: "code", label: "</>", color: "#10b981", points: 10 },
    { kind: "code", label: "{ }", color: "#0284c7", points: 15 },
    { kind: "code", label: "git", color: "#8b5cf6", points: 20 },
    { kind: "bug", label: "BUG", color: "#ef4444", points: 0 }
  ];

  const spawnBurst = (x, y, color) => {
    for (let i = 0; i < 10; i++) {
      const angle = (Math.PI * 2 * i) / 10;
      const speed = 1.5 + Math.random() * 2.5;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color
      });
    }
  };

  const updateHUD = () => {
    if (gameScoreEl) gameScoreEl.textContent = score;
    if (gameLivesEl) {
      gameLivesEl.textContent = `${lives} / 3`;
      gameLivesEl.style.color = lives === 1 ? "#ef4444" : "var(--accent)";
    }
  };

  const resetState = () => {
    score = 0;
    lives = 3;
    frameCount = 0;
    items = [];
    particles = [];
    player.x = LOGICAL_WIDTH / 2 - player.width / 2;
    player.dx = 0;
    updateHUD();
  };

  const endGame = () => {
    gameStateMode = "gameover";
    cancelAnimationFrame(animationId);

    lastGameScore = score;
    if (score > lastGameHighScore) {
      lastGameHighScore = score;
      localStorage.setItem("bb_dev_highscore", String(lastGameHighScore));
      if (gameHighScoreEl) gameHighScoreEl.textContent = lastGameHighScore;
    }

    syncGameOverlayLanguage();
    if (gameOverlay) gameOverlay.style.display = "flex";
  };

  const loop = () => {
    if (gameStateMode !== "playing") return;
    frameCount++;

    player.x += player.dx;
    if (player.x < 10) player.x = 10;
    if (player.x + player.width > LOGICAL_WIDTH - 10) {
      player.x = LOGICAL_WIDTH - 10 - player.width;
    }

    const spawnRate = Math.max(24, 44 - Math.floor(score / 80));
    if (frameCount % spawnRate === 0) {
      const template =
        itemCatalog[Math.floor(Math.random() * itemCatalog.length)];
      items.push({
        x: 24 + Math.random() * (LOGICAL_WIDTH - 76),
        y: -26,
        width: 44,
        height: 24,
        speed: 2.6 + Math.random() * 1.8 + Math.min(2.2, score / 250),
        ...template
      });
    }

    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i];
      item.y += item.speed;

      const collided =
        player.x < item.x + item.width &&
        player.x + player.width > item.x &&
        player.y < item.y + item.height &&
        player.y + player.height > item.y;

      if (collided) {
        spawnBurst(
          item.x + item.width / 2,
          item.y + item.height / 2,
          item.color
        );
        items.splice(i, 1);

        if (item.kind === "bug") {
          lives -= 1;
          updateHUD();
          if (lives <= 0) {
            endGame();
            return;
          }
        } else {
          score += item.points;
          updateHUD();
        }
        continue;
      }

      if (item.y > LOGICAL_HEIGHT + 30) {
        items.splice(i, 1);
      }
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.035;
      if (p.alpha <= 0) particles.splice(i, 1);
    }

    render();
    animationId = requestAnimationFrame(loop);
  };

  const render = () => {
    const isLight =
      document.documentElement.getAttribute("data-theme") === "light";

    ctx.clearRect(0, 0, LOGICAL_WIDTH, LOGICAL_HEIGHT);

    // Theme-aware grid lines
    ctx.strokeStyle = isLight
      ? "rgba(15, 23, 42, 0.06)"
      : "rgba(255, 255, 255, 0.03)";
    ctx.lineWidth = 1;
    for (let x = 0; x < LOGICAL_WIDTH; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, LOGICAL_HEIGHT);
      ctx.stroke();
    }

    // Player Paddle
    ctx.fillStyle = isLight ? "#059669" : "#10b981";
    ctx.beginPath();
    ctx.roundRect(player.x, player.y, player.width, player.height, 6);
    ctx.fill();

    ctx.fillStyle = isLight ? "#ffffff" : "#04130d";
    ctx.font = "600 11px 'JetBrains Mono', monospace";
    ctx.textAlign = "center";
    ctx.fillText(
      "<dev/>",
      player.x + player.width / 2,
      player.y + player.height / 2 + 4
    );

    // Falling Tokens
    items.forEach((item) => {
      ctx.fillStyle = isLight
        ? "rgba(255, 255, 255, 0.96)"
        : "rgba(18, 21, 28, 0.92)";
      ctx.strokeStyle = item.color;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.roundRect(item.x, item.y, item.width, item.height, 5);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = item.color;
      ctx.font = "600 11px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      ctx.fillText(
        item.label,
        item.x + item.width / 2,
        item.y + item.height / 2 + 4
      );
    });

    // Particles
    particles.forEach((p) => {
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, 3, 3);
    });
    ctx.globalAlpha = 1;
  };

  const startGame = () => {
    resetState();
    gameStateMode = "playing";
    if (gameOverlay) gameOverlay.style.display = "none";
    if (animationId) cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(loop);
  };

  window.addEventListener("keydown", (e) => {
    if (gameStateMode !== "playing") return;
    if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
      player.dx = -player.speed;
    }
    if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
      player.dx = player.speed;
    }
  });

  window.addEventListener("keyup", (e) => {
    const k = e.key.toLowerCase();
    if (
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      k === "a" ||
      k === "d"
    ) {
      player.dx = 0;
    }
  });

  const bindMoveBtn = (btn, dir) => {
    if (!btn) return;
    const startMove = (e) => {
      e.preventDefault();
      if (gameStateMode === "playing") player.dx = dir * player.speed;
    };
    const stopMove = () => {
      player.dx = 0;
    };
    btn.addEventListener("touchstart", startMove, { passive: false });
    btn.addEventListener("touchend", stopMove);
    btn.addEventListener("mousedown", startMove);
    btn.addEventListener("mouseup", stopMove);
    btn.addEventListener("mouseleave", stopMove);
  };

  bindMoveBtn(btnLeft, -1);
  bindMoveBtn(btnRight, 1);

  if (startGameBtn) {
    startGameBtn.addEventListener("click", startGame);
  }

  window.addEventListener("bb:themechange", render);
  render();
}