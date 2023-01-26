import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setUser } from "../store/slicers/user.slice";

import { userService } from "../services/user.service";


export function SignupPage() {
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (ev: any) => {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials((prevCreds) => ({ ...prevCreds, [field]: value }))
    }

    const clearState = () => {
        setCredentials({ username: '', password: '', fullname: '' })
    }

    const onSubmit = async (ev: any) => {
        ev.preventDefault()
        if (!credentials.username || !credentials.password || !credentials.fullname) return
        try {
            const user = await userService.signup(credentials)
            dispatch(setUser(user))
            if (user) navigate('/feed')
            console.log('Hello', user.fullname)
            clearState()
        } catch {
            console.log('Could not signup')
        }
    }

    return <div className="register-page">
        <h1 className="logo">ArtiDuel</h1>
        <h3 className="short-desc">Log in to ArtiDuel</h3>
        <div className="register-modal">
            <form onSubmit={onSubmit}>
                <h1>Log in to ArtiDuel</h1>
                <input type="text" placeholder="Username" name="username" value={credentials.username} onChange={handleChange} autoFocus />
                <input type="text" placeholder="Password" name="password" value={credentials.password} onChange={handleChange} />
                <input type="text" placeholder="Fullname" name="fullname" value={credentials.fullname} onChange={handleChange} />
                <button className="primary-btn">Continue</button>
            </form>
            <div className="or-seperator">Or</div>
            <button className="alternative-login-btn">Continue with Google</button>
            <div className="nav-options">
                <NavLink to='/'>Back</NavLink>
                <span>|</span>
                <NavLink to='/login'>Login</NavLink>
            </div>
        </div>
    </div>
}