const { SetupModules } = require("./Modules");
const { LogoData } = require("../ModulesList");

let isMenuOpen = false;

export function CreateMenu() {
  if (!isMenuOpen) {
    isMenuOpen = true;

    const Holder = document.createElement("div");
    Holder.style =
      "backdrop-filter: blur(2px);width: fit-content;height: fit-content;position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);";
    Holder.id = "SCMM";
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
    document.body.appendChild(Holder);
    Holder.appendChild(Menu);

    SetupModules();

    // Add the star background effect
    let start = new Date().getTime();

    const originPosition = { x: 0, y: 0 };

    const container = document.createElement("div");
    container.id = "magic-mouse-container";
    document.body.appendChild(container);

    const last = {
      starTimestamp: start,
      starPosition: originPosition,
      mousePosition: originPosition
    };

    const config = {
      starAnimationDuration: 1500,
      minimumTimeBetweenStars: 250,
      minimumDistanceBetweenStars: 75,
      glowDuration: 75,
      maximumGlowPointSpacing: 10,
      colors: ["245 245 245", "59 130 246"],
      sizes: ["1.4rem", "1rem", "0.6rem"],
      animations: ["fall-1", "fall-2", "fall-3"]
    };

    let count = 0;
      
    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
          selectRandom = items => items[rand(0, items.length - 1)];

    const withUnit = (value, unit) => `${value}${unit}`,
          px = value => withUnit(value, "px"),
          ms = value => withUnit(value, "ms");

    const calcDistance = (a, b) => {
      const diffX = b.x - a.x,
            diffY = b.y - a.y;
      
      return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
    };

    const calcElapsedTime = (start, end) => end - start;

    const appendElement = element => container.appendChild(element),
          removeElement = (element, delay) => setTimeout(() => container.removeChild(element), delay);

    const createStar = position => {
      const star = document.createElement("span"),
            color = selectRandom(config.colors);
      
      star.className = "item fa-solid fa-block-question";
      
      star.style.left = px(position.x);
      star.style.top = px(position.y);
      star.style.fontSize = selectRandom(config.sizes);
      star.style.color = `rgb(${color})`;
      star.style.textShadow = `0px 0px 1.5rem rgb(${color} / 0.5)`;
      star.style.animationName = config.animations[count++ % 3];
      star.style.starAnimationDuration = ms(config.starAnimationDuration);
      
      appendElement(star);

      removeElement(star, config.starAnimationDuration);
    };

    const createGlowPoint = position => {
      const glow = document.createElement("div");
      
      glow.className = "glow-point";
      
      glow.style.left = px(position.x);
      glow.style.top = px(position.y);
      
      appendElement(glow)
      
      removeElement(glow, config.glowDuration);
    };

    const determinePointQuantity = distance => Math.max(
      Math.floor(distance / config.maximumGlowPointSpacing),
      1
    );

    const createGlow = (last, current) => {
      const distance = calcDistance(last, current),
            quantity = determinePointQuantity(distance);
      
      const dx = (current.x - last.x) / quantity,
            dy = (current.y - last.y) / quantity;
      
      Array.from(Array(quantity)).forEach((_, index) => { 
        const x = last.x + dx * index, 
              y = last.y + dy * index;
        
        createGlowPoint({ x, y });
      });
    };

    const updateLastStar = position => {
      last.starTimestamp = new Date().getTime();

      last.starPosition = position;
    };

    const updateLastMousePosition = position => last.mousePosition = position;

    const adjustLastMousePosition = position => {
      if(last.mousePosition.x === 0 && last.mousePosition.y === 0) {
        last.mousePosition = position;
      }
    };

    const handleOnMove = e => {
      const mousePosition = { x: e.clientX, y: e.clientY }
      
      adjustLastMousePosition(mousePosition);
      
      const now = new Date().getTime(),
            hasMovedFarEnough = calcDistance(last.starPosition, mousePosition) >= config.minimumDistanceBetweenStars,
            hasBeenLongEnough = calcElapsedTime(last.starTimestamp, now) > config.minimumTimeBetweenStars;
      
      if(hasMovedFarEnough || hasBeenLongEnough) {
        createStar(mousePosition);
        
        updateLastStar(mousePosition);
      }
      
      createGlow(last.mousePosition, mousePosition);
      
      updateLastMousePosition(mousePosition);
    };

    window.onmousemove = e => handleOnMove(e);

    window.ontouchmove = e => handleOnMove(e.touches[0]);

    document.body.onmouseleave = () => updateLastMousePosition(originPosition);
  } else {
    document.getElementById("SCMM").remove();
    isMenuOpen = false;
  }
}