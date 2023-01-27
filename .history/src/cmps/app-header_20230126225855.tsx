// React and stuff
import { MouseEvent } from 'react';
import { NavLink, useLocation, Location, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// Cmps

// Store
import { setUser } from '../store/slicers/user.slice';
import { userService } from '../services/user.service';
import { selectedUser } from '../store/store';

// Services

// 3rd side libraries

// Icons
import { AiFillHome } from 'react-icons/ai'
import { FaUserAlt } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useState } from 'react';
import { GameModalScreen } from './game-modal-screen';
import { UserModal } from './user-modal';

export function AppHeader() {
    const user = useSelector(selectedUser)
    const [isMenuOpen, setMenuState] = useState(false)
    const [isUserModalOpen, setUserModalOpen] = useState(false)
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

    const onOpenGameModal = () => {
        console.log('start')
        toggleMenu()
    }

    const toggleMenu = () => { 
        setMenuState(prevIsMenuOpen => !prevIsMenuOpen)
    }
  
    const toggleUserModal = (ev: MouseEvent) => {
        ev.stopPropagation()
        console.log('ev', ev)
        setUserModalOpen(prevIsUserModalOpen => !prevIsUserModalOpen)
    }

    console.log('isMenuOpen:', isMenuOpen);

    return (
        <header className={`app-header full ${(isRegister || isHome) ? 'hide' : ''}`}>
            
            {isMenuOpen && <GameModalScreen toggleMenu={toggleMenu}/>}
            <div className="header-content">

                <NavLink className={`logo mobile`} to={user ? '/feed' : '/'}>ArtiDuel</NavLink>

                <div className={`nav-container `}>
                    <button className='primary-btn' onClick={onOpenGameModal}>New game</button>


                    <NavLink className='logo desktop' to={user ? '/feed' : '/'}>ArtiDuel</NavLink>

                    <ul className={`nav-links clean-list `}>
                        {/* feed */}
                        <NavLink to={'/feed'}> <li className="feed-title">Feed</li><li className="feed-icon nav-icon"><AiFillHome /></li></NavLink>
                        {/* user */}
                        {user && <button className='user-icon-btn' onClick={toggleUserModal}>
                            <FaUserAlt className='nav-icon user' />
                            <GiHamburgerMenu className='nav-icon hamburger' />
                            {isUserModalOpen && <UserModal />}
                        </button>}

                        {/*  */}
                        {!user && <NavLink className="register-link" to={'/login'}> <li>Login</li></NavLink>}
                        {!user && <NavLink className="register-link" to={'/signup'}> <li>Signup</li></NavLink>}
                    </ul>
                </div>
            </div>

            <div className="screen"></div>
        </header>
    )
}