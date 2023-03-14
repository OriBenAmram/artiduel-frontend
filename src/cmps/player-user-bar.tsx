import { useSelector } from "react-redux"

import { selectedUser } from "../store/store"

export function PlayerUserBar() { 

    const loggedInUser = useSelector(selectedUser)
    
    return <div className="player-user-bar">
        <img src="" alt="user image" />
    </div>
}