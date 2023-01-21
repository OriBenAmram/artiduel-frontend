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
const AUTH_URL = 'auth'
const USER_URL = 'user'

async function login(userCred) {
    try{
        // const users = await storageService.query(USER_KEY)
        // const user = users.find(user => user.username === userCred.username)
        const user = await httpService.post(`${AUTH_URL}/login`, userCred)
        return _setLoggedinUser(user)
    }catch(err){
        console.error('Invalid credentials', err)
        throw err
    }
}

async function logout() {
    try {
      await httpService.post(`${AUTH_URL}/logout`)
      sessionStorage.removeItem(LOGGEDIN_USER_KEY)
      // socketService.logout()
    }catch(err) {
      console.error('Cannot logout' ,err)
      throw err
    }
}

async function signup(userToSave) {
    try{
        if (!userToSave.imgUrl) userToSave.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
        // const user = await storageService.post(USER_KEY, userToSave)
        const user = await httpService.post(`${AUTH_URL}/signup`, userToSave)
        return _setLoggedinUser(userToSave)
    }catch(err){
        console.error('Cannot signup', err)
        throw err
    }
}

async function getById(userId) {
    try{
      const user = await httpService.get(`${USER_URL}/${userId}`)
      return user
    }catch(err){
      console.error('Cannot get user' ,err)
      throw err
    }
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_KEY))
}

function _setLoggedinUser(user) {
    const userToSave = {_id: user._id, fullname: user.fullname, score: user.score}
    sessionStorage.setItem(LOGGEDIN_USER_KEY, JSON.stringify(userToSave))
    return userToSave
}