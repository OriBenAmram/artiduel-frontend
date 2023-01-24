// React and stuff
import { NavLink, useLocation, Location, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// Cmps

// Store
import { setUser } from '../store/slicers/user.slice';
import { userService } from '../services/user.service';

// Services

// 3rd side libraries


// Icons

export function AppHeader() {
    // const user = useSelector(store => store.userModule.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location: Location = useLocation()
    const isRegister = (location.pathname === '/login' || location.pathname === '/signup')
    const isHome = (location.pathname === '/')

    async function onLogout() {
        try {
            await userService.logout()
            dispatch(setUser(null))
            navigate('/login')
            console.log('bye now')
            // showSuccessMsg(`Bye now`)
        } catch (err) {
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