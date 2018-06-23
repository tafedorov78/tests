import VisualObject from "./VisualObject";
import Commands from "../model/Commands";
import Config from "../model/Config";


export default class UIView extends VisualObject {
    constructor() {
        super();

        this.drawAll();
        Commands.numberOfShapesHasChanged.add(this.onNumberOfShapesHasChanged.bind(this));
        Commands.numberOfShapesPerSecondChanged.add(this.onNumberOfShapesPerSecondChanged.bind(this));
        Commands.gravityValueHasChanged.add(this.onGravityValueHasChanged.bind(this));
    }

    drawAll() {
        this.numberOfShapes = new PIXI.Text('Number of shapes:', {
            fontFamily: 'Arial',
            fontSize: 15,
            fill: 0xffffff,
            align: 'left'
        });
        this.numberOfShapes.x = 100;
        this.addChild(this.numberOfShapes);

        this.areaOfShapes = new PIXI.Text('Area of shapes:', {
            fontFamily: 'Arial',
            fontSize: 15,
            fill: 0xffffff,
            align: 'left'
        });
        this.areaOfShapes.x = this.numberOfShapes.width + 150;
        this.addChild(this.areaOfShapes);

        this.increaseShapesBtn = new PIXI.Graphics();
        this.increaseShapesBtn.beginFill(0x000000);
        this.increaseShapesBtn.lineStyle(5, 0xffffff, 1);
        this.increaseShapesBtn.drawRect(0, Config.FIELD_HEIGHT + 60, 50, 30);
        this.addChild(this.increaseShapesBtn);
        this.increaseShapesBtn.buttonMode = true;
        this.increaseShapesBtn.interactive = true;
        this.increaseShapesBtn.on('pointerdown', this.onIncreaseShapesBtnClick);
        this.increaseShapesBtn.endFill();

        let plusShape = new PIXI.Text('+', {
            fontFamily: 'Arial',
            fontSize: 15,
            fill: 0xffffff,
            align: 'left'
        });
        plusShape.x = 20;
        plusShape.y = Config.FIELD_HEIGHT + 67;
        this.addChild(plusShape);

        this.decreaseShapesBtn = new PIXI.Graphics();
        this.decreaseShapesBtn.beginFill(0x000000);
        this.decreaseShapesBtn.lineStyle(5, 0xffffff, 1);
        this.decreaseShapesBtn.drawRect(this.increaseShapesBtn.width + 150, Config.FIELD_HEIGHT + 60, 50, 30);
        this.addChild(this.decreaseShapesBtn);
        this.decreaseShapesBtn.buttonMode = true;
        this.decreaseShapesBtn.interactive = true;
        this.decreaseShapesBtn.on('pointerdown', this.onDecreaseShapesBtnClick);
        this.decreaseShapesBtn.endFill();

        let minusShape = new PIXI.Text('-', {
            fontFamily: 'Arial',
            fontSize: 15,
            fill: 0xffffff,
            align: 'left'
        });
        minusShape.x = this.increaseShapesBtn.width + 150 + 20;
        minusShape.y = Config.FIELD_HEIGHT + 67;
        this.addChild(minusShape);

        this.shapesPerSecond = new PIXI.Text('Shapes/sec: ', {
            fontFamily: 'Arial',
            fontSize: 15,
            fill: 0xffffff,
            align: 'left'
        });
        this.shapesPerSecond.x = this.increaseShapesBtn.width + 20;
        this.shapesPerSecond.y = Config.FIELD_HEIGHT + 65;
        this.addChild(this.shapesPerSecond);

        this.increaseGravityBtn = new PIXI.Graphics();
        this.increaseGravityBtn.beginFill(0x000000);
        this.increaseGravityBtn.lineStyle(5, 0xffffff, 1);
        this.increaseGravityBtn.drawRect(350, Config.FIELD_HEIGHT + 60, 50, 30);
        this.addChild(this.increaseGravityBtn);
        this.increaseGravityBtn.buttonMode = true;
        this.increaseGravityBtn.interactive = true;
        this.increaseGravityBtn.on('pointerdown', this.onIncreaseGravityBtnClick);
        this.increaseGravityBtn.endFill();

        let plusGravity = new PIXI.Text('+', {
            fontFamily: 'Arial',
            fontSize: 15,
            fill: 0xffffff,
            align: 'left'
        });
        plusGravity.x = 370;
        plusGravity.y = Config.FIELD_HEIGHT + 67;
        this.addChild(plusGravity);

        this.decreaseGravityBtn = new PIXI.Graphics()
        this.decreaseGravityBtn.beginFill(0x000000);
        this.decreaseGravityBtn.lineStyle(5, 0xffffff, 1);
        this.decreaseGravityBtn.drawRect(350 + this.increaseGravityBtn.width + 150, Config.FIELD_HEIGHT + 60, 50, 30);
        this.addChild(this.decreaseGravityBtn);
        this.decreaseGravityBtn.buttonMode = true;
        this.decreaseGravityBtn.interactive = true;
        this.decreaseGravityBtn.on('pointerdown', this.onDecreaseGravityBtnClick);
        this.decreaseGravityBtn.endFill();

        let minusGravity = new PIXI.Text('-', {
            fontFamily: 'Arial',
            fontSize: 15,
            fill: 0xffffff,
            align: 'left'
        });
        minusGravity.x = 350 + this.increaseGravityBtn.width + 150 + 20;
        minusGravity.y = Config.FIELD_HEIGHT + 67;
        this.addChild(minusGravity);

        this.gravity = new PIXI.Text('Gravity: ', {
            fontFamily: 'Arial',
            fontSize: 15,
            fill: 0xffffff,
            align: 'left'
        });
        this.gravity.x = 420;
        this.gravity.y = Config.FIELD_HEIGHT + 65;
        this.addChild(this.gravity);
    }

    onIncreaseShapesBtnClick() {
        Commands.inreaseShapesSignal.dispatch();
    }

    onDecreaseShapesBtnClick() {
        Commands.decreaseShapesSignal.dispatch();
    }

    onIncreaseGravityBtnClick() {
        Commands.increaseGravitySignal.dispatch();
    }

    onDecreaseGravityBtnClick() {
        Commands.decreaseGravitySignal.dispatch();
    }

    onNumberOfShapesPerSecondChanged(newValue) {
        this.shapesPerSecond.text = 'Shapes/sec: ' + String(newValue);
    }

    onGravityValueHasChanged(newValue) {
        this.gravity.text = 'Gravity: ' + String(newValue);
    }

    onNumberOfShapesHasChanged(numberOfShapes, area) {
        this.numberOfShapes.text = 'Number of shapes: ' + String(numberOfShapes);
        this.areaOfShapes.text = 'Area of shapes: ' + String(area);
    }
}