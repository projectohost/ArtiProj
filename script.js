document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. КНОПКА "ACCESS" (ВХІД В СИСТЕМУ) ---
    const authBtn = document.querySelector(".auth-btn");
    
    const modal = document.createElement("div");
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(5, 5, 8, 0.95); display: none; justify-content: center;
        align-items: center; z-index: 1000; backdrop-filter: blur(10px);
    `;
    
    modal.innerHTML = `
        <div style="background: #09090e; border: 1px solid #00f0ff; padding: 40px; max-width: 400px; width: 90%; text-align: center; clip-path: polygon(0 0, 90% 0, 100% 10%, 100% 100%, 0 100%); box-shadow: 0 0 30px rgba(0, 240, 255, 0.2);">
            <h3 style="font-family: 'Orbitron', sans-serif; color: #fff; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 2px;">// AUTH_PROTOCOL</h3>
            <input type="text" placeholder="ENTER ENCRYPTION KEY / LOGIN" style="width: 100%; padding: 12px; background: #020204; border: 1px solid rgba(255,255,255,0.1); color: #fff; font-family: monospace; margin-bottom: 15px; outline: none;">
            <button id="submit-auth" style="width: 100%; padding: 12px; background: transparent; border: 1px solid #ffe600; color: #fff; font-family: 'Orbitron', sans-serif; cursor: pointer; text-transform: uppercase; font-weight: bold; transition: 0.3s;">INITIALIZE ACCESS</button>
            <p id="close-modal" style="color: #64748b; font-family: 'Orbitron', sans-serif; font-size: 12px; margin-top: 15px; cursor: pointer; text-transform: uppercase;">[ ABORT_OPERATION ]</p>
        </div>
    `;
    document.body.appendChild(modal);

    if (authBtn) {
        authBtn.addEventListener("click", () => {
            modal.style.display = "flex";
        });
    }

    modal.querySelector("#close-modal").addEventListener("click", () => {
        modal.style.display = "none";
    });

    modal.querySelector("#submit-auth").addEventListener("click", () => {
        alert("ACCESS GRANTED // СИНХРОНІЗАЦІЮ УСПІШНО ВИКОНАНО");
        modal.style.display = "none";
    });

    // --- 2. КНОПКИ В ТАРИФАХ (ОБРАТИ / АКТИВУВАТИ) ---
    const offerButtons = document.querySelectorAll("#offers .action-btn");
    offerButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const card = btn.closest(".offer-card");
            const packageName = card.querySelector(".package-type").innerText;
            alert(`ПАКЕТ [ ${packageName} ] ІНІЦІЙОВАНО.\nОчікування транзакції по мережі...`);
        });
    });

    // --- 3. КНОПКИ В ІГРАХ (ЗАПУСТИТИ) ---
    const gameButtons = document.querySelectorAll(".services-grid .action-btn");
    gameButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const gameTitle = btn.parentElement.querySelector("h3").innerText;
            
            btn.innerText = "LAUNCHING...";
            btn.style.borderColor = "#ffe600";
            btn.style.color = "#ffe600";
            
            setTimeout(() => {
                alert(`ЗАПУСК МОДУЛЯ: ${gameTitle}\nСистема стабільна. Приємної гри!`);
                btn.innerText = "Запустити";
                btn.style.borderColor = "";
                btn.style.color = "";
            }, 1000);
        });
    });

    // --- 4. МОБІЛЬНА НАВІГАЦІЯ (БУРГЕР) ---
    const header = document.querySelector("header");
    const burgerBtn = document.createElement("div");
    burgerBtn.className = "burger-menu";
    burgerBtn.innerHTML = `<span></span><span></span><span></span>`;
    header.appendChild(burgerBtn);

    const nav = document.querySelector("nav");

    burgerBtn.addEventListener("click", () => {
        burgerBtn.classList.toggle("burger-active");
        nav.classList.toggle("nav-active");
    });
});