import FlyingObject from "./FlyingObject";
import VisualObject from "./VisualObject";

import Config from "../model/Config";
import Commands from "../model/Commands";

export default class Field extends VisualObject {

    constructor() {
        super();
        Commands.tappedOnShapedSignal.add(this.onTappedOnShaped.bind(this));
        Commands.shapeOutTheFieldSignal.add(this.onShapeOutTheField.bind(this));
        this.shapesPool = [];
        this.build();
    }


    build() {
        this.createBackground();
        this.createShapes();
    }

    createBackground() {
        let graphics = new PIXI.Graphics();
        graphics.lineStyle(5, 0xffffff, 1);
        graphics.drawRect(0,0, Config.FIELD_WIDTH, Config.FIELD_HEIGHT);
        this.addChild(graphics);
    }

    createShapes() {
        let shape;
        this.shapesContainer = new PIXI.Container();
        this.currentShapesList = [];

        let mask = new PIXI.Graphics();
        mask.x = 0;
        mask.y = 0;
        mask.beginFill(0x000000);
        mask.drawRect(0,0, Config.FIELD_WIDTH, Config.FIELD_HEIGHT);
        mask.endFill();
        this.addChild(mask);
        this.shapesContainer.mask = mask;

        let clickableArea = new PIXI.Graphics();
        clickableArea.x = 0;
        clickableArea.y = 0;
        clickableArea.beginFill(0xffffff);
        clickableArea.drawRect(0,0, Config.FIELD_WIDTH, Config.FIELD_HEIGHT);
        clickableArea.endFill();
        clickableArea.buttonMode = true;
        clickableArea.interactive = true;
        clickableArea.alpha = 0;
        this.addChild(clickableArea);
        clickableArea.on('pointerdown', this.onClickMask);
        this.addChild(this.shapesContainer);
    }

    onClickMask(event) {
        Commands.clickOnFieldSignal.dispatch(event);
    }

    addShapeOnTheField(shapeType, randomColour, gravity, x = -1, y = -1) {
        let shape = this.getShapeFromPool();
        shape.build(shapeType, randomColour, gravity);
        shape.y = y == -1 ? shape.y = -(shape.height + 100) : y - shape.height / 2;
        shape.x = x == -1 ? shape.x = Math.random() * (Config.FIELD_WIDTH - shape.width) : x - shape.width / 2;
        console.log(shape.x, shape.y);
    }


    getShapeFromPool() {
        let shape = this.shapesPool.length > 0 ? this.shapesPool.pop() : this.createShape();
        shape.visible = true;
        this.currentShapesList.push(shape);
        return shape;
    }

    putShapeInPool(shape) {
        shape.fieldVisibled = false;
        shape.visible = false;
        this.shapesPool.push(shape);
    }

    createShape() {
        let shape = new FlyingObject(0, 1);

        shape.visible = false;
        this.shapesContainer.addChild(shape);
        return shape;
    }

    onTappedOnShaped(shape) {
        this.removeShape(shape);
    }

    onShapeOutTheField(shape) {
        this.removeShape(shape);
    }

    removeShape(shape) {
        let shapeIndex = this.currentShapesList.indexOf(shape);
        this.putShapeInPool(shape);
        this.currentShapesList.splice(shapeIndex, 1);
    }

    update() {
        for (let i = 0; i < this.currentShapesList.length; i++) {
            if(!this.currentShapesList[i].fieldVisibled) {
                if(this.currentShapesList[i].y + this.currentShapesList[i].height + 5 > this.y) {
                    this.currentShapesList[i].fieldVisibled = true;
                    Commands.shapeIntersactionSignal.dispatch();
                }
            }
            this.currentShapesList[i].update();
        }
    }
}
