import { useContext } from "react"
import { DataContext } from "../../../context/DataContext"
import { dateFormat, numberForBrl, openModal } from "../../../utils/functions"
import { faPencil, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ListAgendamentos() {
    const { agendamentos, setAgendamentos, setAgendamentoAtual } = useContext(DataContext)

    const remove = (index) => {
        const newList = agendamentos.filter((_, i) => i !== index)
        setAgendamentos(newList)
        localStorage.setItem("barbershop:agendamentos", JSON.stringify(newList))
    }

    return (
        <div className="list-agendamentos">
            <h2>Agendamentos</h2>
            <div className="list">
                {agendamentos.map((item, index) => {
                    const { data, hora, servicos } = item
                    item.id = index
                    return (
                        <div className="item" key={"ag" + index} >
                            <div className="info">
                                <h4>
                                    {dateFormat(data)} - {hora}
                                    <p>
                                        <FontAwesomeIcon icon={faPencil} onClick={() => { setAgendamentoAtual(item); openModal("agendamento") }} />
                                        <FontAwesomeIcon icon={faTrashAlt} onClick={() => remove(index)} />
                                    </p>
                                </h4>
                                {servicos.length > 0 &&
                                    <span>{servicos[0].nome}  <p>{numberForBrl(servicos[0].valor)}</p></span>
                                }
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}