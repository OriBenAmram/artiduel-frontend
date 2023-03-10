import { IoIosArrowUp, IoIosArrowDown, IoMdColorPalette } from 'react-icons/io'
import { BsFillPencilFill, BsFillEraserFill } from 'react-icons/bs'


interface PlayerToolbarProps {
    clearCanvas: () => void
    isToolBarOpen: boolean
    setToolBar: any
    brushRef: Record<'color' | 'width', string | number>
    drawSettingsRef : ({ isDraw: boolean, isDrag: boolean, isErase: boolean, })
}

export function PlayerToolbar({ clearCanvas, isToolBarOpen, setToolBar, brushRef, drawSettingsRef }: PlayerToolbarProps) {

    const handleBrushChange = ({ target }: any) => {
        const { value, name: field }: { value: string | number, name: 'color' | 'width' } = target
        brushRef[field] = (typeof value === 'number') ? +value : value
    }

    const handleSettingsChange = (setting : string) => {
        switch(setting) { 
            case 'eraser': 
            drawSettingsRef.isErase = true
        }
    }

    return <div className={`player-tool-bar ${isToolBarOpen ? 'open' : ''}`}>
        <div className="toggle-arrow-btn" onClick={() => setToolBar((prevState: boolean) => !prevState)}>
            <div className="icon">{isToolBarOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</div>
        </div>
        {isToolBarOpen && <div className="settings-container">
            <div className="btns-container">
                <BsFillPencilFill title='puncil'/>
                <BsFillEraserFill name='eraser' title='eraser' onChange={() => handleSettingsChange('eraser')}/>
                <div className="color-pallete" title='color pallete'>
                    <input type="color" name="color" onChange={handleBrushChange} />
                    <IoMdColorPalette />
                </div>
            </div>
            <div>
                <button onClick={clearCanvas}>Clear</button>
            </div>
        </div>}
    </div>
}