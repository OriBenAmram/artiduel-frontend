import { MouseEventHandler } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectedUser } from "../store/store"

interface UserModalProps {
    onLogout: MouseEventHandler<HTMLHeadingElement>
    toggleUserModal: MouseEventHandler<HTMLAnchorElement>
}

export function UserModal({onLogout, toggleUserModal}: UserModalProps) {

    const loggedInUserId = useSelector(selectedUser)?._id

    console.log('loggedInUserId', loggedInUserId)

    return <div onClick={ev => ev.stopPropagation()} className="user-modal" >
        <span className="close-btn">X</span>
        <div className="links-container">
            <Link onClick={toggleUserModal} to={`/profile/${loggedInUserId}`} className="profile">Profile</Link>
        </div>
        <h5 className="logout" onClick={onLogout}>Logout</h5>
    </div>
}