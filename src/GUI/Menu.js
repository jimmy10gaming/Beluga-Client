const { SetupModules } = require("./Modules");
const { LogoData } = require("../ModulesList");

let isMenuOpen = false;

function createStarsContainer() {
  const starsContainer = document.createElement('div');
  starsContainer.classList.add('stars');

  for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    star.style.setProperty('--star-tail-length', `${Math.random() * 650 + 100}em`);
    star.style.setProperty('--top-offset', `${Math.random() * 10000}vh`);
    star.style.setProperty('--fall-duration', `${Math.random() * 6 + 6}s`);
    star.style.setProperty('--fall-delay', `${Math.random() * 10}s`);

    starsContainer.appendChild(star);
  }

  return starsContainer;
}

function createMenuBackground() {
  function CreateMenu() {
    if (!isMenuOpen) {
      isMenuOpen = true;

      const Holder = document.createElement("div");
      Holder.style =
        "backdrop-filter: blur(2px); width: fit-content; height: fit-content; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);";
      Holder.id = "SCMM";

      const starsContainer = createStarsContainer();
      Holder.appendChild(starsContainer);

      const Menu = document.createElement("div");
      Menu.style = `
        width: 65vw;
        height: 70vh;
        background: rgba(0, 0, 0, 0.75);
        border-radius: 2.5vh;
        display: flex;
        flex-direction: column;
        padding: 2vh;
      `;
      Menu.innerHTML = `
        <div style="
          display: flex;
          flex-direction: row;
          align-items: center;
          height: fit-content;
          width: 100%;
          color: #fff;
          gap: 1.5vw;
          font-family: 'Minecraftia', sans-serif;"
          margin-bottom: 1vh;
        >
          <img style="
            width:  20vh; 
            height: 20vh;" 
          src="${LogoData}">
          <h1 style="
            font-size: 4vh;
          ">Fracticle Client</h1>
        </div>
        <div style="
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          flex-direction: row;
          align-items: center;
          height: fit-content;
          width: 100%;
          color: #fff;
          gap: 1.5vw;
          font-family: 'Minecraftia', sans-serif;" 
        id="SCMM-MODULES"></div>
      `;
      Holder.appendChild(Menu);

      document.body.appendChild(Holder);

      SetupModules();
    } else {
      document.getElementById("SCMM").remove();
      isMenuOpen = false;
    }
  }

  return CreateMenu;
}

const CreateMenu = createMenuBackground();
CreateMenu();

// CSS
const styleElement = document.createElement('style');
styleElement.textContent = `
  @mixin sp-layout {
    @media screen and (max-width: 750px) {
      @content;
    }
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: radial-gradient(ellipse at bottom, #0d1d31 0%, #0c0d13 100%);
    overflow: hidden;
  }

  .stars {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 120%;
    transform: rotate(-45deg);
  }

  .star {
    --star-color: var(--primary-color);
    --star-tail-length: 6em;
    --star-tail-height: 2px;
    --star-width: calc(var(--star-tail-length) / 6);
    --fall-duration: 9s;
    --tail-fade-duration: var(--fall-duration);

    position: absolute;
    top: var(--top-offset);
    left: 0;
    width: var(--star-tail-length);
    height: var(--star-tail-height);
    color: var(--star-color);
    background: linear-gradient(45deg, currentColor, transparent);
    border-radius: 50%;
    filter: drop-shadow(0 0 6px currentColor);
    transform: translate3d(104em, 0, 0);
    animation: fall var(--fall-duration) var(--fall-delay) linear infinite, tail-fade var(--tail-fade-duration) var(--fall-delay) ease-out infinite;

    @include sp-layout {
      // For mobile performance, tail-fade animation will be removed QAQ
      animation: fall var(--fall-duration) var(--fall-delay) linear infinite;
    }

    &::before,
    &::after {
      position: absolute;
      content: '';
      top: 0;
      left: calc(var(--star-width) / -2);
      width: var(--star-width);
      height: 100%;
      background: linear-gradient(45deg, transparent, currentColor, transparent);
      border-radius: inherit;
      animation: blink 2s linear infinite;
    }

    &::before {
      transform: rotate(45deg);
    }

    &::after {
      transform: rotate(-45deg);
    }
  }

  @keyframes fall {
    to {
      transform: translate3d(-30em, 0, 0);
    }
  }

  @keyframes tail-fade {
    0%, 50% {
      width: var(--star-tail-length);
      opacity: 1;
    }

    70%, 80% {
      width: 0;
      opacity: 0.4;
    }

    100% {
      width: 0;
      opacity: 0;
    }
  }

  @keyframes blink {
    50% {
      opacity: 0.6;
    }
  }
`;
document.head.appendChild(styleElement);