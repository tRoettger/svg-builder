const analyse = (svg) => {
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
