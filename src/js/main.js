import * as PIXI from "pixi.js";
import Model from "./model/Model";
import GameController from "./controller/GameController";

document.addEventListener("DOMContentLoaded", () => {
    let game = new Game();
    window.game = game;
});

class Game {
    constructor() {
        this.app = new PIXI.Application(800, 600, {backgroundColor : 0x000000});
        document.body.appendChild(this.app.view);
        this.model = new Model();
        this.gameController = new GameController(this);


    }

}
