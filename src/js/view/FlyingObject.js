import VisualObject from "./VisualObject";
import Config from "../model/Config";
import Commands from "../model/Commands";

export default class FlyingObject extends VisualObject {


    constructor(type) {
        super();
        this.on('pointerdown', this.onClick);
        this.buttonMode = true;
        this.interactive = true;
        Commands.gravityValueHasChanged.add(this.onGravityValueHasChanged.bind(this));
        this.fieldVisibled = false;
        this.area = 0;
        this.build(type, 0xffffff);
    }

    build(type, colour, gravity) {
        this.gravity = gravity;
        this.fieldVisibled = false;
        if(this.graphics) this.graphics.clear();
        this.speed = Config.INITIAL_SPEED_FALLING;
        this.currentShapeType = type;
        this.currentColour = colour;
       switch (this.currentShapeType) {
           case "3":
               this.buildTriangle();
               break;
           case "4":
               this.buildRectangle();
               break;
           case "5":
               this.buildPolygon(5);
               break;
           case "6":
               this.buildPolygon(6);
               break;
           case "circle":
               this.buildCircle();
               break;
           case "ellipse":
               this.buildEllipse();
               break;
       }
       this.calculateArea();
    }

    buildPolygon(sides) {
        let size = Config.SHAPE_MAX_WIDTH;
        this.graphics = new PIXI.Graphics();
        this.graphics.lineStyle(5, 0xffffff, 1);
        this.graphics.beginFill(this.currentColour);
        this.graphics.moveTo (size * Math.cos(0), size *  Math.sin(0));

        for (let i = 1; i <= sides; i++) {
            this.graphics.lineTo (size * Math.cos(i * 2 * Math.PI / sides), size * Math.sin(i * 2 * Math.PI / sides));
        }

        this.graphics.endFill();
        this.addChild(this.graphics);
    }

    buildCircle() {
        this.graphics = new PIXI.Graphics();
        this.graphics.lineStyle(5, 0xffffff, 1);
        this.graphics.beginFill(this.currentColour);
        this.R1 = Config.SHAPE_MIN_WIDTH + Math.random() * (Config.SHAPE_MAX_WIDTH + Config.SHAPE_MIN_WIDTH);
        this.graphics.drawCircle(0, 0, this.R1);
        this.graphics.endFill();
        this.addChild(this.graphics);
    }

    buildEllipse() {
        this.graphics = new PIXI.Graphics();
        this.graphics.lineStyle(5, 0xffffff, 1);
        this.graphics.beginFill(this.currentColour);
        this.R1 = Config.SHAPE_MIN_WIDTH + Math.random() * (Config.SHAPE_MAX_WIDTH + Config.SHAPE_MIN_WIDTH);
        this.R2 = Config.SHAPE_MIN_HEIGHT + Math.random() * (Config.SHAPE_MAX_HEIGHT + Config.SHAPE_MIN_HEIGHT);
        this.graphics.drawEllipse(0, 0, this.R1, this.R2);
        this.graphics.endFill();
        this.addChild(this.graphics);
    }

    buildRectangle() {
        this.graphics = new PIXI.Graphics();
        this.graphics.lineStyle(5, 0xffffff, 1);
        this.graphics.beginFill(this.currentColour);
        this.R1 = Config.SHAPE_MIN_WIDTH + Math.random() * (Config.SHAPE_MAX_WIDTH + Config.SHAPE_MIN_WIDTH);
        this.R2 = Config.SHAPE_MIN_HEIGHT + Math.random() * (Config.SHAPE_MAX_HEIGHT + Config.SHAPE_MIN_HEIGHT);
        this.graphics.drawRect(0,0, this.R1, this.R2);
        this.graphics.endFill();
        this.addChild(this.graphics);
    }

    onClick() {
        Commands.tappedOnShapedSignal.dispatch(this);
    }

    buildTriangle() {
        this.R1 = Config.SHAPE_MIN_WIDTH + Math.random() * (Config.SHAPE_MAX_WIDTH + Config.SHAPE_MIN_WIDTH);
        this.R2 = Config.SHAPE_MIN_WIDTH + Math.random() * (Config.SHAPE_MAX_WIDTH + Config.SHAPE_MIN_WIDTH);
        this.R3 = Config.SHAPE_MIN_WIDTH + Math.random() * (Config.SHAPE_MAX_WIDTH + Config.SHAPE_MIN_WIDTH);
        let Ax = 0;
        let Ay = 0;
        let Bx = this.R3;
        let By = 0;
        let Cx = (this.R2 * this.R1 + this.R3 * this.R3 - this.R1 * this.R1) / (2 * this.R3);
        let Cy = Math.sqrt(this.R2 * this.R2 - Cx * Cx);

        let Ox = 0;
        let Oy = 0;

        this.graphics = new PIXI.Graphics();
        this.graphics.lineStyle(5, 0xffffff, 1);
        this.graphics.beginFill(this.currentColour);
        this.graphics.moveTo(Ox + Ax, Oy - Ay);
        this.graphics.lineTo(Ox + Bx, Oy - By);
        this.graphics.lineTo(Ox + Cx, Oy - Cy);
        this.graphics.endFill();
        this.addChild(this.graphics);
    }

    calculateArea() {
        this.area = 0;
        switch (this.currentShapeType) {
            case "3":
                let b = this.R1 > this.R2 ? this.R1 : this.R2;
                let base = b > this.R3 ? b : this.R3;
                this.area =  0.5 * (base * this.height);
                break;
            case "4":
                this.area = (this.R1 * this.R2);
                break;
            case "5":
                this.area = (this.width * this.height);
                break;
            case "6":
                this.area = (this.width * this.height);
                break;
            case "circle":
                this.area = (this.R1 * this.R1 * Math.PI);
                break;
            case "ellipse":
                this.area = (this.R1 / 2 * this.R2 / 2 * Math.PI);
                break;
        }
        this.area = Math.round(this.area);
    }

    onGravityValueHasChanged(newValue) {
        this.gravity = newValue;
    }

    update() {
        this.speed += this.gravity;
        this.y += this.speed;

        if(this.y > Config.FIELD_HEIGHT + this.height) {
            this.fieldVisibled = false;
            Commands.shapeIntersactionSignal.dispatch();
            Commands.shapeOutTheFieldSignal.dispatch(this);
        }
    }

}