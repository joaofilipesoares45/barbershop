import { useEffect, useContext } from "react"
import { useForm } from "react-hook-form"
import { DataContext } from "../../../context/DataContext"
import { closeModal, formCaptureData, numberForBrl } from "../../../utils/functions"
import { faChevronDown, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const hfun = ["08:00", "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"]

export default function Agendamento({ cartServicos, setCartServicos }) {
    const { agendamentoAtual, setAgendamentoAtual, agendamentos, setAgendamentos } = useContext(DataContext)
    const { register, setValue } = useForm({
        defaultValues: {
            cliente: "",
            data: "",
            hora: "",
        }
    })

    useEffect(() => {
        if (agendamentoAtual) {
            setValue("cliente", agendamentoAtual.cliente)
            setValue("data", agendamentoAtual.data)
            setValue("hora", agendamentoAtual.hora)
            setCartServicos(agendamentoAtual.servicos)
        } else {
            setValue("", "", "", "", "")
            setCartServicos([])
        }
    }, [agendamentoAtual])


    const removeServico = (index) => {
        const newList = cartServicos.filter((_, i) => i !== index)
        setCartServicos(newList)
    }

    const reset = ({ target }) => {
        target.reset()
        closeModal("agendamento")
        setCartServicos([])
        setAgendamentoAtual()
    }

    const submit = (event) => {
        event.preventDefault()
        const { target } = event
        const form = formCaptureData(target)
        form.servicos = cartServicos
        form.barbearia = Number(window.location.hash.split("?=")[1])

        if (localStorage.getItem("barbershop:agendamentos") !== null) {
            localStorage.setItem("barbershop:agendamentos", JSON.stringify([...agendamentos, form]))
        } else {
            localStorage.setItem("barbershop:agendamentos", JSON.stringify([form]))
        }
        setAgendamentos(JSON.parse(localStorage.getItem("barbershop:agendamentos")))
        reset(event)
    }

    const update = (event) => {
        event.preventDefault()
        const { target } = event
        const form = formCaptureData(target)
        form.servicos = cartServicos
        form.barbearia = Number(window.location.hash.split("?=")[1])
        const newList = agendamentos

        newList[agendamentoAtual.id] = Object.assign(newList[agendamentoAtual.id], form)

        localStorage.setItem("barbershop:agendamentos", JSON.stringify(newList))
        setAgendamentos(JSON.parse(localStorage.getItem("barbershop:agendamentos")))
        reset(event)
    }

    return (
        <div className="modal agendamento">
            <div className="content">
                <h2>Novo Agendamento <FontAwesomeIcon icon={faXmark} onClick={({ target }) => reset({ target: target.parentElement.parentElement.querySelector("form") })} /></h2>
                <form onSubmit={(event) => !agendamentoAtual ? submit(event) : update(event)} onReset={reset} autoComplete="off">
                    <div className="inputs">
                        <div>
                            <label htmlFor="cliente">Nome do cliente</label>
                            <input type="text" id="cliente" name="cliente" {...register("cliente")} />
                        </div>
                        <div>
                            <label htmlFor="data">Data</label>
                            <input type="date" id="data" name="data" {...register("data")} />
                        </div>
                        <div>
                            <label htmlFor="hora">Horario</label>
                            <input type="text" id="hora" name="hora" {...register("hora")}
                                onFocus={({ target }) => target.parentElement.querySelector(".options").setAttribute("open", "")}
                                onBlur={({ target }) => setTimeout(() => target.parentElement.querySelector(".options").removeAttribute("open"), 100)} onKeyUp={({ target }) => target.value = ""} />
                            <div className="options">
                                {hfun.map((item, index) => {
                                    return (
                                        <span key={"hr" + index} onClick={({ target }) => {
                                            target.parentElement.parentElement.querySelector("input").value = item
                                            target.parentElement.removeAttribute("open")
                                        }}>{item}</span>
                                    )
                                })}
                            </div>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </div>

                    </div>
                    {cartServicos.length > 0 && <div className="list-servicos">
                        <label htmlFor="">Serviços selecionados</label>
                        {cartServicos.map((item, index) => {
                            const { nome, valor } = item
                            return (
                                <div className="item" key={"serv" + index}>
                                    <h4>{nome}</h4>
                                    <p>{numberForBrl(valor)}</p>
                                    <nav><FontAwesomeIcon icon={faTrash} onClick={() => removeServico(index)} /></nav>
                                </div>
                            )
                        })}
                    </div>}
                    <nav>
                        <button type="reset">Cancelar</button>
                        <button type="submit">Confirmar</button>
                    </nav>
                </form>
            </div>
        </div>
    )

}