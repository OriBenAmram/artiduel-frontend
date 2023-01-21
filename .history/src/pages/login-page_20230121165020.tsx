import { useState } from "react";
import { NavLink } from "react-router-dom";

import { login } from "../store/actions/user.actions";

export function LoginPage() {
    const [credentials, setCredentials] = useState({ username: '', password: '' })

    const handleChange = (ev : any) => {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials((prevCreds) => ({ ...prevCreds, [field]: value }))
    }

    const clearState = () => {
        setCredentials({ username: '', password: '' })
    }

    const onSubmit = async (ev : any) => {
        ev.preventDefault()
        if (!credentials.username || !credentials.password) {
            return console.log('Please fill out all the fields in the form') 
        }

        try{
            const loggedInUser = await login(credentials)
        } catch(err){
            console.error('Cannot login', err)
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