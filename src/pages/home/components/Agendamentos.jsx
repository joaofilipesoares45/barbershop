import { useContext } from "react";
import { DataContext } from "../../../context/DataContext";
import Sidebar from "../../../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { closeModal, dateFormat, openModal } from "../../../utils/functions";
import NotificationBtn from "../../../Classes/NotificationBtn";

export default function Agendamentos() {
    const { agendamentos, setAgendamentos, newNotification } = useContext(DataContext)

    const deleteAgendamento = (index) => {
        newNotification(3, "Excluir reserva", `Quer mesmo excluir esse agendamento?`, [new NotificationBtn({
            text: "Confirmar", tag: "button", fun: () => {
                let list = agendamentos
                list = list.filter((_, i) => i !== index)
                setAgendamentos(list)
                localStorage.setItem("barbershop:agendamentos", JSON.stringify(list))
            }, color: "red"
        })])

    }

    return (
        <Sidebar title={<h1>Agendamentos</h1>} link={<FontAwesomeIcon icon={faBars} className="text-2xl" />} cl={"sb-agendamentos"} side={"left"}>
            <div className="flex flex-col text-black gap-1.5">
                {agendamentos.length > 0 ? agendamentos.map((item, index) => {
                    return (
                        <div key={"ag" + index} className="flex flex-col bg-gray-200 hover:bg-gray-500 hover:text-white p-2.5 rounded-sm cursor-pointer shadow-sm transition-all">
                            <span className="flex justify-between">{item.corte.nome} <FontAwesomeIcon icon={faTrashAlt} className="transition-none!" onClick={() => deleteAgendamento(index)} /></span>
                            <hr className="border-white border-b-[2.5px] my-1 rounded-full" />
                            {dateFormat(item.data)} - {item.hora}
                        </div>
                    )
                }) : <p className="flex flex-col items-center text-sm text-center mt-[50px] font-semibold">
                    Você não tem nenhum agendamento!
                    <span className="text-[.8rem] hover:underline w-min text-nowrap cursor-pointer font-normal" onClick={() => { closeModal(); openModal("form-agendamento") }}>Novo agendamento</span>
                </p>}
            </div>
        </Sidebar>
    )
}