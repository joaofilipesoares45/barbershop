import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./InputCalendario.module.css"
import { closeModal, getCalendar, openModal } from "../utils/functions"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useRef, useState } from "react"
const meses = [
    "janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
];

export default function InputCalendario({ cl, style, change }) {

    const [position, setPosition] = useState()

    const currDate = new Date()
    const [year, setYear] = useState(2025)
    const [month, setMonth] = useState(currDate.getMonth())
    const [daysOfMonth, setDaysOfMonth] = useState([])

    const selectMonth = useRef(null)
    const dateInput = useRef(null)

    useEffect(() => {
        setDaysOfMonth(getCalendar(month, year))
    }, [year, month])

    return (
        <div>
            <input type="date" id="data" name="data" className={style} onKeyDown={(e) => e.preventDefault()} onClick={(e) => {e.preventDefault(); openModal(cl)}} ref={dateInput} />
            <div className={`modal ${styles.modal} ${cl}`} onClick={({ target }) => {
                if (target.classList[1] === styles.modal) {
                    closeModal(cl)
                }
            }}>
                <div className={`${styles.content} content`}>
                    <div className={styles.head}>
                        <h4 onClick={() => selectMonth.current.setAttribute("open", "")}>{meses[month]}</h4>
                        <span><FontAwesomeIcon icon={faChevronLeft} onClick={() => setYear(year - 1)} /> {year} <FontAwesomeIcon icon={faChevronRight} onClick={() => setYear(year + 1)} /></span>
                    </div>
                    <div className={styles.week}>
                        <span>Dom</span>
                        <span>Seg</span>
                        <span>Ter</span>
                        <span>Qua</span>
                        <span>Qui</span>
                        <span>Sex</span>
                        <span>Sab</span>
                    </div>
                    <div className={styles.days} onTouchStart={(event) => setPosition(event.touches[0].clientX)} onTouchEnd={(event) => {
                        if (event.changedTouches[0].clientX < position - 80) {
                            if (month < 11) {
                                setMonth(month + 1)
                            } else {
                                setMonth(0)
                            }

                        } else if (event.changedTouches[0].clientX > position + 80) {
                            if (month > 0) {
                                setMonth(month - 1)
                            } else {
                                setMonth(11)
                            }
                        }
                    }}>
                        {daysOfMonth.map((item, index) => {
                            return (
                                <div visible={item.active} key={item.attr || index} curr-date={item.class} style={{ animationDelay: `${(index * 3) / 1000}s` }}>
                                    <p onClick={(e) => {
                                        const { target } = e
                                        document.querySelectorAll(`.${styles.days} div[visible]`).forEach(el => el.removeAttribute("selected"))
                                        target.parentElement.setAttribute("selected", "")
                                        dateInput.current.value = item.attr
                                        closeModal(cl)
                                        change()
                                    }}>{item.txt}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className={styles.setmonth} ref={selectMonth}>
                        {meses.map((el, index) => {
                            return (
                                <div key={"mon" + el}>
                                    <span onClick={() => { setMonth(index); selectMonth.current.removeAttribute("open") }}>{el}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}