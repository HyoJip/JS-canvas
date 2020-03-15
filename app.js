const canvas = document.getElementById("jsCanvas"),
    colors = document.getElementsByClassName("jsColor"),
    ctx = canvas.getContext("2d"),
    range = document.getElementById("jsRange"),
    mode = document.getElementById("jsMode"),
    save = document.getElementById("jsSave"),
    clear = document.getElementById("jsClear");

canvas.width = 700;
canvas.height = 500;

ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const strokeSize = event.target.value;
    ctx.lineWidth = strokeSize;
}

function handleModeClick() {
    if(mode.innerHTML === "채우기") {
        mode.innerHTML = "그리기";
        filling = true;
        ctx.lineWidth = 0.00001;
    } else {
        mode.innerHTML = "채우기";
        filling=false;
        ctx.lineWidth = range.value;
    }
}

function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleRightClick(event) {
    event.preventDefault()
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "제목없음";
    link.click();
}

function handleClearClick() {
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleRightClick);
}



Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input", handleRangeChange);
}


if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(save) {
    save.addEventListener("click", handleSaveClick);
}

if(clear) {
    clear.addEventListener("click", handleClearClick);
}