import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./Sidebar.module.css"
import { closeModal, openModal } from "../utils/functions"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

export default function Sidebar({ children, link, side, cl, title }) {
    return (
        <div className={`${styles.sidebar} base-sidebar`}>
            <div onClick={() => openModal(cl)} >
                {link}
            </div>
            <div className={`modal ${styles.modal} ${cl}`} side={side} onClick={({ target }) => {
                if (target.classList[1] === styles.modal) {
                    closeModal(cl)
                }
            }}>
                <div className={`${styles.content} content`} >
                    <div className={styles.head + " text-black"} hastitle={title ? "true" : "false"}>
                        {title}
                        <FontAwesomeIcon icon={faXmark} onClick={() => closeModal(cl)} className={styles.close} />
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}