import { faScissors, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { closeModal, dateFormat, formCaptureData, numberForBrl } from "../../../utils/functions";
import { useContext, useRef, useState } from "react";
import { DataContext } from "../../../context/DataContext";
import NotificationBtn from "../../../Classes/NotificationBtn";
import InputCalendario from "../../../components/InputCalendario";
import InputHorario from "../../../components/InputHorario";
import Sidebar from "../../../components/Sidebar";

const listFun = ["08:00", "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"]
export default function FormAgendamento() {
    const { newNotification, listCuts, haircut, setHaircut, agendamentos, setAgendamentos } = useContext(DataContext)

    const [funcionamento, setFuncionamento] = useState(listFun)
    const form = useRef(null)

    const submit = (event) => {
        event.preventDefault()
        const data = formCaptureData(form.current)
        data.corte = haircut

        if (!data.nome || !data.data || !data.hora) {
            return
        }

        newNotification(3, "Sucesso", `Seu agendamento está marcado para o dia: ${dateFormat(data.data)} ás ${data.hora} horas`, [new NotificationBtn({
            text: "Prosseguir", tag: "button", fun: () => {
                form.current.reset()
                setHaircut()
                closeModal("form-agendamento")
            }, color: "rgb(255, 100, 0)"
        })])

        localStorage.setItem("barbershop:agendamentos", JSON.stringify([...agendamentos, data]))
        setAgendamentos([...agendamentos, data])
        setFuncionamento(listFun)
    }

    const checkDay = () => {
        const inputData = form.current.querySelector("input[type=date]").value
        const list = agendamentos.filter((item) => item.data === inputData)
        if (list.length > 0) {
            let fun = funcionamento
            list.forEach(element => {
                fun = fun.filter((hora) => hora !== element.hora)
            });
            setFuncionamento(fun);
        } else {
            setFuncionamento(listFun);
        }
    }

    return (
        <div className="modal form-agendamento flex items-center justify-center bg-[rgba(0,0,0,0.55)] px-[15px] [[open]]:[&>div]:animate-[var(--show-top)]">
            <div className="bg-[rgb(104,25,1)] text-white w-full max-w-[600px] p-2.5 rounded-sm shadow-2xs">
                <h2 className="flex items-center justify-between font-bold">Novo agendamento <FontAwesomeIcon icon={faXmark} onClick={() => { closeModal("form-agendamento"); form.current.reset(); setHaircut(); setFuncionamento(listFun) }} /></h2>
                <hr className="border-b-2 my-1.5" />
                <form onSubmit={submit} ref={form} autoComplete="off">
                    <h3 className="text-[.7rem] mt-3 text-end font-semibold">Preencha os dados abaixo!</h3>

                    <div className="inputs mb-5 gap-3 grid grid-cols-2">
                        <div className="flex flex-col col-span-2">
                            <label htmlFor="nome" className="text-[.8rem] font-medium opacity-70">Nome</label>
                            <input type="text" id="nome" name="nome" className="bg-white rounded-[2px] text-black p-[4px_6px] text-[.9rem]" />
                        </div>
                        <div className="flex flex-col relative">
                            <label htmlFor="data" className="text-[.8rem] font-medium opacity-70">Data</label>
                            <InputCalendario cl={"input-calendario"} style={"bg-white rounded-[2px] text-black p-[4px_6px] w-full"} change={checkDay} />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="hora" className="text-[.8rem] font-medium opacity-70">Horário</label>
                            <InputHorario cl={"input-horario"} style={"bg-white rounded-[2px] text-black p-[4px_6px] w-full"} list={funcionamento} />
                        </div>
                    </div>

                    <div className="haircut bg-[rgb(255,255,255)] p-1.5 mb-[15px] rounded-[3px]">
                        <h3 className="text-sm flex items-center justify-between text-[rgb(69,28,0)]">Escolher corte
                            <Sidebar cl={"list-cuts"} title={"Lista de Cortes"} side={"left"} link={
                                <button type="button" className="text-[.8rem] p-[3px_10px] text-[rgb(255,197,168)] bg-[rgb(104,25,1)]">Ver opções
                                    <FontAwesomeIcon icon={faScissors} />
                                </button>
                            }>
                                <div className="flex flex-col gap-2">
                                    {listCuts.map((item, index) => {
                                        return (
                                            <div className="cursor-pointer hover:bg-[gainsboro] p-2 transition-all rounded-sm" key={"cut" + index} onClick={() => { setHaircut(item); closeModal("list-cuts") }}>
                                                <h4>{item.nome}</h4>
                                                <span>{numberForBrl(item.valor)}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </Sidebar>

                        </h3>
                        {haircut &&
                            <>
                                <hr className="border-b-2 border-amber-600 my-[5px]" />
                                <p className="text-[.8rem] text-[rgb(69,28,0)] mb-2.5">Serviços adicionados:</p>
                                <div className="flex flex-wrap gap-2.5 max-h-[300px] overflow-y-auto">
                                    <span className="bg-[rgb(123,48,11)] text-[.7rem] p-1.5 rounded-[3px] hover:[&>svg]:opacity-100 hover:[&>svg]:pointer-events-auto relative flex items-center justify-center overflow-hidden">
                                        {haircut.nome}
                                        <FontAwesomeIcon icon={faTrash} className="opacity-0 pointer-events-none transition-all absolute p-[100%] bg-[rgba(0,0,0,0.55)]" onClick={() => setHaircut()} />
                                    </span>
                                </div>
                                <p className="text-red-950 mt-2.5 font-bold text-sm text-end">Total = {numberForBrl(haircut.valor)}</p>
                            </>
                        }
                    </div>

                    <nav className="flex justify-end gap-1">
                        <button type="submit" className="text-[.9rem] p-2 bg-white text-[rgb(133,64,17)] hover:bg-[rgba(0,0,0,.2)]! transition-colors">Confirmar</button>
                    </nav>
                </form>
            </div>
        </div>
    )
}
"bg-[rgb(133,64,17)]"