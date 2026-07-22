class RioArribaPlayer {

    constructor(config) {

        this.config = config;

        this.hero = document.querySelector(config.heroSelector);

        this.video = null;

        this.overlay = null;

        this.soundButton = null;

        this.observer = null;

    }

    init() {

        if (!this.hero) {

            console.error("Hero no encontrado.");

            return;

        }

        this.createVideo();

        this.createOverlay();

        this.createSoundButton();

        this.setupScrollObserver();

    }

    createVideo() {

        this.video = document.createElement("video");

        this.video.id = "rio-arriba-video";

        this.video.src = this.config.video;

        this.video.autoplay = this.config.autoplay;

        this.video.loop = this.config.loop;

        this.video.muted = this.config.muted;

        this.video.preload = "metadata";

        this.video.playsInline = true;

        this.video.setAttribute("playsinline", "");

        this.video.setAttribute("webkit-playsinline", "");

        this.hero.prepend(this.video);

        this.video.play().catch(() => {});

    }

    createOverlay() {

        this.overlay = document.createElement("div");

        this.overlay.id = "rio-arriba-overlay";

        this.hero.appendChild(this.overlay);

    }

    createSoundButton() {

        this.soundButton = document.createElement("button");

        this.soundButton.id = "rio-arriba-sound";

        this.soundButton.innerHTML = "Activar sonido";

        this.hero.appendChild(this.soundButton);

        this.soundButton.addEventListener("click", () => {

            if (this.video.muted) {

                this.fadeVolume(1);

                this.video.muted = false;

                this.soundButton.innerHTML = "Silenciar";

            } else {

                this.fadeMute();

            }

        });

    }

    fadeVolume(targetVolume) {

        this.video.volume = 0;

        let volume = 0;

        const fade = setInterval(() => {

            volume += 0.05;

            if (volume >= targetVolume) {

                volume = targetVolume;

                clearInterval(fade);

            }

            this.video.volume = volume;

        }, 50);

    }

    fadeMute() {

        let volume = this.video.volume;

        const fade = setInterval(() => {

            volume -= 0.05;

            if (volume <= 0) {

                clearInterval(fade);

                this.video.volume = 1;

                this.video.muted = true;

                this.soundButton.innerHTML = "Activar sonido";

                return;

            }

            this.video.volume = volume;

        }, 50);

    }

    setupScrollObserver() {

        this.observer = new IntersectionObserver(

            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        this.video.play().catch(() => {});

                    } else {

                        this.video.pause();

                    }

                });

            },

            {

                threshold: this.config.pauseThreshold

            }

        );

        this.observer.observe(this.hero);

    }

}

const player = new RioArribaPlayer(window.RioArribaConfig);

player.init();