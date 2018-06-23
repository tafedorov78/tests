import Config from "./Config.js";
import Commands from "./Commands";

export default class Model {

    constructor() {
        this.generatedShapesPerSecond = 0;
        this.shapeTypes = Config.SHAPE_TYPES;
        this.numberOfCurrentShapes = 0;
        this.surfaceAreaOccupiedByShapes = 0;
        this.numberOfShapesPerSecond = 0;
        this.gravityValue = Config.INITIAL_GRAVITY;
    }

    requestForStart() {
        Commands.applicationRunSignal.dispatch();
        Commands.numberOfShapesPerSecondChanged.dispatch(this.generatedShapesPerSecond);
        Commands.gravityValueHasChanged.dispatch(this.gravityValue);
    }


    getNewRandomShapeType() {
        return Config.SHAPE_TYPES[Math.round(Math.random() * Config.SHAPE_TYPES.length)];
    }

    getNewRandomShapeColour() {
        return Math.random() * 0xffffff;
    }

    increaseGravity() {
        this.gravityValue += 0.01;
        Commands.gravityValueHasChanged.dispatch(Number(this.gravityValue.toFixed(2)));
    }

    decreaseGravity() {
        if(this.gravityValue > 0) {
            this.gravityValue -= 0.01;
        }
        if(this.gravityValue < 0) {
            this.gravityValue = 0;
        }
        Commands.gravityValueHasChanged.dispatch(Number(this.gravityValue.toFixed(2)));
    }

    increaseShapesPerSecond() {
        this.generatedShapesPerSecond++;
        Commands.numberOfShapesPerSecondChanged.dispatch(this.generatedShapesPerSecond);
    }

    decreaseShapesPerSecond() {
        if(this.generatedShapesPerSecond > 0) {
            this.generatedShapesPerSecond--;
        }
        Commands.numberOfShapesPerSecondChanged.dispatch(this.generatedShapesPerSecond);
    }

    updateNumberOfShapesAndArea(numberOfShapes, area) {
        Commands.numberOfShapesHasChanged.dispatch(numberOfShapes, area);
    }


}