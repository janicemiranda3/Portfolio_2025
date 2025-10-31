// PAGE HIDDEN EFFECT ----->

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

//else {
//entry.target.classList.remove('show');
//}

// HORIZONTAL TAG EFFECT ---->

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));



const hrObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const hrElements = document.querySelectorAll("hr"); // Select all hr elements
hrElements.forEach((hr) => hrObserver.observe(hr)); // Observe each one

// NAVIGATION HAMBURGER MENU --------->

let menu = document.querySelector('#menu-icon');
let navmenu = document.querySelector('.nav-links');

menu.onclick = () => {
    menu.classList.toggle('ph-list'); // Menu icon
    menu.classList.toggle('ph-x'); // Close icon
    navmenu.classList.toggle('open'); // Show/hide menu
};

// SMOOTH SCROLLING ---------->

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

//  CUSTOM PAGE CURSOR ------------> 

var cursor = {
    delay: 8, // Delay factor for the trailing effect
    _x: 0,
    _y: 0,
    endX: (window.innerWidth / 2),
    endY: (window.innerHeight / 2),
    cursorVisible: true,
    cursorEnlarged: false,
    $dot: document.querySelector('.cursor-dot'),
    $outline: document.querySelector('.cursor-dot-outline'),

    init: function () {
        this.dotSize = this.$dot.offsetWidth;
        this.outlineSize = this.$outline.offsetWidth;

        this.setupEventListeners();
        this.animateDotOutline();
    },

    setupEventListeners: function () {
        var self = this;

        // Cursor hover effects for links (excluding .logo)
        document.querySelectorAll('a').forEach(function (el) {
            el.addEventListener('mouseover', function () {
                if (!el.closest('.logo')) { // Exclude .logo
                    self.cursorEnlarged = true;
                    self.toggleCursorSize();
                }
            });

            el.addEventListener('mouseout', function () {
                if (!el.closest('.logo')) { // Exclude .logo
                    self.cursorEnlarged = false;
                    self.toggleCursorSize();
                }
            });
        });

        // Mousemove event for cursor position
        document.addEventListener('mousemove', function (e) {
            self.cursorVisible = true;
            self.toggleCursorVisibility();

            // Update the position of the dot immediately
            self.endX = e.clientX;
            self.endY = e.clientY;
            self.$dot.style.top = `${self.endY}px`;
            self.$dot.style.left = `${self.endX}px`;
        });

        // Hide cursor when leaving the window
        document.addEventListener('mouseleave', function () {
            self.cursorVisible = false;
            self.toggleCursorVisibility();
        });

        // Show cursor when entering the window
        document.addEventListener('mouseenter', function () {
            self.cursorVisible = true;
            self.toggleCursorVisibility();
        });
    },

    animateDotOutline: function () {
        var self = this;

        // Smoothly interpolate the outline position towards the dot
        self._x += (self.endX - self._x) / self.delay;
        self._y += (self.endY - self._y) / self.delay;
        self.$outline.style.top = `${self._y}px`;
        self.$outline.style.left = `${self._x}px`;

        requestAnimationFrame(this.animateDotOutline.bind(self));
    },

    toggleCursorSize: function () {
        var self = this;

        if (self.cursorEnlarged) {
            self.$dot.style.transform = 'translate(-50%, -50%) scale(0)';
            self.$outline.style.transform = 'translate(-50%, -50%) scale(2.8)';
        } else {
            self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
            self.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    },

    toggleCursorVisibility: function () {
        var self = this;

        if (self.cursorVisible) {
            self.$dot.style.opacity = 1;
            self.$outline.style.opacity = 1;
        } else {
            self.$dot.style.opacity = 0;
            self.$outline.style.opacity = 0;
        }
    }
};

// Store cursor position before page reload
window.addEventListener("beforeunload", function () {
    localStorage.setItem("cursorX", cursor.endX);
    localStorage.setItem("cursorY", cursor.endY);
});

// Restore cursor position after reload
window.addEventListener("DOMContentLoaded", function () {
    const storedX = localStorage.getItem("cursorX");
    const storedY = localStorage.getItem("cursorY");

    if (storedX && storedY) {
        cursor.endX = parseFloat(storedX);
        cursor.endY = parseFloat(storedY);
        cursor.$dot.style.top = `${cursor.endY}px`;
        cursor.$dot.style.left = `${cursor.endX}px`;
    }
});

// Initialize the cursor
document.addEventListener("DOMContentLoaded", function () {
    cursor.init();
});



// INDEX NAVIGATION BAR START ANIMATION ------>

document.addEventListener("DOMContentLoaded", function () {
    if (
        (window.location.pathname.includes("index.html") || window.location.pathname === "/") &&
        !sessionStorage.getItem("navAnimated")
    ) {
        document.querySelector(".nav-bar").classList.add("animated");
        sessionStorage.setItem("navAnimated", "true");
    }
});


// NAVIGATION ACTIVE LINKS ------->

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-links li a");
    const currentPage = window.location.pathname.split("/").pop(); // Get current file name

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
});


// SMOOTH TRANSITION ON WINDOW RESIZE ------>

window.addEventListener("resize", function () {
    document.body.style.transition = "background-color 0.5s ease-in-out";
});

