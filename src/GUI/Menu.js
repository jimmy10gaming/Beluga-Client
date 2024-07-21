import { SetupModules } from "./Modules";
import { LogoData, ModulesList } from "../ModulesList";

let isMenuOpen = false;
const isDarkMode = localStorage.getItem("isDarkMode") === "true" || false;

const COLORS = {
  BACKGROUND: '#1e1e1e',
  SIDEBAR: '#252525',
  ACCENT: '#0072ff',
  TEXT: '#ffffff',
  TEXT_SECONDARY: '#8c8c8c',
  MODULE_BACKGROUND: '#2a2a2a',
  MODULE_HOVER: '#303030',
  TOGGLE_ON: '#0072ff',
  TOGGLE_OFF: '#4d4d4d'
};

function createStyles() {
  const style = document.createElement("style");
  style.textContent = `
    body {
      margin: 0;
      padding: 0;
      font-family: 'Roboto', 'Segoe UI', Arial, sans-serif;
    }

    #SCMM {
      position: fixed;
      left: 0;
      top: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(10px);
      display: flex;
      z-index: 9999;
    }

    .sidebar {
      width: 250px;
      background-color: ${COLORS.SIDEBAR};
      padding: 20px;
      overflow-y: auto;
    }

    .main-content {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
    }

    .logo {
      width: 80px;
      height: 80px;
      margin: 0 auto 20px;
      display: block;
    }

    .client-name {
      color: ${COLORS.ACCENT};
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 30px;
    }

    .category {
      color: ${COLORS.TEXT};
      font-size: 18px;
      font-weight: bold;
      margin: 20px 0 10px;
    }

    .module {
      background-color: ${COLORS.MODULE_BACKGROUND};
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      transition: background-color 0.2s;
    }

    .module:hover {
      background-color: ${COLORS.MODULE_HOVER};
    }

    .module-icon {
      width: 32px;
      height: 32px;
      margin-right: 15px;
    }

    .module-info {
      flex: 1;
    }

    .module-name {
      color: ${COLORS.TEXT};
      font-size: 16px;
      font-weight: bold;
    }

    .module-description {
      color: ${COLORS.TEXT_SECONDARY};
      font-size: 14px;
    }

    .toggle-switch {
      width: 50px;
      height: 26px;
      background-color: ${COLORS.TOGGLE_OFF};
      border-radius: 13px;
      position: relative;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .toggle-switch.active {
      background-color: ${COLORS.TOGGLE_ON};
    }

    .toggle-switch::after {
      content: '';
      position: absolute;
      width: 22px;
      height: 22px;
      background-color: white;
      border-radius: 50%;
      top: 2px;
      left: 2px;
      transition: transform 0.2s;
    }

    .toggle-switch.active::after {
      transform: translateX(24px);
    }

    .search-bar {
      background-color: ${COLORS.MODULE_BACKGROUND};
      border: none;
      border-radius: 20px;
      color: ${COLORS.TEXT};
      font-size: 16px;
      padding: 10px 20px;
      width: 100%;
      margin-bottom: 20px;
    }

    .search-bar::placeholder {
      color: ${COLORS.TEXT_SECONDARY};
    }
  `;
  document.head.appendChild(style);
}

function createModuleElement(module) {
  const moduleEl = document.createElement('div');
  moduleEl.className = 'module';
  moduleEl.innerHTML = `
    <img class="module-icon" src="${module.imagedata}" alt="${module.name}">
    <div class="module-info">
      <div class="module-name">${module.name}</div>
      <div class="module-description">${module.description || ''}</div>
    </div>
    <div class="toggle-switch" id="toggle-${module.name}"></div>
  `;

  const toggleSwitch = moduleEl.querySelector('.toggle-switch');
  toggleSwitch.addEventListener('click', () => {
    const isEnabled = toggleSwitch.classList.toggle('active');
    updateModuleState(module.name, isEnabled);
  });

  return moduleEl;
}

function updateModuleState(moduleName, isEnabled) {
  const moduleData = JSON.parse(localStorage.getItem('SCMM-MODS')) || [];
  const moduleIndex = moduleData.findIndex(m => m.name === moduleName);

  if (moduleIndex !== -1) {
    moduleData[moduleIndex].enabled = isEnabled;
  } else {
    moduleData.push({ name: moduleName, enabled: isEnabled });
  }

  localStorage.setItem('SCMM-MODS', JSON.stringify(moduleData));
  // Call the module's Init function here if needed
  // eval(`${moduleName}.Init("${moduleName}")`);
}

function filterModules(searchTerm) {
  const modules = document.querySelectorAll('.module');
  modules.forEach(module => {
    const name = module.querySelector('.module-name').textContent.toLowerCase();
    const description = module.querySelector('.module-description').textContent.toLowerCase();
    const isVisible = name.includes(searchTerm) || description.includes(searchTerm);
    module.style.display = isVisible ? 'flex' : 'none';
  });
}

export function CreateMenu() {
  if (isMenuOpen) {
    document.getElementById('SCMM').remove();
    isMenuOpen = false;
    return;
  }

  isMenuOpen = true;
  createStyles();

  const menuContainer = document.createElement('div');
  menuContainer.id = 'SCMM';

  const sidebar = document.createElement('div');
  sidebar.className = 'sidebar';
  sidebar.innerHTML = `
    <img class="logo" src="${LogoData}" alt="Fracticle Client Logo">
    <div class="client-name">Fracticle Client</div>
    <input type="text" class="search-bar" placeholder="Search modules...">
  `;

  const mainContent = document.createElement('div');
  mainContent.className = 'main-content';

  menuContainer.appendChild(sidebar);
  menuContainer.appendChild(mainContent);
  document.body.appendChild(menuContainer);

  const searchBar = sidebar.querySelector('.search-bar');
  searchBar.addEventListener('input', (e) => filterModules(e.target.value.toLowerCase()));

  const categories = [...new Set(ModulesList.map(m => m.category))];
  categories.forEach(category => {
    const categoryEl = document.createElement('div');
    categoryEl.className = 'category';
    categoryEl.textContent = category;
    mainContent.appendChild(categoryEl);

    ModulesList.filter(m => m.category === category).forEach(module => {
      const moduleEl = createModuleElement(module);
      mainContent.appendChild(moduleEl);
    });
  });

  SetupModules();
}