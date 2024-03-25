let int;

export function FullbrightOn() {
  clearInterval(int);
  int = setInterval(function () {
    ModAPI.blocks.air.lightValue = 10;
    ModAPI.blocks.air.reload();
  }, 5000);
}

export function FullbrightOff() {
  clearInterval(int);
  int = setInterval(function () {
    ModAPI.blocks.air.lightValue = 1;
    ModAPI.blocks.air.reload();
  }, 5000);
}

ModAPI.require("player");

let armorStats = {
  helmet: 0,
  chestplate: 0,
  leggings: 0,
  boots: 0
};