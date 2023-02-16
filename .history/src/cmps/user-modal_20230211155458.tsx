import { MouseEventHandler, useState, useEffect, useRef, TouchEventHandler, TouchEvent } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectedUser } from "../store/store"
import { IModalOpts } from "../interfaces/IModalOpts"

interface UserModalProps {
    onLogout: MouseEventHandler<HTMLHeadingElement>
    toggleUserModal: MouseEventHandler<HTMLAnchorElement> | TouchEventHandler<HTMLAnchorElement>
}

export function UserModal({ onLogout, toggleUserModal }: UserModalProps) {

    const loggedInUserId = useSelector(selectedUser)?._id
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [dragPercent, setDragPercent] = useState<number>(0)
    const [modalOptions, setModalOptions] = useState<IModalOpts>({
        diff: 0,
        mousePosY: 0,
        dragStartY: 0,
        modalTop: 0,
        modalHeight: 0,
    })
    const modalRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const modal = modalRef.current
        const { top, height } = modal!.getBoundingClientRect()
        setModalOptions({ ...modalOptions as IModalOpts, modalTop: top, modalHeight: height })
    }, [])

    useEffect(() => {
        setDragPercent(getDragPercent())
        if (dragPercent > 70) {
            setDragPercent(0)
            setIsDragging(false)
            setModalOptions({
                diff: 0,
                mousePosY: 0,
                dragStartY: 0,
                modalTop: 0,
                modalHeight: 0,
            })
            toggleUserModal(undefined!)
        }
    }, [modalOptions])

    function onDown(ev: MouseEvent | TouchEvent<HTMLDivElement>) { 
        setIsDragging(true)
        const mousePosY = getClientY(ev)
        setModalOptions((prevOpts: IModalOpts) => ({ ...prevOpts as IModalOpts, dragStartY: mousePosY}))
        setDragPercent(getDragPercent())
    }

    function onDrag(ev: MouseEvent | TouchEvent) {
        if (!isDragging) return
        const mousePosY = getClientY(ev)
        setModalOptions((prevOpts: IModalOpts) => ({ ...prevOpts as IModalOpts, mousePosY, diff: mousePosY - prevOpts.dragStartY }))
    }

    function onUp() {
        setIsDragging(false)
    }

    function getClientY(ev: MouseEvent | TouchEvent) {
        return ev.type?.includes('touch') ? (ev as TouchEvent).targetTouches[0].clientY : (ev as MouseEvent).clientY
    }

    function getDragPercent(diff: number = modalOptions.diff, modalHeight: number = modalOptions.modalHeight) {
        const percent = (diff / modalHeight) * 100

        if (isDragging) return percent > 0 ? percent : 0
        return percent >= 70 ? 110 : percent
    }

    return <div
        ref={modalRef}
        onClick={ev => ev.stopPropagation()}
        onTouchStart={onDown}
        // onMouseDown={onDown}
        onTouchMove={onDrag}
        // onMouseMove={onDrag}
        onTouchEnd={onUp}
        onMouseUp={onUp}
        className="user-modal"
        style={{ transform: `translateY(${dragPercent + '%'}` }} >
        <div className="links-container">
            {/* <Link onClick={toggleUserModal} to={`/profile/${loggedInUserId}`} className="profile modal-item">Profile</Link> */}
        </div>
        <h5 className="logout modal-item" onClick={onLogout}>Logout</h5>
    </div>
}