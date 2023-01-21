import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from 'react-redux'

import { userService } from "../services/user.service"
import avatar from "../assets/imgs/avatar.jpg"

import { PostList } from "../cmps/post-list"
import {ImgUploader} from "../cmps/img-uploader"

export function UserProfile() {
    
    const loggedinUser = useSelector(storeState => storeState.userModule.user)

    const { userId } = useParams()
    const [user, setUser] = useState(null)
    const [isLoggedInProfile, setIsLoggedInProfile] = useState(null)

    useEffect(() => {
        console.log('loggedinUser', loggedinUser)
        console.log('userId === loggedinUser.id', userId === loggedinUser.id)
        if(userId === loggedinUser.id) {
            setIsLoggedInProfile(true)
            return setUser(loggedinUser)
        }

        userService.getById(userId)
            .then((user) => {
                if (!user) {
                    // TODO - push to another page
                    return console.log('Some Error')
                }
                setIsLoggedInProfile(false)
                setUser(user)
            })
    }, [])

    // async function onUploadedImg(imgUrl) {
    //     try(){
    //     await userService.updateUser
    //     }catch(err){
    //     console.error('' ,err)
    //     }

    // }

    if (!user) return <h1>Loading...</h1>

    if (!user.draws || !user.draws.length) user.draws = [
        {
            _id: '123',
            title: 'My drawing',
            owner: 'Ori Ben Amram',
            ownerId: '888',
            likesIds: ['123', '234', '345']
        },
        {
            _id: '124',
            title: 'Best description',
            owner: 'Lisa Pizza',
            ownerId: '888',
            likesIds: ['123', '234', '345']
        },
        {
            _id: '125',
            title: 'I like it',
            owner: 'Vicky Polatov',
            ownerId: '888',
            likesIds: ['123', '234', '345']
        },
        {
            _id: '126',
            title: 'I love titles',
            owner: 'Ori Ben Amram',
            ownerId: '888',
            likesIds: ['123', '234', '345']
        },
        {
            _id: '127',
            title: 'Kill it',
            owner: 'Daniel Baram',
            ownerId: '888',
            likesIds: ['123', '234', '345']
        },
        {
            _id: '128',
            title: 'Disney and stuff',
            owner: 'Vicky Polatov',
            ownerId: '888',
            likesIds: ['123', '234', '345']
        },
        {
            _id: '129',
            title: 'Does not care',
            owner: 'Dani Cohen',
            ownerId: '888',
            likesIds: ['123', '234', '345']
        },
        {
            _id: '131',
            title: 'Mama I like',
            owner: 'Nicolas Segev',
            ownerId: '888',
            likesIds: ['123', '234', '345']
        },
        {
            _id: '132',
            title: 'Just some',
            owner: 'Noam Shiri',
            ownerId: '888',
            likesIds: ['123', '234', '345']
        },
    ]

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
            <button className="profile-btn primary-btn">Invite For a Game</button>
            {/* TODO - if not friends: */}
            {/* <button>Add to Friends</button> */}
            <PostList posts={user.draws}></PostList>

        </div>
    </div>
}