import { createContext, useState } from "react";
import { openModal } from "../utils/functions";

export const DataContext = createContext();

// const getData = async (ref, set) => {
//     const res = await getDocs(ref);
//     set(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
// }

const cortes = [
    { nome: "Corte Social", valor: 25 },
    { nome: "Degradê", valor: 30 }
]

export function DataProvider({ children }) {
    const [usuarioAtual, setUsuarioAtual] = useState()
    const [notification, setNotification] = useState()
    const [colorMode, setColorMode] = useState(true)
    const [haircut, setHaircut] = useState()
    const [listCuts, setListCuts] = useState(cortes)

    const newNotification = (type, title, text, options) => {
        setNotification({ type, title, text, options })
        openModal('notification')
    }

    const value = {
        colorMode,
        setColorMode,
        usuarioAtual,
        setUsuarioAtual,
        notification,
        setNotification,
        newNotification,
        haircut, 
        setHaircut,
        listCuts, 
        setListCuts,
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}