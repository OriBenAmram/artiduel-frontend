import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { HomeHeader } from "../cmps/home-header"
import { HomeContent } from "../cmps/home-content"

import { selectedUser } from '../store/store';

export function HomePage() {
    const navigate = useNavigate()
    const user = useSelector(selectedUser)

    if (user) navigate('/feed')

    return (
        <div className="home-page">
            <HomeHeader user={user} />
            <HomeContent />
        </div>
    )
}