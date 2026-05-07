let currentPage = 1;

// Initialize
function init() {
    createTitleTulips();
    createBackgroundHearts();
    createFinalBouquet();
    setupScrollReveal();
}

// Navigate pages
function goToPage(pageNum) {
    document.getElementById('page' + currentPage).classList.remove('active');
    document.getElementById('page' + pageNum).classList.add('active');
    currentPage = pageNum;
    updateDots();

    if (pageNum === 4) {
        setTimeout(triggerScrollReveal, 500);
    }
}

// Update progress dots
function updateDots() {
    for (let i = 1; i <= 5; i++) {
        const dot = document.getElementById('dot' + i);
        if (dot) {
            dot.classList.toggle('active', i <= currentPage);
        }
    }
}

// Create tulips for title
function createTitleTulips() {
    const field = document.getElementById('titleTulips');
    const positions = [10, 80, 150, 220, 290, 360, 430];

    positions.forEach((x, i) => {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'tulip');
        svg.setAttribute('width', '60');
        svg.setAttribute('height', '150');
        svg.setAttribute('viewBox', '0 0 60 150');
        svg.style.left = x + 'px';
        svg.style.animationDelay = (i * 0.3) + 's';

        svg.innerHTML = `
            <rect x="27" y="70" width="5" height="80" fill="#7ab87a"/>
            <ellipse cx="20" cy="120" rx="15" ry="8" fill="#8fcf8f" transform="rotate(-30 20 120)"/>
            <ellipse cx="40" cy="115" rx="15" ry="8" fill="#8fcf8f" transform="rotate(30 40 115)"/>
            <ellipse cx="30" cy="40" rx="22" ry="35" fill="#ff8fa4"/>
            <ellipse cx="20" cy="45" rx="13" ry="28" fill="#ffb3c1"/>
            <ellipse cx="40" cy="45" rx="13" ry="28" fill="#ffb3c1"/>
            <ellipse cx="30" cy="50" rx="10" ry="22" fill="#ffc9d3"/>
        `;
        field.appendChild(svg);
    });
}

// Background hearts
function createBackgroundHearts() {
    const container = document.getElementById('bgHearts');
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.className = 'bg-heart';
        heart.innerHTML = '♥';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 8 + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        container.appendChild(heart);
    }
}

// Final bouquet
function createFinalBouquet() {
    const bouquet = document.getElementById('finalBouquet');
    const data = [
        { x: 20, height: 180 },
        { x: 60, height: 220 },
        { x: 100, height: 160 },
        { x: 140, height: 200 }
    ];

    data.forEach((t, i) => {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'tulip');
        svg.setAttribute('width', '50');
        svg.setAttribute('height', t.height);
        svg.setAttribute('viewBox', `0 0 50 ${t.height}`);
        svg.style.left = t.x + 'px';
        svg.style.animationDelay = (i * 0.5) + 's';

        const petalHeight = t.height * 0.5;
        const stemHeight = t.height * 0.5;

        svg.innerHTML = `
            <rect x="22" y="${petalHeight * 0.4}" width="5" height="${stemHeight}" fill="#7ab87a"/>
            <ellipse cx="15" cy="${stemHeight * 0.6}" rx="12" ry="7" fill="#8fcf8f" transform="rotate(-30 15 ${stemHeight * 0.6})"/>
            <ellipse cx="35" cy="${stemHeight * 0.55}" rx="12" ry="7" fill="#8fcf8f" transform="rotate(30 35 ${stemHeight * 0.55})"/>
            <ellipse cx="25" cy="${petalHeight * 0.3}" rx="20" ry="${petalHeight * 0.5}" fill="#ff8fa4"/>
            <ellipse cx="17" cy="${petalHeight * 0.35}" rx="12" ry="${petalHeight * 0.4}" fill="#ffb3c1"/>
            <ellipse cx="33" cy="${petalHeight * 0.35}" rx="12" ry="${petalHeight * 0.4}" fill="#ffb3c1"/>
            <ellipse cx="25" cy="${petalHeight * 0.4}" rx="8" ry="${petalHeight * 0.3}" fill="#ffc9d3"/>
        `;
        bouquet.appendChild(svg);
    });
}

// Heart burst effect
function burstHearts(element) {
    const rect = element.getBoundingClientRect();

    for (let i = 0; i < 6; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-burst';
        heart.innerHTML = '♥';
        heart.style.position = 'fixed';
        heart.style.left = (rect.left + rect.width / 2 + (Math.random() - 0.5) * 50) + 'px';
        heart.style.top = (rect.top + (Math.random() - 0.5) * 30) + 'px';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.color = ['#ff8fa4', '#ffb3c1', '#ffc9d3'][Math.floor(Math.random() * 3)];
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 1000);
    }

    element.classList.add('wiggle');
    setTimeout(() => element.classList.remove('wiggle'), 800);
}

// Pulse heart animation
function pulseHeart() {
    const heart = document.getElementById('bigHeart');
    heart.style.transform = 'scale(1.3)';
    burstHearts(heart);

    setTimeout(() => {
        heart.style.transform = 'scale(1)';
    }, 300);
}

// Scroll reveal
function setupScrollReveal() {
    const container = document.getElementById('letterScroll');
    container.addEventListener('scroll', () => {
        const reveals = container.querySelectorAll('.reveal-text');
        reveals.forEach(el => {
            const rect = el.getBoundingClientRect();
            const scrollRect = container.getBoundingClientRect();
            if (rect.top < scrollRect.bottom) {
                el.classList.add('visible');
            }
        });
    });
}

function triggerScrollReveal() {
    const reveals = document.querySelectorAll('.reveal-text');
    reveals.forEach((el, i) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, i * 800);
    });
}

// Toggle mute/unmute
function toggleMute() {
    const music = document.getElementById('bgMusic');
    const btn = document.getElementById('muteBtn');
    if (music.muted) {
        music.muted = false;
        btn.textContent = '🔊';
    } else {
        music.muted = true;
        btn.textContent = '🔇';
    }
}

// Restart
function restartBook() {
    currentPage = 1;
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page1').classList.add('active');
    document.querySelectorAll('.reveal-text').forEach(el => el.classList.remove('visible'));
    updateDots();
}

// Start
init();