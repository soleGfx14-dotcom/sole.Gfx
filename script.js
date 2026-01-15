// --- 1. PARTICLE FLOW SYSTEM (CANVAS) ---
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particlesArray;

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5; 
        this.speedX = Math.random() * 0.5 - 0.25; 
        this.speedY = Math.random() * 0.5 - 0.25; 
        this.color = 'rgba(0, 229, 255, 0.4)'; 
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    const numberOfParticles = (canvas.width * canvas.height) / 10000; 
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    connectParticles();
    requestAnimationFrame(animateParticles);
}

function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) ** 2) + 
                           ((particlesArray[a].y - particlesArray[b].y) ** 2);
            if (distance < (canvas.width/7) * (canvas.height/7)) {
                let opacityValue = 1 - (distance/15000);
                ctx.strokeStyle = 'rgba(0, 229, 255,' + opacityValue * 0.1 + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

initParticles();
animateParticles();

// --- 2. VIDEO MODAL LOGIC ---
const modal = document.getElementById("video-modal");
const modalVideo = document.getElementById("modal-video");
const modalTitle = document.getElementById("modal-title");
const closeBtn = document.querySelector(".close-btn");
const skillCards = document.querySelectorAll(".skill-card");

skillCards.forEach(card => {
    card.addEventListener("click", () => {
        const videoSrc = card.getAttribute("data-video");
        const titleText = card.querySelector("h3").innerText;

        if(videoSrc) {
            modal.classList.add("show");
            modalVideo.src = videoSrc;
            modalTitle.innerText = titleText;
            modalVideo.play();
            document.body.style.overflow = "hidden"; // Stop scrolling
        }
    });
});

function closeModal() {
    modal.classList.remove("show");
    modalVideo.pause();
    modalVideo.src = "";
    document.body.style.overflow = "auto";
}

closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", (e) => {
    if (e.target == modal) closeModal();
});

// --- 3. CURSOR & INTERACTIONS ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
let mouseX = 0, mouseY = 0, outlineX = 0, outlineY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;

    const target = e.target;
    if (target.tagName === 'A' || target.closest('.skill-card') || target.tagName === 'BUTTON') {
        document.body.classList.add('hover-active');
    } else {
        document.body.classList.remove('hover-active');
    }
});

function animateCursor() {
    let distX = mouseX - outlineX;
    let distY = mouseY - outlineY;
    outlineX += distX * 0.15;
    outlineY += distY * 0.15;
    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;
    requestAnimationFrame(animateCursor);
}
animateCursor();;