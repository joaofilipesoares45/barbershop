import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { DataContext } from "../../../context/DataContext";
import "../css/BarberList.css";

export default function BarberList() {
    const { listBarbearias } = useContext(DataContext)
    const navigate = useNavigate()

    const goToBarber = (index) => {
        navigate(`barbearia?=${index}` )
    }

    return (
        <div className="barber-list" id="barber-list">
            <form className="search-barber">
                <div>
                    <input type="text" placeholder="Buscar barbearia..." />
                    <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                </div>
            </form>
            <h2>Barbearias parceiras:</h2>
            <div className="list">
                {listBarbearias.map((item, index) => {
                    const { nome, servicos } = item
                    return (
                        <div className="item" key={"barber" + index} onClick={() => goToBarber(index)}>
                            <img src="/barbershop/logo-img.jpg" alt="" />
                            <div className="info">
                                <h4>{nome}</h4>
                                <p>{servicos[0].nome}{servicos[1] && ", " + servicos[1].nome}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}