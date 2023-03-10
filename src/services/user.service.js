import { httpService } from "./http.service"
import { socketService } from "./socket.service"

export const userService = {
    login,
    signup,
    logout,
    getLoggedinUser,
    getOpponentUser,
    getById,
    update,
    saveOpponent
}

const LOGGEDIN_USER_KEY = 'loggedinUser'
const OPPONENT_USER_KEY = 'opponentUser'
const AUTH_URL = 'auth'
const USER_URL = 'user'

async function login(userCred) {
    try {
        // const users = await storageService.query(USER_KEY)
        // const user = users.find(user => user.username === userCred.username)
        const user = await httpService.post(`${AUTH_URL}/login`, userCred)
        if (user) {
            socketService.login(user._id)
            return _setLoggedinUser(user)
        }
    } catch (err) {
        console.error('Invalid credentials', err)
        throw err
    }
}

async function logout() {
    try {
        await httpService.post(`${AUTH_URL}/logout`)
        sessionStorage.removeItem(LOGGEDIN_USER_KEY)
        socketService.logout()
    } catch (err) {
        console.error('Cannot logout', err)
        throw err
    }
}

async function signup(userToSave) {
    try {
        // const user = await storageService.post(USER_KEY, userToSave)
        const user = await httpService.post(`${AUTH_URL}/signup`, userToSave)
        socketService.login(user._id)
        return _setLoggedinUser(user)
    } catch (err) {
        console.error('Cannot signup', err)
        throw err
    }
}

async function getById(userId) {
    try {
        const user = await httpService.get(`${USER_URL}/${userId}`)
        return user
    } catch (err) {
        console.error('Cannot get user', err)
        throw err
    }
}

async function update(user) {
    try {
        const updatedUser = await httpService.put(`${USER_URL}/${user._id}`, user)
        return updatedUser
    } catch (err) {
        console.error('Cannot update user', err)
    }
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_KEY))
}

function getOpponentUser() {
    return JSON.parse(sessionStorage.getItem(OPPONENT_USER_KEY))
}

function saveOpponent(opponent) {
    sessionStorage.setItem(OPPONENT_USER_KEY, JSON.stringify(opponent))
    return opponent
}

function _setLoggedinUser(user) {
    sessionStorage.setItem(LOGGEDIN_USER_KEY, JSON.stringify(user))
    return user
}