/* ============================================================
   DEBAPRATIM-OS — script.js
   Everything you need to personalize lives in the CONFIG object
   below. Edit it, save, refresh the page — that's it.
   ============================================================ */

const CONFIG = {
  name: "Debapratim Mishra",
  role: "Aspiring DevOps Engineer",

  // Short bio shown in the About window. Keep it to 2-3 sentences.
  bio: "I'm learning to build and automate reliable systems — from writing my first shell scripts to wiring up CI/CD pipelines. I enjoy figuring out how software actually ships, not just how it's written. Currently exploring Linux, Docker, and Git/GitHub workflows, with cloud and Kubernetes next on the list.",

  // Links — already filled in from what you gave me. Double check them.
  github: "https://github.com/debapratimmishra",
  linkedin: "https://www.linkedin.com/in/debapratim-mishra-9700a17b/",
  email: "debapratim.mishra@gmail.com", // TODO: replace with your real email
  resumeUrl: "#", // TODO: add a link to a hosted PDF, or a local file like "assets/resume.pdf"

  // Skills shown as Activity-Monitor style bars. percent is 0-100.
  // These are placeholders — set them to an honest self-assessment.
  skills: [
    { name: "Linux & Shell Scripting", percent: 100 },
    { name: "Git & GitHub", percent: 65 },
    { name: "Docker", percent: 40 },
    { name: "CI/CD (GitHub Actions)", percent: 35 },
    { name: "Cloud Fundamentals (AWS/Azure)", percent: 30 },
    { name: "Kubernetes", percent: 20 },
  ],

  // Projects shown as Finder-style folders. Replace with your real work.
  projects: [
    {
      name: "project-one",
      desc: "Add a one-line description of what this project does and why you built it.",
      tags: ["edit-me"],
      url: "#",
    },
    {
      name: "project-two",
      desc: "Add a one-line description of what this project does and why you built it.",
      tags: ["edit-me"],
      url: "#",
    },
    {
      name: "project-three",
      desc: "Add a one-line description of what this project does and why you built it.",
      tags: ["edit-me"],
      url: "#",
    },
  ],
};

/* ============================================================
   Boot the page
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  renderSkills();
  renderProjects();
  startClock();
  typeTerminal();
  setupWindows();
  setupDock();
});

/* ---------- fill in text/links from CONFIG ---------- */
function applyConfig() {
  document.getElementById("about-name").textContent = CONFIG.name;
  document.getElementById("about-role").textContent = CONFIG.role;
  document.getElementById("about-bio").textContent = CONFIG.bio;

  const setHref = (id, href) => {
    const el = document.getElementById(id);
    if (el) el.href = href;
  };
  setHref("link-github", CONFIG.github);
  setHref("link-linkedin", CONFIG.linkedin);
  setHref("link-resume", CONFIG.resumeUrl);
  setHref("dock-github", CONFIG.github);
  setHref("dock-linkedin", CONFIG.linkedin);
  setHref("contact-linkedin-btn", CONFIG.linkedin);

  document.getElementById("contact-email").textContent = CONFIG.email;
  const mailBtn = document.getElementById("contact-mail-btn");
  mailBtn.href = `mailto:${CONFIG.email}?subject=Let's connect`;

  document.title = `${CONFIG.name} — ${CONFIG.role}`;
}

/* ---------- Activity Monitor skill bars ---------- */
function renderSkills() {
  const list = document.getElementById("skills-list");
  list.innerHTML = "";
  CONFIG.skills.forEach((skill) => {
    const row = document.createElement("div");
    row.className = "skill-row";
    row.innerHTML = `
      <div class="skill-row-top">
        <span class="skill-name">${escapeHtml(skill.name)}</span>
        <span class="skill-pct">${skill.percent}%</span>
      </div>
      <div class="skill-track">
        <div class="skill-fill" data-target="${skill.percent}"></div>
      </div>
    `;
    list.appendChild(row);
  });
  // animate fills in after the window opens
  requestAnimationFrame(() => {
    setTimeout(() => {
      document.querySelectorAll(".skill-fill").forEach((bar) => {
        bar.style.width = bar.dataset.target + "%";
      });
    }, 250);
  });
}

