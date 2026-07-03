// js/app.js
// Main application logic for awplace dog frontend

document.addEventListener("DOMContentLoaded", () => {
    console.log("awplace dog UI Initialized");
    
    const connectWalletBtn = document.getElementById("connect-wallet-btn");
    
    // Simulate wallet connection
    connectWalletBtn.addEventListener("click", () => {
        const btnText = connectWalletBtn.querySelector("span");
        
        // Simulação rápida (substituiremos pelo SIWE/Ethers.js real depois)
        btnText.textContent = "Conectando...";
        connectWalletBtn.style.opacity = "0.7";
        
        setTimeout(() => {
            btnText.textContent = "0x7F...3B92";
            connectWalletBtn.style.opacity = "1";
            connectWalletBtn.classList.remove("primary-glow");
            connectWalletBtn.style.background = "rgba(255, 255, 255, 0.1)";
            connectWalletBtn.style.borderColor = "rgba(255,255,255,0.3)";
        }, 1500);
    });
    
    // ----- Renderização da Grade de Beats -----
    const beatsGrid = document.getElementById("beats");
    
    function renderBeats(filterGenre = "all", searchQuery = "") {
        beatsGrid.innerHTML = "";
        
        window.beatsCatalog.forEach(beat => {
            // Filtros simples
            if (filterGenre !== "all" && beat.genre !== filterGenre) return;
            if (searchQuery && !beat.title.toLowerCase().includes(searchQuery.toLowerCase())) return;
            
            // Criando o Card
            const card = document.createElement("div");
            card.className = "beat-card";
            card.innerHTML = `
                <div class="beat-cover-wrapper">
                    <img src="${beat.cover}" alt="Capa ${beat.title}">
                    <div class="beat-play-overlay">
                        <button class="icon-btn play-beat-btn" data-id="${beat.id}">
                            <i data-lucide="play"></i>
                        </button>
                    </div>
                </div>
                <div class="beat-info">
                    <div>
                        <h3>${beat.title}</h3>
                        <p>${beat.producer}</p>
                        <div class="beat-meta">
                            <span>${beat.bpm} BPM</span>
                            <span>${beat.key}</span>
                        </div>
                    </div>
                    <div class="beat-price">
                        ${beat.priceEth} ETH
                    </div>
                </div>
                <button class="glass-btn primary-glow checkout-btn" data-id="${beat.id}">
                    <i data-lucide="shopping-cart"></i>
                    <span>Comprar NFT</span>
                </button>
            `;
            beatsGrid.appendChild(card);
        });
        
        lucide.createIcons();
        attachPlayListeners();
    }
    
    renderBeats();

    // ----- Lógica do Áudio e Player Persistente -----
    const audioPlayerUI = document.getElementById("audio-player");
    const mainPlayPauseBtn = document.getElementById("main-play-pause");
    const playIcon = document.getElementById("play-icon");
    const playerCover = document.getElementById("player-cover");
    const playerTitle = document.getElementById("player-title");
    const playerProducer = document.getElementById("player-producer");
    const progressBar = document.getElementById("progress-bar");
    const currentTimeEl = document.getElementById("current-time");
    const totalTimeEl = document.getElementById("total-time");
    
    let currentAudio = null;
    let currentBeatId = null;

    function attachPlayListeners() {
        document.querySelectorAll(".play-beat-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const beatId = e.currentTarget.getAttribute("data-id");
                playBeat(beatId);
            });
        });
    }

    function playBeat(beatId) {
        if (currentBeatId === beatId && currentAudio) {
            // Alternar Play/Pause se for a mesma faixa
            togglePlay();
            return;
        }

        const beat = window.beatsCatalog.find(b => b.id === beatId);
        if (!beat) return;

        // Reset e Setup do novo Audio
        if (currentAudio) {
            currentAudio.pause();
        }
        
        currentAudio = new Audio(beat.audioDemo);
        currentBeatId = beat.id;
        
        // Atualizar Interface
        audioPlayerUI.style.display = "flex";
        playerCover.src = beat.cover;
        playerTitle.textContent = beat.title;
        playerProducer.textContent = beat.producer;
        
        currentAudio.play();
        updatePlayIcon(true);
        startVisualizer();

        currentAudio.addEventListener("timeupdate", () => {
            const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
            progressBar.style.width = progress + "%";
            
            currentTimeEl.textContent = formatTime(currentAudio.currentTime);
            if (currentAudio.duration) {
                totalTimeEl.textContent = formatTime(currentAudio.duration);
            }
        });

        currentAudio.addEventListener("ended", () => {
            updatePlayIcon(false);
            progressBar.style.width = "0%";
            currentTimeEl.textContent = "0:00";
        });
    }

    function togglePlay() {
        if (!currentAudio) return;
        if (currentAudio.paused) {
            currentAudio.play();
            updatePlayIcon(true);
        } else {
            currentAudio.pause();
            updatePlayIcon(false);
        }
    }

    mainPlayPauseBtn.addEventListener("click", togglePlay);

    function updatePlayIcon(isPlaying) {
        if (isPlaying) {
            playIcon.setAttribute("data-lucide", "pause");
            mainPlayPauseBtn.innerHTML = '<i data-lucide="pause"></i>';
        } else {
            playIcon.setAttribute("data-lucide", "play");
            mainPlayPauseBtn.innerHTML = '<i data-lucide="play"></i>';
        }
        lucide.createIcons();
    }

    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Falso Visualizador de Ondas para o MVP (Efeito visual)
    const canvas = document.getElementById("audio-visualizer");
    const ctx = canvas.getContext("2d");
    let animationId;

    function startVisualizer() {
        cancelAnimationFrame(animationId);
        const draw = () => {
            if (!currentAudio || currentAudio.paused) {
                animationId = requestAnimationFrame(draw);
                return;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const bars = 20;
            const barWidth = canvas.width / bars;
            for (let i = 0; i < bars; i++) {
                const height = Math.random() * canvas.height;
                ctx.fillStyle = "rgba(99, 102, 241, 0.8)"; // Indigo glow
                ctx.fillRect(i * barWidth, canvas.height - height, barWidth - 2, height);
            }
            animationId = requestAnimationFrame(draw);
        };
        draw();
    }

    // Filtragem Fake para botões
    document.querySelectorAll(".filter-tag").forEach(tag => {
        tag.addEventListener("click", (e) => {
            document.querySelectorAll(".filter-tag").forEach(t => t.classList.remove("active"));
            e.currentTarget.classList.add("active");
            const genre = e.currentTarget.getAttribute("data-genre");
            renderBeats(genre, document.getElementById("search-input").value);
        });
    });

    document.getElementById("search-input").addEventListener("input", (e) => {
        const activeGenre = document.querySelector(".filter-tag.active").getAttribute("data-genre");
        renderBeats(activeGenre, e.target.value);
    });

});
