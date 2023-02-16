// React and stuff
import { MouseEvent, TouchEvent, useEffect } from 'react'
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
    const [isNarrow, setIsNarrow] = useState(window.matchMedia("(max-width: 760px)").matches)

    const [isUserModalOpen, setUserModalOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location: Location = useLocation()
    const isRegister = (location.pathname === '/login' || location.pathname === '/signup')
    const isHome = (location.pathname === '/')
    const isPlaying = (location.pathname.includes('/game'))

    useEffect(() => {

    }, [location.pathname])

    function onWindowWidthChange(x: any) {
        if (x.matches) {
            setIsNarrow(true)
        } else {
            setIsNarrow(false)
        }
    }

    const mmObj = window.matchMedia("(max-width: 760px)")
    mmObj.addListener(onWindowWidthChange);

    async function onLogout(ev: MouseEvent) {
        ev.stopPropagation()
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
        toggleMenu()
    }

    const toggleMenu = () => {
        setMenuState(prevIsMenuOpen => !prevIsMenuOpen)
    }

    const toggleUserModal = (ev: MouseEvent | undefined) => { // TouchEvent
        ev?.stopPropagation()
        setUserModalOpen(prevIsUserModalOpen => !prevIsUserModalOpen)
    }

    return (
        <header className={`app-header full ${(isRegister || isHome || isPlaying) ? 'hide' : ''}`}>

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