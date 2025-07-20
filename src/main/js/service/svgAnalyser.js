const { SVG_DOCUMENT_ELEMENT } = require("./common/serviceCenter");

class SvgAnalyser {

    constructor() {
        this.analyse = this.analyse.bind(this);
    }

    analyse(svgElement) {
        console.log("ELEMENT", svgElement);
    }
}

const svgAnalyser = new SvgAnalyser();
SVG_DOCUMENT_ELEMENT.subscribe(element => svgAnalyser.analyse(element));