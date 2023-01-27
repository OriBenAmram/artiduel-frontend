import { useEffect, useState, FC } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'

import {selectedUser} from "../store/store"

import { userService } from "../services/user.service"
import {updateUser} from "../store/actions/user.actions"
import {getDefaultDraws} from "../services/draw.service"

import { PostList } from "../cmps/post-list"
import {ImgUploader} from "../cmps/img-uploader"
import avatar from "../assets/imgs/avatar2.jpg"

export function UserProfile(): FC {
    
    const loggedinUser = useSelector(selectedUser)

    const { userId } = useParams()
    const [user, setUser] = useState(null)
    const [isLoggedInProfile, setIsLoggedInProfile] = useState(null)
    const navigate = useNavigate()
    const num = 7
    

    useEffect(() => {
        if(userId === loggedinUser?._id) {
            setIsLoggedInProfile(true)
            return setUser(loggedinUser)
        }

        userService.getById(userId)
            .then(user => {
                setIsLoggedInProfile(false)
                setUser(user)
            })
            .catch(err => {
                console.log('Some Error', err)
                navigate('/')
            })
    }, [loggedinUser])


    async function onUploadedImg(imgUrl) {
        try{
          const userToSave = {...user, imgUrl}
          const s = await updateUser(userToSave)
        }catch(err){
        console.error('Cannot upload img' ,err)
        }

    }

    if (!user) return <h1>Loading...</h1>

    if (!user.draws || !user.draws.length) user.draws = getDefaultDraws()

    return <div className="profile-page-container grid">
        <div className="info-container">
            <div className="avatar-container">
                <img src={user.imgUrl ? user.imgUrl : avatar} alt="Profile" />
            </div>
            {isLoggedInProfile && <ImgUploader onUploadedImg={onUploadedImg} />}
            <h2 className="flex justify-center">{user.fullName}</h2>
            <h3 className="flex justify-center">Contact info:</h3>
            <h3 className="flex justify-center">{user.email}</h3>
            {user.description && <h3>more about me: /n {user.description}</h3>}
            {/* TODO - if isLoggedInProfile, render edit-btn */}
        </div>
        <div className="main-profile-container flex column">
            <h2 className="achievements flex justify-center">Score: {user.score} points</h2>
            {!isLoggedInProfile && <button className="profile-btn primary-btn">Invite For a Game</button>}
            {/* TODO - if not friends: */}
            {/* <button>Add to Friends</button> */}
            <PostList posts={user.draws}></PostList>

        </div>
    </div>
}