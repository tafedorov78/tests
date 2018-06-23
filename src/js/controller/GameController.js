import Commands from "../model/Commands";
import Field from "../view/Field";
import Config from "../model/Config";
import UIView from "../view/UIView";

export default class GameController {

    constructor(application) {
        this.application = application.app;
        this.model = application.model;
        this.stage = application.app.stage;
        Commands.applicationRunSignal.add(this.start.bind(this));
        Commands.clickOnFieldSignal.add(this.onClickOnFieldSignal.bind(this));
        Commands.shapeIntersactionSignal.add(this.calculateAreaOfShapes.bind(this));
        Commands.inreaseShapesSignal.add(this.onIncreaseShapeBtnClick.bind(this));
        Commands.decreaseShapesSignal.add(this.onDecreaseShapeBtnClick.bind(this));
        Commands.increaseGravitySignal.add(this.onIncreaseGravityBtnClick.bind(this));
        Commands.decreaseGravitySignal.add(this.onDecreaseGravityBtnClick.bind(this));
        this.buildAll();
        this.application.ticker.add(this.update.bind(this));
    }
    
    start() {
        setInterval(() => this.createShapesPerSecond(), 1000);
    }

    buildAll() {
        this.field = new Field();
        this.stage.addChild(this.field);
        this.field.x = this.application.screen.width / 2 - this.field.width / 2;
        this.field.y = this.application.screen.height / 2 - this.field.height / 2;

        this.uiView = new UIView();
        this.uiView.x = this.field.x;
        this.stage.addChild(this.uiView);
        this.model.requestForStart();
    }

    createShapesPerSecond() {
        for(let i = 0; i < this.model.generatedShapesPerSecond; i ++) {
            this.createShape();
        }
    }


    createShape(x = -1, y = -1) {
        let shapeType = this.model.getNewRandomShapeType();
        let randomColour = this.model.getNewRandomShapeColour();
        let gravity = this.model.gravityValue;
        this.field.addShapeOnTheField(shapeType, randomColour, gravity, x, y);
    }

    calculateAreaOfShapes() {
        let numberOfVisibledShapes = 0;
        let area = 0;
        for (let i = 0; i < this.field.currentShapesList.length; i++) {
            if(this.field.currentShapesList[i].fieldVisibled) {
                numberOfVisibledShapes++;
                area += this.field.currentShapesList[i].area;
            }
        }
        this.model.updateNumberOfShapesAndArea(numberOfVisibledShapes, area);
    }

    onClickOnFieldSignal(event) {
        let mousePos = event.data.global;
        this.createShape(mousePos.x, mousePos.y);
    }

    onIncreaseShapeBtnClick() {
        this.model.increaseShapesPerSecond();
    }

    onDecreaseShapeBtnClick() {
        this.model.decreaseShapesPerSecond();
    }

    onIncreaseGravityBtnClick() {
        this.model.increaseGravity();
    }

    onDecreaseGravityBtnClick() {
        this.model.decreaseGravity();
    }


    update() {
        this.field.update();
    }

}