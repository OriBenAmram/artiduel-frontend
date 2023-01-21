import { storageService } from "./async-storage.service"

export const userService = {
    login,
    signup,
    logout,
    getLoggedinUser,
    getById
}

const STORAGE_KEY = 'user'
const LOGGEDIN_USER_KEY = 'loggedinUser'

async function login(userCred) {
    const users = await storageService.query('user')
    const user = users.find(user => user.username === userCred.username)
    // const user = await httpService.post('auth/login', userCred)
    if (user) {
        // socketService.login(user._id)
        return _setLoggedinUser(user)
    }
}

async function logout() {
    sessionStorage.removeItem(LOGGEDIN_USER_KEY)
    // socketService.logout()
    // return await httpService.post('auth/logout')
}

signup({
   fullName: 'Vicky',
   userName: 'Vicky',
   password: '1234' 
})

async function signup(user) {
    console.log('Hello from SignUp')
    user.balance = 1000
    user.createdAt = Date.now()
    if (!user.imgUrl) user.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await storageService.post(STORAGE_KEY, user)
    return _setLoggedinUser(user)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_KEY))
}

function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

function _setLoggedinUser(user) {
    const userToSave = {_id: user._id, fullname: user.fullname, balance: user.balance}
    sessionStorage.setItem(LOGGEDIN_USER_KEY, JSON.stringify(userToSave))
    return userToSave
}