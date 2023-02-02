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
        <div className="links-container">
            <Link onClick={toggleUserModal} to={`/profile/${loggedInUserId}`} className="profile modal-item">Profile</Link>
        </div>
        <h6 className="logout modal-item" onClick={onLogout}>Logout</h6>
    </div>
}