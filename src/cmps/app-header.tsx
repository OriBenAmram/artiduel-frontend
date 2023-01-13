import { NavLink, useLocation, Location } from 'react-router-dom';

export function AppHeader() {

    const location: Location = useLocation()
    const isRegister = (location.pathname === '/login' || location.pathname === '/signup')
    const isHome = (location.pathname === '/')

    return (
        <header className={`app-header full ${(isRegister || isHome) ? 'hide' : ''}`}>

            <div className="header-content">

                <NavLink className={`logo mobile`} to={'/'}>ArtiDuel</NavLink>

                <div className={`nav-container `}>
                    <button className='primary-btn'>New game</button>


                    <NavLink className='logo desktop' to={'/'}>ArtiDuel</NavLink>

                    <ul className={`nav-links clean-list `}>
                        <NavLink to={'/feed'}> <li>Feed</li></NavLink>
                        <NavLink to={'/profile'}> <li>Profile</li></NavLink>
                        <NavLink to={'/about'}> <li>About</li></NavLink>
                    </ul>
                </div>
            </div>

        </header>
    )
}