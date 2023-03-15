import { useSelector } from "react-redux"
import { selectedUser } from "../store/store"

import avatar2 from '../assets/imgs/avatar2.jpg'

export function PlayerUserBar() { 

    const loggedInUser = useSelector(selectedUser)
    
    return <div className="player-user-bar">
        <img className="user-avatar" title={`${loggedInUser?.fullname}'s image `} alt="user avatar" src={loggedInUser?.imgUrl ? loggedInUser.imgUrl : avatar2} />
        <div className="user-details">
            <h3 className="user-fullname">{loggedInUser?.fullname}</h3>
            <span className="user-coins">23</span>
        </div>
    </div>
}