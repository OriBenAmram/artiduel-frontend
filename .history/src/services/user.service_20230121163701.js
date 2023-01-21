import { storageService } from "./async-storage.service"

export const userService = {
    login,
    signup,
    logout,
    getLoggedinUser,
    getById
}

const USER_KEY = 'user'
const LOGGEDIN_USER_KEY = 'loggedinUser'

async function login(userCred) {
    const users = await storageService.query(USER_KEY)
    if(!users) return null
    const user = users.find(user => user.username === userCred.username)
    if(!user) return null
    return _setLoggedinUser(user)
}

async function logout() {
    sessionStorage.removeItem(LOGGEDIN_USER_KEY)
    // socketService.logout()
    // return await httpService.post('auth/logout')
}

async function signup(userToSave) {
    console.log('Hello from SignUp')
    userToSave.balance = 1000
    userToSave.createdAt = Date.now()
    if (!userToSave.imgUrl) userToSave.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await storageService.post(USER_KEY, userToSave)
    return _setLoggedinUser(userToSave)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_KEY))
}

function getById(userId) {
    return storageService.get(USER_KEY, userId)
}

function _setLoggedinUser(user) {
    const userToSave = {_id: user._id, fullname: user.fullname, balance: user.balance}
    sessionStorage.setItem(LOGGEDIN_USER_KEY, JSON.stringify(userToSave))
    return userToSave
}