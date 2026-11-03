/* ==========================================================================
   BRUNO BORJES - MAIN JAVASCRIPT & MINIGAME LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('open');
        });
    });

    // 2. Scroll Progress Bar & Header Shadow
    const scrollProgress = document.getElementById('scrollProgress');
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const currentProgress = (window.scrollY / totalHeight) * 100;
        scrollProgress.style.width = `${currentProgress}%`;

        if (window.scrollY > 30) {
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // 3. Footer Year Update
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // 4. Contact Form Simulation
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            
            formFeedback.style.color = 'var(--accent)';
            formFeedback.textContent = `Mensagem enviada com sucesso! Obrigado, ${name}. Retornarei em breve.`;
            contactForm.reset();

            setTimeout(() => {
                formFeedback.textContent = '';
            }, 5000);
        });
    }

    // 5. Minigame: "Desafio do Desenvolvedor"
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const startGameBtn = document.getElementById('startGameBtn');
    const gameOverlay = document.getElementById('gameOverlay');
    const gameScoreEl = document.getElementById('gameScore');
    const gameHighScoreEl = document.getElementById('gameHighScore');
    
    const btnLeft = document.getElementById('btnLeft');
    const btnRight = document.getElementById('btnRight');

    let gameInterval = null;
    let score = 0;
    let highScore = localStorage.getItem('bb_dev_highscore') || 0;
    gameHighScoreEl.textContent = highScore;

    let isPlaying = false;

    // Player Object
    const player = {
        x: canvas.width / 2 - 20,
        y: canvas.height - 40,
        width: 40,
        height: 25,
        speed: 6,
        dx: 0
    };

    let items = [];
    let frameCount = 0;

    const itemTypes = [
        { type: 'code', symbol: '</>', color: '#10b981', points: 10 },
        { type: 'code', symbol: '{}', color: '#61dafb', points: 15 },
        { type: 'bug', symbol: 'BUG', color: '#ef4444', points: -20 }
    ];

    function resetGame() {
        score = 0;
        gameScoreEl.textContent = score;
        items = [];
        player.x = canvas.width / 2 - 20;
        frameCount = 0;
    }

    function startGame() {
        resetGame();
        isPlaying = true;
        gameOverlay.style.display = 'none';
        
        if (gameInterval) clearInterval(gameInterval);
        gameInterval = setInterval(updateGame, 1000 / 60);
    }

    function gameOver() {
        isPlaying = false;
        clearInterval(gameInterval);
        
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('bb_dev_highscore', highScore);
            gameHighScoreEl.textContent = highScore;
        }

        gameOverlay.querySelector('h3').textContent = 'Fim de Jogo!';
        gameOverlay.querySelector('p').textContent = `Sua pontuação: ${score}. Tente novamente!`;
        startGameBtn.textContent = 'Reiniciar Jogo';
        gameOverlay.style.display = 'flex';
    }

    function updateGame() {
        frameCount++;

        // Move player
        player.x += player.dx;
        if (player.x < 0) player.x = 0;
        if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;

        // Spawn items
        if (frameCount % 45 === 0) {
            const randItem = itemTypes[Math.floor(Math.random() * itemTypes.length)];
            items.push({
                x: Math.random() * (canvas.width - 30),
                y: -30,
                width: 35,
                height: 30,
                speed: 2.5 + Math.random() * 2,
                ...randItem
            });
        }

        // Update items
        for (let i = items.length - 1; i >= 0; i--) {
            items[i].y += items[i].speed;

            // Collision check
            if (
                player.x < items[i].x + items[i].width &&
                player.x + player.width > items[i].x &&
                player.y < items[i].y + items[i].height &&
                player.y + player.height > items[i].y
            ) {
                score += items[i].points;
                if (score < 0) score = 0;
                gameScoreEl.textContent = score;
                items.splice(i, 1);
                continue;
            }

            // Remove out of bounds
            if (items[i].y > canvas.height) {
                items.splice(i, 1);
            }
        }

        drawGame();
    }

    function drawGame() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Player (Developer Cursor Box)
        ctx.fillStyle = '#10b981';
        ctx.fillRect(player.x, player.y, player.width, player.height);
        ctx.fillStyle = '#0a0b0e';
        ctx.font = '11px JetBrains Mono';
        ctx.fillText('dev', player.x + 8, player.y + 17);

        // Draw Items
        items.forEach(item => {
            ctx.fillStyle = item.color;
            ctx.font = 'bold 13px JetBrains Mono';
            ctx.fillText(item.symbol, item.x, item.y + 20);
        });
    }

    // Controls
    window.addEventListener('keydown', (e) => {
        if (!isPlaying) return;
        if (e.key === 'ArrowLeft' || e.key === 'a') player.dx = -player.speed;
        if (e.key === 'ArrowRight' || e.key === 'd') player.dx = player.speed;
    });

    window.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'ArrowRight' || e.key === 'd') {
            player.dx = 0;
        }
    });

    // Mobile buttons
    if (btnLeft && btnRight) {
        btnLeft.addEventListener('touchstart', () => { if (isPlaying) player.dx = -player.speed; });
        btnLeft.addEventListener('touchend', () => { player.dx = 0; });
        btnLeft.addEventListener('mousedown', () => { if (isPlaying) player.dx = -player.speed; });
        btnLeft.addEventListener('mouseup', () => { player.dx = 0; });

        btnRight.addEventListener('touchstart', () => { if (isPlaying) player.dx = player.speed; });
        btnRight.addEventListener('touchend', () => { player.dx = 0; });
        btnRight.addEventListener('mousedown', () => { if (isPlaying) player.dx = player.speed; });
        btnRight.addEventListener('mouseup', () => { player.dx = 0; });
    }

    if (startGameBtn) {
        startGameBtn.addEventListener('click', startGame);
    }
});