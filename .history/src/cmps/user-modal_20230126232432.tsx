import { MouseEvent } from "react"

interface UserModalProps {
    onLogout: (ev: MouseEvent<Element, MouseEvent>) => void
}

export function UserModal({onLogout}: UserModalProps) {
    return <div className="user-modal">
        <button className="close-btn">X</button>
        <div className="links-container">
            <h4 className="profile">Profile</h4>
        </div>
        <h5 className="logout" onClick={onLogout}>Logout</h5>
    </div>
}