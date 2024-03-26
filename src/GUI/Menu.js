// Updated clickgui.js - CreateMenu function modified to accept the event parameter for opening the menu
const { SetupModules } = require("./Modules");
const { LogoData } = require("../ModulesList");

let isMenuOpen = false;

export function CreateMenu(e) {
    if (!isMenuOpen) {
        isMenuOpen = true;
        const Holder = document.createElement("div");
        Holder.style =
            "backdrop-filter: blur(2px);width: fit-content;height: fit-content;position:absolute;left :50 % ;top :50 % ;transform :translate(-50 % , -50 % );";
        Holder.id = "SCMM";
        const Menu = document.createElement("div");
        Menu.style = `
            width :65 vw;
            height :70 vh;
            background :rgba(0,0,0,0.75);
            border-radius :2.5 vh;
            display :flex;
            flex-direction :column;
            padding :2 vh;
            overflow-y :auto;
        `;
        Menu.innerHTML = `
            <div style="
                display :flex;
                flex-direction :row;
                align-items :center;
                height :fit-content;
                width :100 % ;
                color :#fff;
                gap :1.5 vw;
                font-family :'Minecraftia', sans-serif;"
                margin-bottom :1 vh;
            >
                <img style="
                    width :20 vh;
                    height :20 vh;"
                    src ="${LogoData}">
                <h1 style="
                    font-size :4 vh;">
                    Fracticle Client
                </h1>
            </div>
            <input type="text" placeholder="Search Mods" style="margin-bottom :1 vh;">
            <div style="
                display :flex;
                justify-content:center;
                flex-wrap :wrap;
                flex-direction :row;
                align-items:center;
                height :fit-content;
                width :100 % ;
                color :#fff;
                gap :1.5 vw;
                font-family :'Minecraftia', sans-serif;"
                id ="SCMM-MODULES">
            </div>
        `;
        document.body.appendChild(Holder);
        Holder.appendChild(Menu);
        SetupModules();
    } else {
        document.getElementById("SCMM").remove();
        isMenuOpen = false;
    }
}