/* ---------- Finder project cards ---------- */
function renderProjects() {
  const grid = document.getElementById("projects-grid");
  grid.innerHTML = "";
  CONFIG.projects.forEach((p) => {
    const card = document.createElement("a");
    card.className = "project-card";
    card.href = p.url || "#";
    card.target = "_blank";
    card.rel = "noopener";
    card.innerHTML = `
      <span class="project-folder-glyph">📁</span>
      <span class="project-name">${escapeHtml(p.name)}</span>
      <span class="project-desc">${escapeHtml(p.desc)}</span>
      <span class="project-tags">
        ${(p.tags || []).map((t) => `<span class="project-tag">${escapeHtml(t)}</span>`).join("")}
      </span>
    `;
    grid.appendChild(card);
  });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* ---------- live menu-bar clock ---------- */
function startClock() {
  const clockEl = document.getElementById("menubar-clock");
  const update = () => {
    const now = new Date();
    const opts = { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" };
    clockEl.textContent = now.toLocaleString(undefined, opts);
  };
  update();
  setInterval(update, 1000 * 30);
}

/* ---------- terminal boot / typing animation ---------- */
function typeTerminal() {
  const out = document.getElementById("terminal-output");
  const cursor = document.getElementById("terminal-cursor");
  const lines = [
    { text: "guest@debapratim-os ~ % whoami", pause: 300 },
    { text: nameToSlug(CONFIG.name), pause: 500 },
    { text: "", pause: 100 },
    { text: "guest@debapratim-os ~ % neofetch --mini", pause: 300 },
    { text: `Name     : ${CONFIG.name}`, pause: 80 },
    { text: `Role     : ${CONFIG.role}`, pause: 80 },
    { text: `Status   : Learning & building, one commit at a time`, pause: 80 },
    { text: `Shell    : zsh   Editor: vim/vscode`, pause: 80 },
    { text: "", pause: 100 },
    { text: "guest@debapratim-os ~ % echo $WELCOME", pause: 300 },
    { text: "Thanks for stopping by — feel free to look around.", pause: 0 },
  ];

  let html = "";
  let lineIndex = 0;
  let charIndex = 0;

  function typeNext() {
    if (lineIndex >= lines.length) {
      cursor.style.display = "inline-block";
      return;
    }
    cursor.style.display = "none";
    const current = lines[lineIndex];
    if (charIndex < current.text.length) {
      html += current.text[charIndex];
      out.textContent = html;
      charIndex++;
      setTimeout(typeNext, 14 + Math.random() * 18);
    } else {
      html += "\n";
      out.textContent = html;
      lineIndex++;
      charIndex = 0;
      setTimeout(typeNext, current.pause);
    }
  }
  setTimeout(typeNext, 700);
}

function nameToSlug(name) {
  return name.trim().toLowerCase().replace(/\s+/g, "-");
}

/* ============================================================
   Window manager: open/close, focus (z-index), drag-to-move
   ============================================================ */
let topZ = 10;

function setupWindows() {
  document.querySelectorAll("[data-window]").forEach((win) => {
    win.addEventListener("mousedown", () => focusWindow(win));
    win.addEventListener("touchstart", () => focusWindow(win), { passive: true });

    const closeBtn = win.querySelector("[data-close]");
    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        win.classList.remove("is-open");
      });
    }

    const handle = win.querySelector("[data-drag-handle]");
    if (handle) makeDraggable(win, handle);
  });
}

function focusWindow(win) {
  topZ += 1;
  win.style.zIndex = topZ;
}

function makeDraggable(win, handle) {
  // Skip dragging on mobile, where windows are stacked full-width cards.
  if (window.matchMedia("(max-width: 680px)").matches) return;

  let startX, startY, originX, originY, dragging = false;

  handle.addEventListener("mousedown", (e) => {
    if (e.target.closest(".dot")) return; // don't drag when clicking traffic lights
    dragging = true;
    focusWindow(win);
    const rect = win.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;
    originX = rect.left;
    originY = rect.top;
    win.style.left = originX + "px";
    win.style.top = originY + "px";
    document.body.style.userSelect = "none";
  });

  window.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    win.style.left = Math.max(0, originX + dx) + "px";
    win.style.top = Math.max(30, originY + dy) + "px";
  });

  window.addEventListener("mouseup", () => {
    dragging = false;
    document.body.style.userSelect = "";
  });
}

/* ---------- dock + desktop icon open triggers ---------- */
function setupDock() {
  document.querySelectorAll("[data-open]").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      const id = trigger.getAttribute("data-open");
      const win = document.getElementById(id);
      if (!win) return;
      e.preventDefault();
      win.classList.add("is-open");
      focusWindow(win);
      if (window.matchMedia("(max-width: 680px)").matches) {
        win.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}
