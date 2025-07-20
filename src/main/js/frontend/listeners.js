console.log("Document loaded, requesting svg");

const loadSvg = async () => {
    const svg = await service.requestSvg();
    document.getElementById("display").innerHTML = svg;
}

loadSvg();
service.subscribeSvg(svgdata => {
    const DISPLAY = document.getElementById("display");
    DISPLAY.innerHTML = svgdata;
    service.notifySvg(analyse(DISPLAY.firstChild));
});