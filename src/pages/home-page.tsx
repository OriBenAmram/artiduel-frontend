import { HomeHeader } from "../cmps/home-header"
import { HomeContent } from "../cmps/home-content"
export function HomePage() {
    return (
        <div className="home-page">
            <HomeHeader />
            <HomeContent />
        </div>
    )
}