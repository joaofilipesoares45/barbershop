import { useContext, useState } from "react"
import { DataContext } from "../../context/DataContext"
import { faBars, faScissors } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./css/index.css"
import Sidebar from "./components/Sidebar";
import { openModal } from "../../utils/functions";
import ListServicos from "./components/ListServicos";
import Agendamento from "./components/Agendamento";

export default function BarberPage() {
    const { listBarbearias } = useContext(DataContext)
    const [barber, setBarber] = useState(listBarbearias[Number(window.location.hash.split("?=")[1])])
    const [cartServicos, setCartServicos] = useState([])

    return (
        <div className="page barber-page">
            <header>
                <h1 onClick={() => setBarber()}>{barber.nome}</h1>
                <div className="options">
                    <FontAwesomeIcon icon={faBars} onClick={() => openModal('sidebar')} />
                </div>
            </header>
            <main>
                <div className="banner">
                    <div className="info">
                        <div className="img">
                            <FontAwesomeIcon icon={faScissors} />
                            <h2>Imagem da sua barbearia</h2>
                        </div>
                        <div className="declare">
                            <h3>{barber.nome}</h3>
                            <h4>Horario de funcionamento: <span>manhã - 08:00 às 12:00 <br /> tarde  - 14:00 às 20:00</span></h4>
                            <button onClick={() => openModal("agendamento")}>Fazer agendamento</button>
                        </div>
                    </div>
                    <div className="img">
                        <FontAwesomeIcon icon={faScissors} />
                        <h2>Imagem da sua barbearia</h2>
                    </div>
                </div>
                <ListServicos barber={barber} cartServicos={cartServicos} setCartServicos={setCartServicos}/>
            </main>
            <Sidebar />
            <Agendamento cartServicos={cartServicos} setCartServicos={setCartServicos}/>
        </div>
    )
}