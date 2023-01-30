interface UserModalProps {
    onLogout: () => void
}

export function UserModal({onLogout}: UserModalProps) {
    return <div className="user-modal">
        <button className="close-btn">X</button>
        <div className="links-container">
            <h4 className="profile">Profile</h4>
        </div>
        <h5 className="logout">Logout</h5>
    </div>
}