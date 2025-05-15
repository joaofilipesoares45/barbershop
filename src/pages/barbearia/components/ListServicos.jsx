import { numberForBrl, openModal } from "../../../utils/functions"
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ListServicos({ barber, cartServicos, setCartServicos }) {

    const addServico = (item) => {
        setCartServicos([...cartServicos, item])
        openModal("agendamento")
    }

    return (
        <div className="servicos">
            <div className="list">
                <h2>Tabela de serviços</h2>
                <div className="th"><p>Nome</p> <p>Valor</p> <p>Opcões</p></div>
                {barber.servicos.map((item, index) => {
                    const { nome, valor } = item
                    return (
                        <div className="item" key={"serv" + index}>
                            <h4>{nome}</h4>
                            <p>{numberForBrl(valor)}</p>
                            <nav><FontAwesomeIcon icon={faCalendar} onClick={() => addServico(item)}/></nav>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}