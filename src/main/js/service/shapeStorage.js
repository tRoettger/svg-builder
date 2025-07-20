const { SVG_DOCUMENT_ELEMENT } = require("./common/serviceCenter");

class ShapeStorage {

    constructor() {
        this.shapes = [];
        this.setShapes = this.setShapes.bind(this);
    }

    setShapes(shapes) {
        this.shapes = shapes;
        console.log("Shapes:", shapes);
    }
}

const shapeStorage = new ShapeStorage();
SVG_DOCUMENT_ELEMENT.subscribe(shapes => shapeStorage.setShapes(shapes));