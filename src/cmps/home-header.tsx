import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';

export function HomeHeader() {

    const [isMenuOpen, setMenuState] = useState(false)

    const toggleMenu = () => {
        setMenuState(!isMenuOpen)
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
            <div className="auth-options">
                <NavLink to={'/feed'}>Enter as Guest</NavLink>
                <NavLink to={'/login'}>Log in</NavLink>
                <NavLink className="sign-up-btn" to={'/signup'}>Sign Up</NavLink>
            </div>
            <button className="hamburger-btn" onClick={() => {
                toggleMenu()
            }}>
                <GiHamburgerMenu className="hamburger-icon" />
            </button>
        </header>
    )
}