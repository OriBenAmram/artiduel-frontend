import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { userService } from "../services/user.service"
import avatar from "../assets/imgs/avatar.jpg"
import { PostList } from "../cmps/post-list"

export function UserProfile() {

    const { userId } = useParams()
    const [user, setUser] = useState(null)

    useEffect(() => {
        userService.getUserById(userId)
            .then((user) => {
                if (!user) {
                    setUser({firstName: '', lastName: '', description: '', draws: []}) // Empty user just for now (handle Loading). TODO - push to another page
                    return console.log('Some Error')
                }
                setUser(user)
                console.log('user from component', user)
            })

    }, [])

    if (!user) return <h1>Loading...</h1>

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
            <PostList draws={user.draws}></PostList>

        </div>
    </div>
}