// HIDDEN / REVEAL EFFECTS --->


function initHiddenEffects() {
  const hiddenElements = document.querySelectorAll(".hidden");
  if (!hiddenElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });

  hiddenElements.forEach((el) => observer.observe(el));
}

function initHrEffects() {
  const hrElements = document.querySelectorAll("hr");
  if (!hrElements.length) return;

  const hrObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });

  hrElements.forEach((hr) => hrObserver.observe(hr));
}


// NAVIGATION / HAMBURGER MENU --->


function initHamburgerMenu() {
  const menuIcon = document.getElementById("menu-icon");
  const navMenu = document.querySelector(".nav-links");

  if (!menuIcon || !navMenu) return;

  menuIcon.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    menuIcon.classList.toggle("active");

    if (menuIcon.classList.contains("active")) {
      menuIcon.classList.remove("ph-equals");
      menuIcon.classList.add("ph-x");
    } else {
      menuIcon.classList.remove("ph-x");
      menuIcon.classList.add("ph-equals");
    }
  });
}

function initActiveNavLinks() {
  const navLinks = document.querySelectorAll(".nav-links li a");
  if (!navLinks.length) return;

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");

    if (
      href === currentPage ||
      (currentPage === "index.html" && (href === "/" || href === "index.html"))
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

function initNavBarAnimation() {
  const navBar = document.querySelector(".nav-bar");
  if (!navBar) return;

  const isHomePage =
    window.location.pathname.includes("index.html") ||
    window.location.pathname === "/" ||
    window.location.pathname.endsWith("/");

  if (isHomePage && !sessionStorage.getItem("navAnimated")) {
    navBar.classList.add("animated");
    sessionStorage.setItem("navAnimated", "true");
  }
}


// SMOOTH SCROLL --->


function initSmoothScroll() {
  const anchors = document.querySelectorAll('a[href^="#"]');
  if (!anchors.length) return;

  anchors.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
}


// CUSTOM CURSOR --->


const cursor = {
  delay: 8,
  _x: 0,
  _y: 0,
  endX: window.innerWidth / 2,
  endY: window.innerHeight / 2,
  cursorVisible: true,
  cursorEnlarged: false,
  $dot: null,
  $outline: null,

  init() {
    this.$dot = document.querySelector(".cursor-dot");
    this.$outline = document.querySelector(".cursor-dot-outline");

    if (!this.$dot || !this.$outline) return;

    this.dotSize = this.$dot.offsetWidth;
    this.outlineSize = this.$outline.offsetWidth;

    this.setupEventListeners();
    this.animateDotOutline();
  },

  setupEventListeners() {
    const self = this;

    document.querySelectorAll("a, .gallery-item").forEach((el) => {
      el.addEventListener("mouseover", () => {
        if (!el.closest(".logo")) {
          self.cursorEnlarged = true;
          self.toggleCursorSize();
        }
      });

      el.addEventListener("mouseout", () => {
        if (!el.closest(".logo")) {
          self.cursorEnlarged = false;
          self.toggleCursorSize();
        }
      });
    });

    document.addEventListener("mousemove", (e) => {
      self.cursorVisible = true;
      self.toggleCursorVisibility();

      self.endX = e.clientX;
      self.endY = e.clientY;

      if (self.$dot) {
        self.$dot.style.top = `${self.endY}px`;
        self.$dot.style.left = `${self.endX}px`;
      }
    });

    document.addEventListener("mouseleave", () => {
      self.cursorVisible = false;
      self.toggleCursorVisibility();
    });

    document.addEventListener("mouseenter", () => {
      self.cursorVisible = true;
      self.toggleCursorVisibility();
    });
  },

  animateDotOutline() {
    if (!this.$outline) return;

    this._x += (this.endX - this._x) / this.delay;
    this._y += (this.endY - this._y) / this.delay;

    this.$outline.style.top = `${this._y}px`;
    this.$outline.style.left = `${this._x}px`;

    requestAnimationFrame(() => this.animateDotOutline());
  },

  toggleCursorSize() {
    if (!this.$dot || !this.$outline) return;

    if (this.cursorEnlarged) {
      this.$dot.style.transform = "translate(-50%, -50%) scale(0)";
      this.$outline.style.transform = "translate(-50%, -50%) scale(2.8)";
    } else {
      this.$dot.style.transform = "translate(-50%, -50%) scale(1)";
      this.$outline.style.transform = "translate(-50%, -50%) scale(1)";
    }
  },

  toggleCursorVisibility() {
    if (!this.$dot || !this.$outline) return;

    if (this.cursorVisible) {
      this.$dot.style.opacity = 1;
      this.$outline.style.opacity = 1;
    } else {
      this.$dot.style.opacity = 0;
      this.$outline.style.opacity = 0;
    }
  }
};

function initCustomCursor() {
  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  const dot = document.querySelector(".cursor-dot");
  const outline = document.querySelector(".cursor-dot-outline");

  if (isTouchDevice) {
    if (dot) dot.style.display = "none";
    if (outline) outline.style.display = "none";
    return;
  }

  cursor.init();

  const storedX = localStorage.getItem("cursorX");
  const storedY = localStorage.getItem("cursorY");

  if (storedX && storedY && cursor.$dot) {
    cursor.endX = parseFloat(storedX);
    cursor.endY = parseFloat(storedY);
    cursor.$dot.style.top = `${cursor.endY}px`;
    cursor.$dot.style.left = `${cursor.endX}px`;
  }
}

function saveCursorPositionBeforeUnload() {
  window.addEventListener("beforeunload", () => {
    localStorage.setItem("cursorX", cursor.endX);
    localStorage.setItem("cursorY", cursor.endY);
  });
}


// WINDOW RESIZE --->


function initResizeEffect() {
  window.addEventListener("resize", () => {
    document.body.style.transition = "background-color 0.5s ease-in-out";
  });
}


// TEXT SCRAMBLE --->


class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);

    const promise = new Promise((resolve) => {
      this.resolve = resolve;
    });

    this.queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 30);
      const end = start + Math.floor(Math.random() * 35);
      this.queue.push({ from, to, start, end });
    }

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = "";
    let complete = 0;

    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];

      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.15) {
          char = this.randomChar();
          this.queue[i].char = char;
        }

        output += `<span class="scramble-dud">${char}</span>`;
      } else {
        output += from;
      }
    }

    this.el.innerHTML = output;

    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

