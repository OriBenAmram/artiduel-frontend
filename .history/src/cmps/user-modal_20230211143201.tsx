import { MouseEventHandler, useState, useEffect, useRef, TouchEventHandler } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectedUser } from "../store/store"
import { IModalOpts } from "../interfaces/IModalOpts"

interface UserModalProps {
    onLogout: MouseEventHandler<HTMLHeadingElement>
    toggleUserModal: MouseEventHandler<HTMLAnchorElement>
}

export function UserModal({ onLogout, toggleUserModal }: UserModalProps) {

    const loggedInUserId = useSelector(selectedUser)?._id
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [modalOptions, setModalOptions] = useState<IModalOpts>({
        diff: 0,
        mousePosY: 0,
        dragStartY: 0,
        modalTop: 0,
        modalHeight: 0,
        dragPercent: 0
    })
    const modalRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const modal = modalRef.current
        const { top, height } = modal!.getBoundingClientRect()
        setModalOptions({ ...modalOptions as IModalOpts, modalTop: top, modalHeight: height })
    }, [])

    useEffect(() => {
        if (modalOptions.dragPercent > 100) toggleUserModal()
    }, [modalOptions])

    function onDown(ev: MouseEventHandler | TouchEventHandler) {
        setIsDragging(true)
        const clientY = getClientY(ev)
        setModalOptions({ ...modalOptions as IModalOpts, diff: 0, dragStartY: clientY, dragPercent: 0 })
    }

    function onDrag(ev: MouseEventHandler | TouchEventHandler) {
        if (!isDragging) return
        const mousePosY = getClientY(ev)
        const dragPercent = getDragPercent()
        setModalOptions((prevOpts: IModalOpts) => ({ ...prevOpts as IModalOpts, mousePosY, diff: mousePosY - prevOpts.dragStartY, dragPercent }))
    }

    function onUp() {
        setIsDragging(false)
    }

    function getClientY(ev: MouseEventHandler | TouchEventHandler) {
        console.log('ev', ev)
        return ev.clientY
        // return ev.type?.includes('touch') ? ev.targetTouches[0].clientY : ev.clientY
    }

    function getDragPercent() {
        const { diff, modalHeight } = modalOptions
        const percent = (diff / modalHeight) * 100
        if (isDragging) return percent > 0 ? percent : 0
        return percent >= 50 ? 110 : 0
    }

    return <div
        ref={modalRef}
        onClick={ev => ev.stopPropagation()}
        onTouchStart={onDown}
        onMouseDown={onDown}
        onTouchMove={onDrag}
        onMouseMove={onDrag}
        onTouchEnd={onUp}
        onMouseUp={onUp}
        className="user-modal"
        style={{ transform: `translateY(${modalOptions.dragPercent + '%'}` }} >
        <div className="links-container">
            <Link onClick={toggleUserModal} to={`/profile/${loggedInUserId}`} className="profile modal-item">Profile</Link>
        </div>
        <h5 className="logout modal-item" onClick={onLogout}>Logout</h5>
    </div>
}