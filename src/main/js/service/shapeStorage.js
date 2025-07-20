const { SVG_DOCUMENT_ELEMENT } = require("./common/serviceCenter");

class ShapeStorage {

    constructor() {
        this.shapes = [];
        this.setShapes = this.setShapes.bind(this);
    }

    setShapes(shapes) {
        this.shapes = shapes;
    }
}

const shapeStorage = new ShapeStorage();
SVG_DOCUMENT_ELEMENT.subscribe(element => {
    console.log("Analysis done:", element);
    shapeStorage.setShapes(element.shapes);

});