function initTextScramble() {
  const section = document.querySelector(".cta-scramble-section");
  const line1 = document.getElementById("scramble-line-1");
  const line1b = document.getElementById("scramble-line-1b");
  const line2 = document.getElementById("scramble-line-2");
  const line2b = document.getElementById("scramble-line-2b");

  if (!section || !line1 || !line1b || !line2 || !line2b) return;

  const fx1 = new TextScramble(line1);
  const fx1b = new TextScramble(line1b);
  const fx2 = new TextScramble(line2);
  const fx2b = new TextScramble(line2b);

  let hasAnimated = false;

  const scrambleObserver = new IntersectionObserver(async (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;

        await fx1.setText("Thanks for checking out");
        await fx1b.setText("my corner of the Internet! 💌");

        setTimeout(async () => {
          await fx2.setText("If you want to contact me, feel free");
          await fx2b.setText("to reach out through any of the links below.");
        }, 400);
      }
    }
  }, { threshold: 0.4 });

  scrambleObserver.observe(section);
}


// INIT EVERYTHING ======>


document.addEventListener("DOMContentLoaded", () => {
  initHiddenEffects();
  initHrEffects();
  initHamburgerMenu();
  initActiveNavLinks();
  initNavBarAnimation();
  initSmoothScroll();
  initCustomCursor();
  initResizeEffect();
  initTextScramble();
  saveCursorPositionBeforeUnload();
});


// GSAP ======>


gsap.registerPlugin(MotionPathPlugin);

const endSection = document.querySelector(".portfolio-end-section");

let planePlayed = false;

const planeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !planePlayed) {
        planePlayed = true;

        gsap.to(".plane", {
          opacity: 1,
          duration: 0.2
        });

        gsap.to(".plane", {
          motionPath: {
            path: ".flight-path",
            align: ".flight-path",
            alignOrigin: [0.8, 0.2],
            autoRotate: true,
            start: 0,
            end: 1
          },
          duration: 6,
          ease: "power4.out"
        });

        gsap.from(".portfolio-end-section p", {
          opacity: 0,
          y: 50,
          delay: 1.2,
          duration: 0.8,
          ease: "power4.out"
        });

        planeObserver.unobserve(endSection);
      }
    });
  },
  {
    threshold: 0.4
  }
);

planeObserver.observe(endSection);