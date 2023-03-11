import { httpService } from './http.service.js'

export const drawService = {
    query,
    getById,
    save,
    remove,
    getDrawingsByUser
}

async function query(filterBy = {}) {
    return httpService.get('draw', filterBy)
}

function getById(drawId) {
    return httpService.get(`draw/${drawId}`)
}

async function remove(drawId) {
    return httpService.delete(`draw/${drawId}`)
}

async function save(draw) {
    var savedDraw
    if (draw._id) {
        savedDraw = await httpService.put(`draw/${draw._id}`, draw)
    } else {
        savedDraw = await httpService.post('draw', draw)
    }
    return savedDraw
}

function getDrawingsByUser(drawings = [], userId) { // later change drawings to duels
    const duelsByUser = drawings?.filter(duel => duel.player1.userId === userId || duel.player2.userId === userId)
    const drawingsByUser = duelsByUser?.map(duel => ({
        _id: `${userId}%${duel._id}`,
        title: duel.title,
        createdAt: duel.createdAt,
        dataUrl: duel.player1.userId === userId ? duel.player1.dataUrl : duel.player2.dataUrl,
        likes: duel.player1.userId === userId ? duel.player1.likes : duel.player2.likes,
    }))
    return drawingsByUser
}