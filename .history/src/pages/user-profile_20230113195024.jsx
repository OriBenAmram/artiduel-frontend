import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { userService } from "../services/user.service"
import avatar from "../assets/imgs/avatar.jpg"
import { PostList } from "../cmps/post-list"

export function UserProfile() {

    const { userId } = useParams()
    const [user, setUser] = useState(null)

    useEffect(() => {
        console.log(userId)
        userService.getById(userId)
            .then((user) => {
                if (!user) {
                    // TODO - push to another page
                    return console.log('Some Error')
                }
                setUser(user)
                console.log('user from component', user)
            })

    }, [])

    if (!user) return <h1>Loading...</h1>

    if(!user.draws || !user.draws.length()) user.draws = [
        {
            _id: '123',
            title: 'First drawing of mine',
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
            owner: 'Ori Ben Amram',
            ownerId: '888',
            likesIds: ['123', '234', '345']
        },
        {
            _id: '126',
            title: 'I love titles',
            owner: 'Vicky Shicky',
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
            owner: 'Kaki Pupu',
            ownerId: '888',
            likesIds: ['123', '234', '345']
        },
        {
            _id: '129',
            title: 'Does not care',
            owner: 'Pipi Shipi',
            ownerId: '888',
            likesIds: ['123', '234', '345']
        },
        {
            _id: '131',
            title: 'Mama I like',
            owner: 'Nicolas',
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
            <img src={user.imgUrl ? user.imgUrl : avatar} alt="Profile" />
            <h2 className="flex justify-center">{user.firstName} {user.lastName}</h2>
            <h3 className="flex justify-center">Contact info:</h3>
            <h3 className="flex justify-center">{user.email}</h3>
            {user.description && <h3>more about me: /n {user.description}</h3>}  
            {/* TODO - if user.id === loggedinUser.id, render edit-btn */}
        </div>
        <div className="main-profile-container">
            <h2 className="flex justify-center">Score: {user.score} points</h2>
            <button>Lets Play</button>
            <PostList posts={user.draws}></PostList>

        </div>
    </div>
}