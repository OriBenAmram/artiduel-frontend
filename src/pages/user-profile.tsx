import { useEffect, useState, FC } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { DrawList } from '../cmps/draw-list'
import { ImgUploader } from '../cmps/img-uploader'

import { selectedUser, selectedDrawings } from '../store/store'
import { setUser } from '../store/slicers/user.slice';
// import { updateUser } from '../store/actions/user.actions'
import { setDrawings } from "../store/slicers/draw.slice";

import { userService } from '../services/user.service'
import { drawService } from '../services/draw.service'

import { IStorageUser } from '../model/interfaces/IUser'
import avatar from '../assets/imgs/avatar2.jpg'
import { IDraw } from '../model/interfaces/IDraw'
import { IFormattedDraw } from '../model/interfaces/IFormattedDraw'


export const UserProfile: FC<{}> = () => {
    const loggedinUser: IStorageUser | null = useSelector(selectedUser)
    const drawings: IDraw[] = useSelector(selectedDrawings, shallowEqual)
    const { userId } = useParams<{ userId: string }>()

    const [userProfile, setUserProfile] = useState<IStorageUser>(null!)
    const [isLoggedInProfile, setIsLoggedInProfile] = useState<boolean>(null!)
    const [profileDrawings, setProfileDrawings] = useState<IFormattedDraw[]>(null!)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (loggedinUser?._id === userId) {
            setProfileSettings(true, loggedinUser as IStorageUser)
        } else {
            userService.getById(userId)
                .then((user: IStorageUser) => {
                    setProfileSettings(false, user as IStorageUser)
                })
                .catch(err => {
                    console.log('Some Error', err)
                    navigate('/')
                })
        }
    }, [loggedinUser, userId])

    useEffect(() => {
        const drawingsToShow = drawService.getDrawingsByUser(drawings, userProfile?._id)
        setProfileDrawings(drawingsToShow)
    }, [drawings])

    async function setProfileSettings(isLoggedInProfile: boolean, user: IStorageUser): Promise<void> {
        setIsLoggedInProfile(isLoggedInProfile)
        setUserProfile(user)
        if (!drawings) await loadDrawings()
    }

    const loadDrawings = async () => {
        try {
            const drawingsToSave = await drawService.query()
            dispatch(setDrawings(drawingsToSave))
        } catch (err) {
            console.log('Something went wrong', err)
        }
    }

    async function onUploadedImg(imgUrl: string): Promise<void> {
        try {
            const userToSave: IStorageUser = { ...userProfile, imgUrl }
            const user = await userService.update(userToSave)
            dispatch(setUser(user))
        } catch (err) {
            console.error('Cannot upload img', err)
        }

    }

    if (!userProfile || !profileDrawings) return <h1>Loading...</h1>

    return <div className="profile-page-container grid">
        <div className="info-container">
            <div className="avatar-container flex column align-center">
                <img src={userProfile.imgUrl ? userProfile.imgUrl : avatar} alt="Profile" />
                {isLoggedInProfile && <ImgUploader onUploadedImg={onUploadedImg} />}
            </div>
            <h2 className="flex justify-center">{userProfile.fullname}</h2>
            <h3 className="flex justify-center">Contact info:</h3>
            <h3 className="flex justify-center">{userProfile.email}</h3>
            {userProfile.description && <h3>more about me: /n {userProfile.description}</h3>}
            {/* TODO - if isLoggedInProfile, render edit-btn */}
        </div>
        <div className="main-profile-container flex column">
            <h2 className="achievements flex justify-center">Score: <span className='score'> {userProfile.score} </span> points</h2>
            {!isLoggedInProfile && <button className="profile-btn primary-btn">Invite For a Game</button>}
            {/* TODO - if not friends: */}
            {/* <button>Add to Friends</button> */}
            <DrawList drawings={profileDrawings} context='profile'></DrawList>

        </div>
    </div>
}