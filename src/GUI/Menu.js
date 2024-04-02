const { SetupModules } = require("./Modules");
const { LogoData } = require("../ModulesList");

let isMenuOpen = false;
let isDarkMode = false;

function toggleDarkMode() {
  const Holder = document.getElementById("SCMM");
  Holder.classList.toggle("light-mode");
  Holder.classList.toggle("dark-mode");
  const switchIcon = Holder.querySelector(".switch-icon i");
  switchIcon.classList.toggle("fa-sun");
  switchIcon.classList.toggle("fa-moon");
  isDarkMode = !isDarkMode;
}

function createStyles() {
  const style = document.createElement("style");
  style.textContent = `
    body {
      margin: 0;
      padding: 0;
      font-family: 'Montserrat', sans-serif;
    }

    #SCMM {
      backdrop-filter: blur(10px);
      width: 100vw;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      background-color: rgba(0, 0, 0, 0.5);
      transition: background-color 0.3s ease;
    }

    .menu-container {
      width: 80%;
      max-width: 800px;
      height: 80%;
      max-height: 600px;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      padding: 30px;
      box-shadow: 0 0 50px 20px rgba(0, 0, 0, 0.4);
      animation: shine 3s ease-in-out infinite;
      transition: background-color 0.3s ease, box-shadow 0.3s ease;
    }

    .menu-header {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: fit-content;
      width: 100%;
      color: #fff;
      gap: 20px;
      margin-bottom: 20px;
    }

    .menu-header img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    }

    .menu-header h1 {
      font-size: 32px;
      font-weight: 700;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }

    .dark-mode-switch {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-left: auto;
    }

    .switch-container {
      position: relative;
      width: 80px;
      height: 40px;
      background-color: #fff;
      border-radius: 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .switch-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #333;
      border-radius: 20px;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .switch-circle {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;
      background-color: #333;
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      transition: transform 0.3s ease, background-color 0.3s ease;
    }

    .switch-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      font-size: 16px;
      transition: color 0.3s ease;
    }

    .switch-icon .fa-sun {
      display: block;
    }

    .switch-icon .fa-moon {
      display: none;
    }

    .light-mode {
      background-color: #f0f0f0;
    }

    .light-mode .menu-container {
      background: linear-gradient(to bottom right, #2c3e50, #34495e);
      box-shadow: 0 0 50px 20px rgba(0, 0, 0, 0.4);
    }

    .light-mode .menu-header h1 {
      color: #fff;
    }

    .dark-mode {
      background-color: #333;
    }

    .dark-mode .menu-container {
      background-color: #444;
      box-shadow: 0 0 50px 20px rgba(0, 0, 0, 0.8);
    }

    .dark-mode .menu-header h1 {
      color: #fff;
    }

    .dark-mode .switch-container {
      background-color: #fff;
    }

    .dark-mode .switch-bg {
      opacity: 1;
    }

    .dark-mode .switch-circle {
      transform: translateX(40px);
      background-color: #fff;
    }

    .dark-mode .switch-icon {
      color: #333;
    }

    .dark-mode .switch-icon .fa-sun {
      display: none;
    }

    .dark-mode .switch-icon .fa-moon {
      display: block;
    }

    @keyframes shine {
      0% {
        box-shadow: 0 0 50px 20px rgba(0, 0, 0, 0.4);
      }
      50% {
        box-shadow: 0 0 80px 30px rgba(255, 255, 255, 0.4);
      }
      100% {
        box-shadow: 0 0 50px 20px rgba(0, 0, 0, 0.4);
      }
    }
  `;
  document.head.appendChild(style);
}

export function CreateMenu() {
  if (!isMenuOpen) {
    isMenuOpen = true;

    const Holder = document.createElement("div");
    Holder.id = "SCMM";
    Holder.classList.add("light-mode");

    const Menu = document.createElement("div");
    Menu.classList.add("menu-container");
    Menu.innerHTML = `
      <div class="menu-header">
        <img src="${LogoData}" alt="Logo">
        <h1>Fracticle Client</h1>
        <div class="dark-mode-switch">
          <div class="switch-container">
            <div class="switch-bg"></div>
            <div class="switch-circle">
              <div class="switch-icon">
                <i class="fas fa-sun"></i>
                <i class="fas fa-moon"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="SCMM-MODULES" class="module-container">
        <!-- Modules will be inserted here dynamically -->
      </div>
    `;

    document.body.appendChild(Holder);
    Holder.appendChild(Menu);

    // Add some additional styles to the modules
    const moduleContainer = Holder.querySelector("#SCMM-MODULES");
    moduleContainer.style.display = "flex";
    moduleContainer.style.flexWrap = "wrap";
    moduleContainer.style.justifyContent = "center";
    moduleContainer.style.gap = "20px";

    const modules = document.querySelectorAll("#SCMM-MODULES > *");
    modules.forEach((module) => {
      module.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
      module.style.padding = "20px";
      module.style.borderRadius = "10px";
      module.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.2)";
      module.style.transition = "transform 0.3s ease-in-out";
      module.style.flex = "0 0 calc(33.33% - 20px)"; // Set the module width to 1/3 of the container
      module.addEventListener("mouseover", () => {
        module.style.transform = "scale(1.05)";
      });
      module.addEventListener("mouseout", () => {
        module.style.transform = "scale(1)";
      });
    });

    // Add event listener for the dark mode switch
    const switchContainer = Holder.querySelector('.switch-container');
    switchContainer.addEventListener('click', toggleDarkMode);

    createStyles();
    SetupModules();
  } else {
    document.getElementById("SCMM").remove();
    isMenuOpen = false;
  }
}