import { IoMdColorPalette } from 'react-icons/io'
import { BsFillPencilFill, BsFillEraserFill } from 'react-icons/bs'


interface PlayerToolbarProps {
    clearCanvas: () => void
    brushRef: Record<'color' | 'width', string | number>
    drawSettingsRef: ({ isDraw: boolean, isDrag: boolean, isErase: boolean, })
}

type inputProperties = { value: string | number, name: 'color' | 'width' }

export function PlayerToolbar({ clearCanvas, brushRef, drawSettingsRef }: PlayerToolbarProps) {

    const handleBrushChange = ({ target }: any) => {
        const { value, name: field }: inputProperties = target
        brushRef[field] = (typeof value === 'number') ? +value : value
    }

    const handleSettingsChange = (setting: string) => {
        switch (setting) {
            case 'eraser':
                drawSettingsRef.isDraw = false
                drawSettingsRef.isErase = true
                break
            case 'pencil':
                drawSettingsRef.isDraw = true
                drawSettingsRef.isErase = false
                break
            default:
                drawSettingsRef.isDraw = true
                drawSettingsRef.isErase = false

        }
    }

    return <div className="player-toolbar">
        <div className="settings-container">
            <div className="btns-container">
                <BsFillPencilFill title='pencil' className="icon" onClick={() => handleSettingsChange('pencil')} />
                <BsFillEraserFill name='eraser' title='eraser' className="icon" onClick={() => handleSettingsChange('eraser')} />
                <div className="color-pallete" title='color pallete'>
                    <IoMdColorPalette className="icon" />
                    <input type="color" name="color" onChange={(ev) => handleBrushChange(ev)} />
                </div>
            </div>
            <button className="clear-btn" onClick={clearCanvas}>Clear</button>
        </div>
    </div>
}