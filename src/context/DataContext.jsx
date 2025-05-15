import { createContext, useState, useEffect } from "react";
import { openModal } from "../utils/functions";

export const DataContext = createContext();

// const getData = async (ref, set) => {
//     const res = await getDocs(ref);
//     set(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
// }

export function DataProvider({ children }) {
    const [usuarioAtual, setUsuarioAtual] = useState()
    const [notification, setNotification] = useState()
    const [colorMode, setColorMode] = useState(true)
    const [listBarbearias, setListBarbearias] = useState([
        {
            nome: "Barbearia teste",
            servicos: [
                { nome: "Corte social", valor: 25 },
                { nome: "Degradê", valor: 25 }
            ]
        },
        {
            nome: "Barbearia teste",
            servicos: [
                { nome: "Corte social", valor: 25 }
            ]
        },
        {
            nome: "Barbearia teste",
            servicos: [
                { nome: "Corte social", valor: 25 }
            ]
        }
    ])
    const [agendamentoAtual, setAgendamentoAtual] = useState()
    const [agendamentos, setAgendamentos] = useState([])

    const newNotification = (type, title, text, options) => {
        setNotification({ type, title, text, options })
        openModal('notification')
    }

    useEffect(() => {
        if (localStorage.getItem("barbershop:agendamentos") !== null) {
            setAgendamentos(JSON.parse(localStorage.getItem("barbershop:agendamentos")))
        }
    }, [])

    const value = {
        colorMode,
        setColorMode,
        usuarioAtual,
        setUsuarioAtual,
        notification,
        setNotification,
        newNotification,
        listBarbearias,
        setListBarbearias,
        agendamentoAtual,
        setAgendamentoAtual,
        agendamentos, 
        setAgendamentos
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}