const CONFIG = {
  name: "Shivendra",
  role: "Final-Year B.Tech CSE | DevOps & Cloud Engineering",
  bio: "Building automation-first solutions with Docker, Kubernetes, and Python. Passionate about CI/CD pipelines, infrastructure-as-code, and agentic AI systems. KIIT University, Bhubaneswar.",
  github: "https://github.com/Shiv-Github21",
  linkedin: "https://www.linkedin.com/in/shivendra-profile/",
  email: "dshivu003@gmail.com",
  resumeUrl: "https://drive.google.com/file/d/1nwwDYD5EZ7q7bn0ED60rK3vtC3njx6JV/view?usp=sharing",
  skills: [
    { name: "Docker", percent: 85 },
    { name: "Kubernetes", percent: 75 },
    { name: "Python", percent: 80 },
    { name: "GitHub Actions", percent: 80 },
    { name: "AWS (Cloud Foundations + Architecting)", percent: 75 },
    { name: "Spring Boot", percent: 70 },
    { name: "LLM Integration", percent: 70 },
    { name: "PostgreSQL / Databases", percent: 70 },
    { name: "Linux / Shell Scripting", percent: 75 },
    { name: "Apache Kafka", percent: 65 },
  ],
  projects: [
    {
      name: "Agentic AI DevOps Automation",
      desc: "Python-powered DevOps system using LLM agents to automate infrastructure tasks. Orchestrates Docker containers and Kubernetes deployments.",
      tags: ["Python", "Docker", "Kubernetes", "LLM Agents"],
      url: "https://github.com/Shiv-Github21/agentic-devops"
    },
    {
      name: "Kafka Payment Pipeline (JPMorgan Chase Forage)",
      desc: "Real-time transaction processing pipeline. Spring Boot consumer, Kafka topic streaming, REST API endpoints.",
      tags: ["Kafka", "Spring Boot", "REST API", "Java"],
      url: "https://github.com/Shiv-Github21/kafka-payment-pipeline"
    },
    {
      name: "AI Content Generation & Translation Platform",
      desc: "Multi-component platform for video generation, Sanskrit education, and real-time translation using NLP and generative AI.",
      tags: ["NLP", "Generative AI", "Python", "FastAPI"],
      url: "https://github.com/Shiv-Github21/content-translation-ai"
    },
  ],
};

// ============================================================
// INITIALIZATION
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  initTerminal();
  populateAbout();
  populateSkills();
  populateProjects();
  populateContact();
  setupWindowDragging();
  setupDockNavigation();
  updateClock();
  setInterval(updateClock, 1000);
});

// ============================================================
// TERMINAL (boot sequence + intro)
// ============================================================

function initTerminal() {
  const output = document.getElementById("terminal-output");
  const sequence = [
    "debapratim-os v1.0.0",
    "Loading kernel…",
    "Initializing hardware…",
    "$ whoami",
    CONFIG.name,
    "$ echo $ROLE",
    CONFIG.role,
    "$ cat about.txt",
    CONFIG.bio,
    "",
    "$ pwd",
    "/home/" + CONFIG.name.toLowerCase(),
    "$ ls -la",
    "Terminal loaded. Select a window to continue.",
  ];

  let index = 0;
  const interval = setInterval(() => {
    if (index < sequence.length) {
      output.textContent += (index === 0 ? "" : "\n") + sequence[index];
      index++;
    } else {
      clearInterval(interval);
    }
  }, 80);
}

// ============================================================
// ABOUT WINDOW
// ============================================================

function populateAbout() {
  document.getElementById("about-name").textContent = CONFIG.name;
  document.getElementById("about-role").textContent = CONFIG.role;
  document.getElementById("about-bio").textContent = CONFIG.bio;
  document.getElementById("link-github").href = CONFIG.github;
  document.getElementById("link-linkedin").href = CONFIG.linkedin;
  document.getElementById("link-resume").href = CONFIG.resumeUrl;
}

// ============================================================
// SKILLS WINDOW
// ============================================================

