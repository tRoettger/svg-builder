console.log("Document loaded, requesting svg");

const loadSvg = async () => {
    const svg = await service.requestSvg();
    document.getElementById("display").innerHTML = svg;
}

loadSvg();
service.subscribeSvg(svgdata => document.getElementById("display").innerHTML = svgdata);