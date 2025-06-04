console.log("Document loaded, requesting svg");

const loadSvg = async () => {
    const svg = await service.requestSvg();
    console.log("received svg", svg);
}

loadSvg();