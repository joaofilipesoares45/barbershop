import { } from "@fortawesome/free-brands-svg-icons";
import { faBars, faMagnifyingGlass, faMoon, faScissors, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./css/index.css"
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { baseUrl } from "../../utils/functions";
import BarberList from "./components/BarberList";

export default function Home() {
    const { colorMode, setColorMode } = useContext(DataContext)

    const changeColorMode = () => {
        if (colorMode === true) {
            setColorMode(false)
            localStorage.setItem("barbershop:colormode", JSON.stringify(false))
        } else {
            setColorMode(true)
            localStorage.setItem("barbershop:colormode", JSON.stringify(true))
        }
    }

    const goTo = (e) => {
        e.preventDefault()

        const { target } = e

        if (target.tagName === "A" || target.tagName === "svg" || target.tagName === "BUTTON") {
            const element = document.querySelector(target.getAttribute("href"))
            document.querySelector(".page.home").scrollTo(0, (element.offsetTop))
        }
    }

    return (
        <div className="page home" colorMode={String(colorMode)}>
            <header>
                <FontAwesomeIcon icon={faBars} />
                <a href="/"><FontAwesomeIcon icon={faScissors} /> Barbershop</a>

                <nav className="options">
                    <button className="log-btn">
                        <a href={baseUrl + "/login"}>Login</a>
                    </button>
                    <FontAwesomeIcon icon={colorMode === true ? faSun : faMoon} onClick={changeColorMode} />
                </nav>
            </header>
            <main>
                <div className="banner">
                    <div className="info">
                        <h1>Olá, <p>Bem vindo ao Barbershop</p> </h1>
                        <span>Encontre os melhores barbeiros na sua região!</span>
                        <button onClick={goTo} href={"#barber-list"}>Buscar Barbearia <FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                    </div>
                </div>

                <BarberList/>
            </main>
            <div className="modal user-data">

            </div>
        </div>
    )
}