import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setUser } from "../store/slicers/user.slice";

import { userService } from "../services/user.service";

import { toast } from 'react-toastify';


type validationMsg = string | null

export function LoginPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({ username: '', password: '' })
    const [credentialsError, setCredentialsError] = useState('')
    
    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials((prevCreds) => ({ ...prevCreds, [field]: value }))
    }

    const onSubmit = async (ev: React.FormEvent<HTMLFormElement>): Promise<void> => {
        ev.preventDefault()
        const validationMsg: validationMsg = getValidationErr()
        if (validationMsg) {
            setCredentialsError(validationMsg)
            return
        }
        try {
            const user = await userService.login(credentials)
            dispatch(setUser(user))
            if (user) navigate('/feed')
        } catch (err) {
            setCredentialsError('Sorry, the username or password you entered is incorrect. Please try again with the correct information.')
        }
    }

    const getValidationErr = (): string | null => {
        // username
        if (!credentials.username) return 'You must enter your username'
        if (!credentials.password) return 'You must enter your password'
        return null
    }

    const onFocus = () => {
        setCredentialsError('')
    }

    return <div className="register-page">
        <h1 className="logo">ArtiDuel</h1>
        <h3 className="short-desc">Log in to ArtiDuel</h3>
        <div className="register-modal">
            <form onSubmit={onSubmit} autoComplete="off">
                <h1>Log in to ArtiDuel</h1>
                <div className="input-container">
                    <input type="text" placeholder="Username" name="username" value={credentials.username} onChange={handleChange} onFocus={onFocus} autoFocus />
                </div>
                <div className="input-container">
                    <input type="password" placeholder="Password" name="password" value={credentials.password} onChange={handleChange} onFocus={onFocus} />
                    {credentialsError && <div className="error-msg">{credentialsError}</div>}
                </div>
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