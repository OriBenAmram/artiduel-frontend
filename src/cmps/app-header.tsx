import { NavLink, useLocation, Location } from 'react-router-dom';
import { logout } from '../store/actions/user.actions';

export function AppHeader() {

    const location: Location = useLocation()
    const isRegister = (location.pathname === '/login' || location.pathname === '/signup')
    const isHome = (location.pathname === '/')
    async function onLogout() {
        try {
            await logout()
            console.log('bye now')
            // showSuccessMsg(`Bye now`)
        } catch(err) {
            console.log('cannot logout')
            // showErrorMsg('Cannot logout')
        }
    }
    return (
        <header className={`app-header full ${(isRegister || isHome) ? 'hide' : ''}`}>

            <div className="header-content">

                <NavLink className={`logo mobile`} to={'/'}>ArtiDuel</NavLink>

                <div className={`nav-container `}>
                    <button className='primary-btn'>New game</button>


                    <NavLink className='logo desktop' to={'/'}>ArtiDuel</NavLink>

                    <ul className={`nav-links clean-list `}>
                        <button onClick={onLogout}>Logout</button>
                        <NavLink to={'/feed'}> <li>Feed</li></NavLink>
                        <NavLink to={'/profile'}> <li>Profile</li></NavLink>
                        <NavLink to={'/about'}> <li>About</li></NavLink>
                    </ul>
                </div>
            </div>

        </header>
    )
}