function populateSkills() {
  const skillsList = document.getElementById("skills-list");
  skillsList.innerHTML = "";

  CONFIG.skills.forEach((skill) => {
    const row = document.createElement("div");
    row.className = "skill-row";

    row.innerHTML = `
      <div class="skill-row-top">
        <span class="skill-name">${skill.name}</span>
        <span class="skill-pct">${skill.percent}%</span>
      </div>
      <div class="skill-track">
        <div class="skill-fill" style="width: 0%;"></div>
      </div>
    `;

    skillsList.appendChild(row);

    // Animate the fill after a brief delay
    setTimeout(() => {
      const fill = row.querySelector(".skill-fill");
      fill.style.width = skill.percent + "%";
    }, 100);
  });
}

// ============================================================
// PROJECTS WINDOW
// ============================================================

function populateProjects() {
  const grid = document.getElementById("projects-grid");
  grid.innerHTML = "";

  CONFIG.projects.forEach((project) => {
    const card = document.createElement("a");
    card.className = "project-card";
    card.href = project.url;
    card.target = "_blank";
    card.rel = "noopener";

    const tags = project.tags
      .map((tag) => `<span class="project-tag">${tag}</span>`)
      .join("");

    card.innerHTML = `
      <div class="project-folder-glyph">📁</div>
      <div class="project-name">${project.name}</div>
      <div class="project-desc">${project.desc}</div>
      <div class="project-tags">${tags}</div>
    `;

    grid.appendChild(card);
  });
}

// ============================================================
// CONTACT WINDOW
// ============================================================

function populateContact() {
  document.getElementById("contact-email").textContent = CONFIG.email;
  document.getElementById("contact-mail-btn").href = `mailto:${CONFIG.email}`;
  document.getElementById("contact-linkedin-btn").href = CONFIG.linkedin;
}

// ============================================================
// WINDOW DRAGGING
// ============================================================

function setupWindowDragging() {
  const windows = document.querySelectorAll("[data-window]");

  windows.forEach((win) => {
    const titlebar = win.querySelector("[data-drag-handle]");
    if (!titlebar) return;

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    titlebar.addEventListener("mousedown", (e) => {
      if (e.target.closest("button")) return; // Don't drag when clicking buttons
      isDragging = true;
      offsetX = e.clientX - win.offsetLeft;
      offsetY = e.clientY - win.offsetTop;
      win.style.zIndex = 999;
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      win.style.left = e.clientX - offsetX + "px";
      win.style.top = e.clientY - offsetY + "px";
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
    });
  });
}

// ============================================================
// DOCK & NAVIGATION
// ============================================================

function setupDockNavigation() {
  // Desktop icons
  document.querySelectorAll(".desktop-icon").forEach((btn) => {
    btn.addEventListener("click", () => {
      const windowId = btn.dataset.open;
      openWindow(windowId);
    });
  });

  // Dock items
  document.querySelectorAll(".dock-item[data-open]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const windowId = btn.dataset.open;
      openWindow(windowId);
    });
  });

  // External links
  document.getElementById("dock-github").href = CONFIG.github;
  document.getElementById("dock-linkedin").href = CONFIG.linkedin;
}

function openWindow(windowId) {
  const win = document.getElementById(windowId);
  if (!win) return;

  // Close all others (optional — remove if you want multiple windows open)
  // document.querySelectorAll(".window.is-open").forEach(w => w.classList.remove("is-open"));

  // Open this one
  win.classList.add("is-open");
  win.style.zIndex = 999;
  win.focus();
}

// Close buttons
document.querySelectorAll("[data-close]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const windowId = btn.dataset.close;
    const win = document.getElementById(windowId);
    if (win) win.classList.remove("is-open");
  });
});

// ============================================================
// MENU BAR CLOCK
// ============================================================

function updateClock() {
  const clock = document.getElementById("menubar-clock");
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  clock.textContent = time;
}

// ============================================================
// BOOT SCREEN FADE OUT
// ============================================================

window.addEventListener("load", () => {
  const bootScreen = document.getElementById("boot-screen");
  if (bootScreen) {
    setTimeout(() => {
      bootScreen.style.display = "none";
    }, 1500);
  }
});
