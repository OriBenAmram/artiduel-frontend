import { useState, FC } from 'react';
import { useDispatch } from 'react-redux';

import { setUser } from '../store/slicers/user.slice';

import { NavLink } from 'react-router-dom';

import { IStorageUser } from '../model/interfaces/IUser';

import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';


interface HomeHeaderProps {
    user: IStorageUser | null
}

export const HomeHeader: FC<HomeHeaderProps> = ({ user }) => {
    const [isMenuOpen, setMenuState] = useState(false)
    const dispatch = useDispatch()

    const toggleMenu = (): void => {
        setMenuState(!isMenuOpen)
    }

    async function onLogout() {
        try {
            dispatch(setUser(null))
            console.log('bye now')
            // showSuccessMsg(`Bye now`)
        } catch (err) {
            console.log('cannot logout')
            // showErrorMsg('Cannot logout')
        }
    }

    return (
        <header className="home-header">

            <div className={`screen-overlay ${(isMenuOpen) ? 'open' : ''}`} onClick={() => {
                toggleMenu()
            }}></div>
            <div className="logo mobile">ArtiDuel</div>

            <div className={`nav-container ${isMenuOpen ? 'open' : ''}`}>
                <button className="close-btn" onClick={toggleMenu}><AiOutlineClose className='close-icon' /></button>
                <div className="logo desktop">ArtiDue</div>
                <NavLink to={'/about'}>Who are we</NavLink>
                <NavLink to={'/instructions'}>Instructions</NavLink>
            </div>
            {!user && <div className="auth-options">
                <NavLink to={'/login'}>Log in</NavLink>
                <NavLink className="sign-up-btn" to={'/signup'}>Sign Up</NavLink>
            </div>}
            <button className="hamburger-btn" onClick={() => {
                toggleMenu()
            }}>
                <GiHamburgerMenu className="hamburger-icon" />
            </button>
        </header>
    )
}