import { closeModal } from "../../../utils/functions";
import ListAgendamentos from "./ListAgendamentos";

export default function Sidebar() {
    return (
        <div className="modal sidebar" onClick={({target}) => target.classList[1] === "sidebar" && closeModal("sidebar")}>
            <div className="content">
                <nav>
                    <div className="buttons"></div>
                    <ListAgendamentos />
                </nav>
            </div>
        </div>
    )
}