import { useRef, useState } from "react";
import styles from "./InputHorario.module.css"

export default function InputHorario({ cl, style, list }) {

    const hourInput = useRef(null)
    const [isOpen, setIsOpen] = useState()

    return (
        <div className={styles.datetime}>
            <input type="time" id="hora" name="hora" className={style} onKeyDown={(e) => e.preventDefault()} onFocus={(e) => { e.preventDefault(); setIsOpen(true) }} onBlur={() => setTimeout(() => setIsOpen(), [100])} ref={hourInput} />
            <div className={`${cl} ${styles.modal}`}>
                {isOpen && <div className={`${styles.content} content`}>
                    {list.map(hora => {
                        return (
                            <span key={hora} onClick={() =>{ hourInput.current.value = hora; setIsOpen()}}>{hora}</span>
                        )
                    })}
                </div>}
            </div>
        </div>
    )
}