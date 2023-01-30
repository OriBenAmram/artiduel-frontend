import { useEffect, useState, FC } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { PostList } from '../cmps/post-list'
import { ImgUploader } from '../cmps/img-uploader'

import { selectedUser } from '../store/store'
import { setUser } from '../store/slicers/user.slice';
// import { updateUser } from '../store/actions/user.actions'

import { userService } from '../services/user.service'
import { getDefaultDraws } from '../services/draw.service'

import { IUser } from '../interfaces/IUser'
import avatar from '../assets/imgs/avatar2.jpg'

export function UserProfile() {

    const loggedinUser: IUser | null = useSelector(selectedUser)
    const { userId } = useParams<{ userId: string }>()
    // const { userId } : Readonly<Partial<{ userId: string; }>> = useParams<{userId: string}>()
    const [userProfile, setUserProfile] = useState<IUser | null>(null)
    const [isLoggedInProfile, setIsLoggedInProfile] = useState<boolean | null>(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (loggedinUser?._id === userId) {
            setIsLoggedInProfile(true)
            return setUserProfile(loggedinUser)
        }

        console.log('userId',userId)
        userService.getById(userId)
            .then((user: IUser) => {
                setIsLoggedInProfile(false)
                setUserProfile(user)
            })
            .catch(err => {
                console.log('Some Error', err)
                navigate('/')
            })
    }, [loggedinUser])


    // async function onUploadedImg(imgUrl: string): Promise<void> {
    //     try {
    //         const userToSave : IUser = { ...userProfile, imgUrl }
    //         const user = await userService.update(userToSave)
    //         dispatch(setUser(user))
    //     } catch (err) {
    //         console.error('Cannot upload img', err)
    //     }

    // }

    if (!userProfile) return <h1>Loading...</h1>

    if (!userProfile.draws || !userProfile.draws.length) userProfile.draws = getDefaultDraws()

    return <div className="profile-page-container grid">
        <div className="info-container">
            <div className="avatar-container">
                <img src={userProfile.imgUrl ? userProfile.imgUrl : avatar} alt="Profile" />
            </div>
           { /* 🚩 ~~~ TODO - onUploadedImg={onUploadedImg} TYPESCRIPT ~~~ 🚩 */}
            {/* {isLoggedInProfile && <ImgUploader onUploadedImg={onUploadedImg} />} */}
            <h2 className="flex justify-center">{userProfile.fullName}</h2>
            <h3 className="flex justify-center">Contact info:</h3>
            <h3 className="flex justify-center">{userProfile.email}</h3>
            {userProfile.description && <h3>more about me: /n {userProfile.description}</h3>}
            {/* TODO - if isLoggedInProfile, render edit-btn */}
        </div>
        <div className="main-profile-container flex column">
            <h2 className="achievements flex justify-center">Score: {userProfile.score} points</h2>
            {!isLoggedInProfile && <button className="profile-btn primary-btn">Invite For a Game</button>}
            {/* TODO - if not friends: */}
            {/* <button>Add to Friends</button> */}
            <PostList posts={userProfile.draws}></PostList>

        </div>
    </div>
}