import { faScissors, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { closeModal, formCaptureData, numberForBrl } from "../../../utils/functions";
import { useContext, useRef } from "react";
import { DataContext } from "../../../context/DataContext";
import NotificationBtn from "../../../Classes/NotificationBtn";
import InputCalendario from "../../../components/InputCalendario";

export default function FormAgendamento() {
    const { newNotification } = useContext(DataContext)

    const form = useRef(null)

    const submit = (event) => {
        event.preventDefault()
        const data = formCaptureData(form.current)
        data.corte = form.current.querySelector(".haircut span").textContent
        console.log(data);

        newNotification(3, "Sucesso", "Agendamento concluído!", [new NotificationBtn({
            text: "Prosseguir", tag: "button", fun: "close", color: "rgb(133,64,17)"
        })])
    }
    const removeHaircut = () => {
        console.log("trash");
    }

    return (
        <div className="modal form-agendamento flex items-center justify-center bg-[rgba(0,0,0,0.55)] px-[15px]">
            <div className="bg-[rgb(104,25,1)] text-white w-full max-w-[600px] p-2.5 rounded-sm shadow-2xs ">
                <h2 className="flex items-center justify-between font-bold">Novo agendamento <FontAwesomeIcon icon={faXmark} onClick={() => {closeModal("form-agendamento"); form.current.reset()}}/></h2>
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
                            <InputCalendario cl={"input-calendario"} style={"bg-white rounded-[2px] text-black p-[4px_6px] w-full"}/>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="hora" className="text-[.8rem] font-medium opacity-70">Horário</label>
                            <input type="time" id="hora" name="hora" className="bg-white rounded-[2px] text-black p-[4px_6px] w-full" />
                        </div>
                    </div>

                    <div className="haircut bg-[rgb(255,255,255)] p-1.5 mb-[15px] rounded-[3px]">
                        <h3 className="text-sm flex items-end justify-between text-[rgb(69,28,0)]">Escolher corte
                            <button type="button" className="text-[.8rem] p-[3px_10px] text-[rgb(255,197,168)] bg-[rgb(104,25,1)]">Ver opções
                                <FontAwesomeIcon icon={faScissors} className="rotate-180" />
                            </button>
                        </h3>
                        <hr className="border-b-2 border-amber-600 my-[5px]" />
                        <p className="text-[.8rem] text-[rgb(69,28,0)] mb-2.5">Serviços adicionados:</p>
                        <div className="flex flex-wrap gap-2.5 max-h-[300px] overflow-y-auto">
                            <span className="bg-[rgb(123,48,11)] text-[.7rem] p-1.5 rounded-[3px] hover:[&>svg]:opacity-100 hover:[&>svg]:pointer-events-auto relative flex items-center justify-center overflow-hidden">
                                Degradê
                                <FontAwesomeIcon icon={faTrash} className="opacity-0 pointer-events-none transition-all absolute p-[100%] bg-[rgba(0,0,0,0.55)]" onClick={removeHaircut} />
                            </span>
                        </div>

                        <p className="text-red-950 mt-2.5 font-bold text-sm text-end">Total = {numberForBrl(30)}</p>
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