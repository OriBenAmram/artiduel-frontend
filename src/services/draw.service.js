import { httpService } from './http.service.js'

export const drawService = {
    query,
    getById,
    save,
    remove,
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