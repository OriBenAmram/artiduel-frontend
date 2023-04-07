import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setUser } from "../store/slicers/user.slice";

import { userService } from "../services/user.service";

// import { toast } from 'react-toastify';
import { GoPrimitiveDot } from 'react-icons/go'

type validationData = {
    validationErrMsg: string
    field: string
} | null

export function SignupPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
    const [credentialsErrors, setCredentialsErrors] = useState({ usernameErr: '', passwordErr: '', fullnameErr: '' })

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials((prevCreds) => ({ ...prevCreds, [field]: value }))
    }

    const clearState = (): void => {
        setCredentials({ username: '', password: '', fullname: '' })
    }

    const onSubmit = async (ev: React.FormEvent<HTMLFormElement>): Promise<void> => {
        ev.preventDefault()
        // if (!credentials.username || !credentials.password || !credentials.fullname) return
        const validationData: validationData = getValidationErr()
        if (validationData?.validationErrMsg) {
            setErrorMsg(validationData.validationErrMsg, validationData.field)
            return
        }
        try {
            const user = await userService.signup(credentials)
            dispatch(setUser(user))
            if (user) navigate('/feed')
            clearState()
        } catch {
            // toast.warning(`Could not sign up for some reason, please try again soon`);
        }
    }

    const getValidationErr = (): validationData => {
        // username
        if (!credentials.username) return { validationErrMsg: 'Please enter your username', field: 'username' }
        if (credentials.username.length < 5) return { validationErrMsg: 'Your username must includes at least 6 characters', field: 'username' }
        // password
        if (!credentials.password) return { validationErrMsg: 'Please enter your password', field: 'password' }
        // if (credentials.password.length < 6) return { validationErrMsg: 'Your password must includes at least 6 characters', field: 'password' }
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$/
        if (!passwordRegex.test(credentials.password)) return { validationErrMsg: 'Your password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one number. Please try again with a valid password.', field: 'password' }
        // fullname
        if (!credentials.fullname) return { validationErrMsg: 'Please enter your full name', field: 'fullname' }
        if (credentials.fullname.length < 2) return { validationErrMsg: 'Your full name must includes at least 2 characters', field: 'fullname' }

        return null
    }

    const setErrorMsg = (validationErrMsg: string, field: string) => {
        setCredentialsErrors((prevState) => ({ ...prevState, [field + 'Err']: validationErrMsg }))
    }

    const onFocus = (field: string) => {
        setCredentialsErrors((prevState) => ({ ...prevState, [field + 'Err']: '' }))
    }

    return <div className="register-page">
        <h1 className="logo">ArtiDuel</h1>
        <h3 className="short-desc" title="Log in to arti duel">Log in to ArtiDuel</h3>
        <div className="register-modal">
            <form onSubmit={onSubmit} autoComplete="off">
                <h1>Log in to ArtiDuel</h1>
                <div className="input-container">
                    <input title="Enter user name" type="text" placeholder="Username" name="username" value={credentials.username} style={{ border: credentialsErrors.usernameErr ? '2px solid #f2545b' : '' }} onChange={handleChange} onFocus={() => onFocus('username')} autoFocus />
                    {credentialsErrors.usernameErr && <div className="error-msg">{credentialsErrors.usernameErr}</div>}
                </div>
                <div className="input-container">
                    <input title="Enter password" type="password" placeholder="Password" name="password" value={credentials.password} style={{ border: credentialsErrors.passwordErr ? '2px solid #f2545b' : '' }} onChange={handleChange} onFocus={() => onFocus('password')} />
                    {credentialsErrors.passwordErr && <div className="error-msg">{credentialsErrors.passwordErr}</div>}
                </div>
                <div className="input-container">
                    <input title="Enter full name" type="text" placeholder="Fullname" name="fullname" value={credentials.fullname} style={{ border: credentialsErrors.fullnameErr ? '2px solid #f2545b' : '' }} onChange={handleChange} onFocus={() => onFocus('fullname')} />
                    {credentialsErrors.fullnameErr && <div className="error-msg">{credentialsErrors.fullnameErr}</div>}
                </div>
                <button title="Press to continue" className="cta-btn">Continue</button>
            </form>
            <div className="or-seperator">OR</div>
            <button className="alternative-login-btn">Continue with Google</button>
            <hr className="form-seperator" />
            <div className="nav-options">
                <NavLink to='/'>Back</NavLink>
                <span><GoPrimitiveDot /></span>
                <NavLink to='/login'>Log in</NavLink>
            </div>
        </div>
    </div>
}