import { socketService } from "./socket.service";
import { userService } from "./user.service";

export const canvasService = {
    // drawings
    pencilDraw,
    setStartPoint,
    drawBgcColor,
    getEvPos,
    drawArc,
    // saving
    loadPlayerCanvas,
    savePlayerCanvas,
    loadOpponentCanvas,
    saveOpponentCanvas,
    // formatting
    createDrawing
}
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

// POS

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop
        }
    }
    return pos
}

function setStartPoint(ev, ctx) {
    const { x, y } = canvasService.getEvPos(ev)
    ctx.beginPath()
    ctx.moveTo(x, y)
}

// DRAW

function pencilDraw(ev, ctx, brush = { color: 'black', width: 10 }) {
    const { x, y } = getEvPos(ev)
    // ctx.moveTo(x, y)
    ctx.lineTo(x, y)
    ctx.lineWidth = brush.width
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = brush.color
    ctx.stroke()
}

function drawBgcColor(canvas, ctx, color) {
    ctx.beginPath()
    ctx.rect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = color
    ctx.fillStyle = color
    ctx.stroke()
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function drawArc(x, y, ctx, radius = 4, lineWidth = 2, color = 'red') {
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawImgFromRemote(canvas, ctx, dataUrl) {
    const img = new Image()
    img.src = dataUrl;
    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height) //img,x,y,xend,yend
    }
}

// SAVE

function loadPlayerCanvas(canvas, ctx) {
    const playerDataURL = _loadCanvasFromStorage('playerCanvas')
    if (playerDataURL) drawImgFromRemote(canvas, ctx, playerDataURL)
    else drawBgcColor(canvas, ctx, 'white')
}

function savePlayerCanvas(canvas) {
    // Creating DataURL to save and send
    const canvasDataUrl = canvas.toDataURL('image/jpeg')
    // Save it to sessionStorage for refresh
    _saveCanvasToStorage('playerCanvas', canvasDataUrl)
    socketService.emit('canvas-changed', canvasDataUrl)
}

function loadOpponentCanvas(canvas, ctx) {
    const opponentDataUrl = _loadCanvasFromStorage('opponentCanvas')
    if (opponentDataUrl) drawImgFromRemote(canvas, ctx, opponentDataUrl)
    else drawBgcColor(canvas, ctx, 'white')
}

function saveOpponentCanvas(canvas, ctx, dataUrl) {
    drawImgFromRemote(canvas, ctx, dataUrl)
    _saveCanvasToStorage('opponentCanvas', dataUrl)
}

function _saveCanvasToStorage(storageKey, canvasDataUrl) {
    sessionStorage.setItem(storageKey, JSON.stringify(canvasDataUrl))
}

function _loadCanvasFromStorage(storageKey) {
    var val = sessionStorage.getItem(storageKey);
    return JSON.parse(val);
}

// function saveToStorage(key, val) {
//     localStorage.setItem(key, JSON.stringify(val));
// }

// function loadFromStorage(key) {
//     var val = localStorage.getItem(key);
//     return JSON.parse(val);
// }

// Format

function createDrawing(playerCanvas, opponentCanvas, opponentUser) {
    const player = userService.getLoggedinUser()
    const playerDataURL = playerCanvas.toDataURL()
    const opponentDataURL = opponentCanvas.toDataURL()
    const drawing = {
        createdAt: Date.now(),
        title: 'Elephant',
        player1: {
            userId: player._id,
            fullname: player.fullname,
            dataUrl: playerDataURL
        },
        player2: {
            userId: opponentUser._id,
            fullname: opponentUser.fullname,
            dataUrl: opponentDataURL
        },
    }
    return drawing
}
