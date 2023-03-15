import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setUser } from "../store/slicers/user.slice";

import { userService } from "../services/user.service";

export function LoginPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [credentials, setCredentials] = useState({ username: '', password: '' })

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials((prevCreds) => ({ ...prevCreds, [field]: value }))
    }

    const onSubmit = async (ev: React.FormEvent<HTMLFormElement>): Promise<void> => {
        ev.preventDefault()
        if (!credentials.username || !credentials.password) {
            console.log('Please fill out all the fields in the form')
            return
        }
        try {
            const user = await userService.login(credentials)
            dispatch(setUser(user))
            if (user) navigate('/feed')
        } catch (err) {
            console.log('could not login')
        }
    }

    return <div className="register-page">
        <h1 className="logo">ArtiDuel</h1>
        <h3 className="short-desc">Log in to ArtiDuel</h3>
        <div className="register-modal">
            <form onSubmit={onSubmit} autoComplete="off">
                <h1>Log in to ArtiDuel</h1>
                <input type="text" placeholder="Username" name="username" value={credentials.username} onChange={handleChange} autoFocus />
                <input type="text" placeholder="Password" name="password" value={credentials.password} onChange={handleChange} />
                <button className="primary-btn">Continue</button>
            </form>
            <div className="or-seperator">Or</div>
            <button className="alternative-login-btn">Continue with Google</button>
            <div className="nav-options">
                <NavLink to='/'>Back</NavLink>
                <span>|</span>
                <NavLink to='/signup'>Sign up for an account</NavLink>
            </div>
        </div>
    </div>
}