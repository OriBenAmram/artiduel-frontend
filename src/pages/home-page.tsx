import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectedUser } from '../store/store';

import { HomeHeader } from "../cmps/home-header"
import { HomeContent } from "../cmps/home-content"
export function HomePage() {
    const user = useSelector(selectedUser)
    const navigate = useNavigate()
    if (user) {
        // Might throw an error, probably not even necessary 
        navigate('/feed')
    }
    return (
        <div className="home-page">
            <HomeHeader user={user} />
            <HomeContent />
        </div>
    )
}