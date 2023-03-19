import { NavLink } from 'react-router-dom';

export function HomeContent() {
    return (
        <div className="home-content">
            <section className="home-hero main-layout">
                <h1>Draw with Friends</h1>
                <h5>Find an online opponent to duel in real time, and collect coins as you win!</h5>
                <div className="btns-container">
                    <NavLink to={'/signup'} className="primary-btn">Sign up</NavLink>
                    <NavLink to={'/feed'} className="secondary-btn-dark">Guest mode</NavLink>
                </div>
            </section>
        </div>
    )
}