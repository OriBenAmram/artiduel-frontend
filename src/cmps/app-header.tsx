// React and stuff
import { MouseEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation, Location, useNavigate } from 'react-router-dom';

// Cmps

// Store
import { setUser } from '../store/slicers/user.slice';
import { userService } from '../services/user.service';
import { isScreenNarrow, selectedUser } from '../store/store';

// Services

// 3rd side libraries
import { toast } from 'react-toastify';

// Icons
import { AiFillHome } from 'react-icons/ai'
import { FaUserAlt } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useState } from 'react';
import { GameModalScreen } from './game-modal-screen';
import { UserModal } from './user-modal';
import { setNarrowState } from '../store/slicers/app.slice';

export function AppHeader() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location: Location = useLocation()
    const user = useSelector(selectedUser)
    const isNarrow = useSelector(isScreenNarrow)

    const [isMenuOpen, setMenuState] = useState<boolean>(false)
    const [isUserModalOpen, setUserModalOpen] = useState<boolean>(false)
    const isHide = ((location.pathname === '/login' || location.pathname === '/signup') || (location.pathname === '/') || (location.pathname.includes('/game')))

    function onWindowWidthChange(ev: MediaQueryListEvent) : void {
        (ev.matches) ? dispatch(setNarrowState(true)) : dispatch(setNarrowState(false))
    }

    const mmObj = window.matchMedia("(max-width: 760px)")
    mmObj.addEventListener('change', onWindowWidthChange);

    async function onLogout(ev: MouseEvent) {
        ev.stopPropagation()
        try {
            await userService.logout()
            dispatch(setUser(null))
            navigate('/login')
            // showSuccessMsg(`Bye now`)
        } catch (err) {
            console.log('cannot logout')
            // showErrorMsg('Cannot logout')
        }
    }

    const onOpenGameModal = ()  : void => {
        if (!user) {
            toast.info(`In order to play you have to sign in!`);
            return
        }
        toggleMenu()
    }

    const toggleMenu = () : void  => {
        setMenuState(prevIsMenuOpen => !prevIsMenuOpen)
    }

    const toggleUserModal = (ev: MouseEvent | null) : void  => { // TouchEvent
        ev?.stopPropagation()
        setUserModalOpen(prevIsUserModalOpen => !prevIsUserModalOpen)
    }

    return (
        <header className={`app-header full ${(isHide) ? 'hide' : ''}`}>

            {isMenuOpen && <GameModalScreen toggleMenu={toggleMenu} />}
            <div className="header-content">

                <NavLink className={`logo mobile`} to={user ? '/feed' : '/'}>ArtiDuel</NavLink>

                <div className={`nav-container ${isMenuOpen ? 'low-nav' : ''} `}>
                    {((!isMenuOpen || !isNarrow) && !location.pathname.includes('/game')) && <button className='primary-btn' onClick={onOpenGameModal}>New game</button>}


                    <NavLink className='logo desktop' to={user ? '/feed' : '/'}>ArtiDuel</NavLink>

                    <ul className={`nav-links clean-list `}>
                        {/* feed */}
                        <NavLink to={'/feed'}> <li className="feed-title">Feed</li><li className="feed-icon nav-icon"><AiFillHome /></li></NavLink>
                        {/* user */}
                        {user && <div className='user-icon-btn' onClick={toggleUserModal}>
                            <FaUserAlt className='nav-icon user' />
                            <GiHamburgerMenu className='nav-icon hamburger' />
                            {isUserModalOpen && <div className="screen"></div>}
                            {isUserModalOpen && <UserModal toggleUserModal={toggleUserModal} onLogout={onLogout} />}
                        </div>}

                        {!user && <NavLink className="register-link" to={'/login'}> <li>Login</li></NavLink>}
                        {!user && <NavLink className="register-link" to={'/signup'}> <li>Signup</li></NavLink>}
                    </ul>
                </div>
            </div>
        </header>
    )
}