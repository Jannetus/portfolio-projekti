document.addEventListener("DOMContentLoaded", () => {
    
    // 1. TEEMAN VAIHTO JA MUISTI
    const themeBtn = document.getElementById("themeBtn");
    const body = document.body;

    // Tarkistetaan onko teema tallennettu selaimeen
    if (localStorage.getItem("theme") === "light") {
        body.classList.add("light-mode");
    }

    // Jos nappi löytyy sivulta (index tai tonttupeli), lisätään kuuntelija
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            body.classList.toggle("light-mode");
            const isLight = body.classList.contains("light-mode");
            localStorage.setItem("theme", isLight ? "light" : "dark");
        });
    }

    // 2. ANIMAATIOT (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

    // 3. KOODIN KOPIOINTI (Lähdekoodi-sivulle)
    document.querySelectorAll('.code-block').forEach(block => {
        if (!block.querySelector('.copy-btn')) {
            const button = document.createElement('button');
            button.innerText = "Kopioi";
            button.className = "copy-btn";
            block.appendChild(button);

            button.addEventListener('click', () => {
                const code = block.querySelector('code').innerText;
                navigator.clipboard.writeText(code);
                button.innerText = "Kopioitu! 🎅";
                setTimeout(() => button.innerText = "Kopioi", 2000);
            });
        }
    });

    // 4. LUMISADE (Vain tonttupeli-sivulla, jolla on luokka .code-page)
    if (body.classList.contains('code-page')) {
        function createSnowflake() {
            const flake = document.createElement('div');
            flake.innerHTML = "❄";
            flake.style.cssText = `
                position: fixed; 
                top: -20px; 
                color: white;
                left: ${Math.random() * 100}vw; 
                opacity: ${Math.random()};
                font-size: ${Math.random() * 10 + 10}px; 
                z-index: 9999;
                pointer-events: none; 
                transition: transform 5s linear, opacity 5s;
            `;
            body.appendChild(flake);

            setTimeout(() => {
                flake.style.transform = `translateY(110vh) rotate(${Math.random() * 360}deg)`;
                flake.style.opacity = "0";
            }, 100);

            setTimeout(() => flake.remove(), 6000);
        }
        setInterval(createSnowflake, 300);
    }
});

// Päivitetty lumisade-tyyli dynaamiselle taustalle
function createSnowflake() {
    const flake = document.createElement('div');
    flake.innerHTML = "❄";
    flake.style.cssText = `
        position: fixed; 
        top: -20px; 
        color: white;
        left: ${Math.random() * 100}vw; 
        opacity: ${Math.random() * 0.7 + 0.3}; /* Vaihteleva läpinäkyvyys */
        font-size: ${Math.random() * 15 + 5}px; /* Erisuuruisia hiutaleita */
        filter: blur(${Math.random() * 2}px); /* Osa hiutaleista on "sumeampia" (syvyysvaikutelma) */
        z-index: 9999;
        pointer-events: none; 
        transition: transform 6s linear, opacity 6s;
    `;
    body.appendChild(flake);
  
}