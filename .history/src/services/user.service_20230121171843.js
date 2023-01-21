import { storageService } from "./async-storage.service"
import {httpService} from "./http.service"

export const userService = {
    login,
    signup,
    logout,
    getLoggedinUser,
    getById
}

const USER_KEY = 'user'
const LOGGEDIN_USER_KEY = 'loggedinUser'
const url = 'auth'

async function login(userCred) {
    try{
        // const users = await storageService.query(USER_KEY)
        // const user = users.find(user => user.username === userCred.username)
        const user = await httpService.post(`${url}/login`, userCred)
        console.log('user', user)
        return _setLoggedinUser(user)
    }catch(err){
        console.error('Unvalid credentials', err)
        throw err
    }

 
}

async function logout() {

    sessionStorage.removeItem(LOGGEDIN_USER_KEY)
    // socketService.logout()
    // return await httpService.post('auth/logout')
}

async function signup(userToSave) {
    try{
        if (!userToSave.imgUrl) userToSave.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
        const user = await storageService.post(USER_KEY, userToSave)
        return _setLoggedinUser(userToSave)
    }catch(err){
        console.error('Cannot signup', err)
        throw err
    }
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