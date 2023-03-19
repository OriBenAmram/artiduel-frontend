import { useEffect, useState, useCallback, useRef, Dispatch, FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FeedHeader } from "../cmps/feed-header";
import { DrawList } from "../cmps/draw-list";

import { setDrawings } from "../store/slicers/draw.slice";
import { selectedDrawings } from "../store/store";

import { drawService } from "../services/draw.service";

export const Feed: FC = () => {
    const dispatch = useDispatch()
    const drawings = useSelector(selectedDrawings)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const loadDrawings = useCallback(async (): Promise<void> => {
        const drawingsToSave = await drawService.query()
        dispatch(setDrawings(drawingsToSave))
    }, [dispatch])

    useEffect(() => {
        setIsLoading(true)
        loadDrawings()
        setTimeout(() => {
            setIsLoading(false)
        }, 2000);
    }, [loadDrawings])

    return <div className="feed-page">
        <FeedHeader />
        {!isLoading && <DrawList drawings={drawings} />}
        {/* Loader */}
        {isLoading && <div className="loading-text-container">
            <h2>Loading the posts...</h2>
            <p>It would only take a second</p>
        </div>}
        {/* No Posts */}
    </div>
}