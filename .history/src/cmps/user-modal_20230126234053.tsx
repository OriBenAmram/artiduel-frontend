import { MouseEventHandler } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectedUser } from "../store/store"

interface UserModalProps {
    onLogout: MouseEventHandler<HTMLHeadingElement>
}

export function UserModal({onLogout}: UserModalProps) {

    const loggedInUserId = useSelector(selectedUser)._id

    console.log('loggedInUserId', loggedInUserId)

    return <div className="user-modal">
        <button className="close-btn">X</button>
        <div className="links-container">
            <Link to={`/profile/${loggedInUserId}`} className="profile">Profile</Link>
        </div>
        <h5 className="logout" onClick={onLogout}>Logout</h5>
    </div>
}