import { BaseCommands, Signal } from "./Definitions";

export default Object.assign({
    gameLoaded: new Signal(),
    applicationRunSignal : new Signal(),
    startGameSignal : new Signal(),
    shapeOutTheFieldSignal : new Signal(),
    numberOfShapesHasChanged : new Signal(),
    shapeIntersactionSignal : new Signal(),
    inreaseShapesSignal : new Signal(),
    decreaseShapesSignal : new Signal(),
    numberOfShapesPerSecondChanged : new Signal(),
    increaseGravitySignal : new Signal(),
    decreaseGravitySignal : new Signal(),
    gravityValueHasChanged : new Signal(),
    clickOnFieldSignal : new Signal(),
    tappedOnShapedSignal : new Signal()
});