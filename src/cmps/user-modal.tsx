import { MouseEventHandler, useState, useEffect, useRef, TouchEventHandler, TouchEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectedUser } from "../store/store"
import { IModalOpts } from "../model/interfaces/IModalOpts"

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
    const navigate = useNavigate()

    useEffect(() => {
        const modal = modalRef.current
        const { top, height } = modal!.getBoundingClientRect()
        setModalOptions({ ...modalOptions as IModalOpts, modalTop: top, modalHeight: height })
    }, [])

    useEffect(() => {
        if (dragPercent > 80) {
            resetModal()
            toggleUserModal(null!)
        }
    }, [dragPercent])

    function onDown(ev: MouseEvent | TouchEvent<HTMLDivElement>) {
        setIsDragging(true)
        const mousePosY = getClientY(ev)
        setDragPercent(getDragPercent())
        console.log('DOWN - getDragPercent', getDragPercent())
        setModalOptions((prevOpts: IModalOpts) => ({ ...prevOpts as IModalOpts, dragStartY: mousePosY }))
    }

    function onDrag(ev: MouseEvent | TouchEvent) {
        if (!isDragging) return
        const mousePosY = getClientY(ev)
        setModalOptions((prevOpts: IModalOpts) => ({ ...prevOpts as IModalOpts, mousePosY, diff: mousePosY - prevOpts.dragStartY }))
        setDragPercent(getDragPercent())
        console.log('DRAG - getDragPercent', getDragPercent())
        console.log('diff', modalOptions.diff)
        console.log('height', modalOptions.modalHeight)

    }

    function onUp() {
        setIsDragging(false)
        setDragPercent(0)
    }

    function getClientY(ev: MouseEvent | TouchEvent) {
        return ev.type?.includes('touch') ? (ev as TouchEvent).targetTouches[0].clientY : (ev as MouseEvent).clientY
    }

    function getDragPercent() {
        const { diff, modalHeight } = modalOptions
        const percent = (diff / modalHeight) * 100
        return percent > 0 ? percent : 0
    }

    function resetModal() {
        setModalOptions({
            diff: 0,
            mousePosY: 0,
            dragStartY: 0,
            modalTop: 0,
            modalHeight: 0,
        })
        setDragPercent(0)
        setIsDragging(false)
    }

    function onProfileNavigate() {
        toggleUserModal(null!)
        navigate(`/profile/${loggedInUserId}`)
    }

    return <div
        ref={modalRef}
        onClick={ev => ev.stopPropagation()}
        onTouchStart={onDown}
        onTouchMove={onDrag}
        onTouchEnd={onUp}
        onMouseUp={onUp}
        className="user-modal"
        style={dragPercent ? { transform: `translateY(${dragPercent + '%'}` } : {}} >
        {/* style={{ transform: `translateY(${dragPercent + '%'}` }} > */}
        <div className="links-container">
            <button onClick={onProfileNavigate} className="profile modal-item">Profile</button>
        </div>
        <h5 className="logout modal-item" onClick={onLogout}>Logout</h5>
    </div>
}