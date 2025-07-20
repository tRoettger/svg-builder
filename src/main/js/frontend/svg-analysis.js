const analyse = (svg) => {
    return {
        size: analyseSize(svg),
        viewBox: analyseViewBox(svg),
        shapes: analyseShapes(svg)
    };
};

const analyseSize = (svg) => ({
    width: svg.getAttribute("width"),
    height: svg.getAttribute("height")
});

const analyseViewBox = (svg) => {
    const viewBox = svg.getAttribute("viewBox");
    const viewBoxValues = viewBox.split(" ");
    return {
        x: viewBoxValues[0],
        y: viewBoxValues[1],
        width: viewBoxValues[2],
        height: viewBoxValues[3]
    };
};

const analyseShapes = (svg) => {
    const shapes = [];
    for(let circleDom of svg.getElementsByTagName("circle")) {
        try {
            shapes.push(analyseCircle(circleDom));
        } catch (error) {
            console.error(`SB-003 Error while analysing circle: ${circleDom}`, error);
        }
    }
    return shapes;
};

const analyseCircle = (circleDom) => ({
    type: "CIRCLE",
    id: circleDom.id,
    x: circleDom.getAttribute("cx"),
    y: circleDom.getAttribute("cy"),
    radius: circleDom.getAttribute("r"),
    lineWidth: circleDom.getAttribute("stroke-width"),
    backgroundColor: circleDom.getAttribute("fill"),
    lineColor: circleDom.getAttribute("stroke")
});
