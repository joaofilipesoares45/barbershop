import { faBars, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { numberForBrl } from "../../utils/functions";

export default function Home() {
    return (
        <div className="page home">
            <header className="flex justify-between items-center p-3 px-4 bg-amber-950 text-orange-300 dark:bg-white dark:text-amber-950">
                <FontAwesomeIcon icon={faBars} className="text-2xl" />
                <h1 className="text-xl font-bold">Barbearia Real</h1>
                <nav>
                    <button className="text-sm p-1.5 hover:bg-amber-500 hover:text-amber-950">Agendar</button>
                </nav>
            </header>
            <main className="flex- h-[calc(100%_-_56px)] w-full relative bg-[url(/banner.jpg)] bg-cover overflow-hidden">
                <div className="h-full flex flex-col justify-between bg-[rgba(0,0,0,0.57)]">
                    <div className="flex items-center sm:p-[10px_50px] p-[10px] mt-30">
                        <div className="bg-[#dfb379] text-black w-full max-w-[450px] p-10 rounded-sm">
                            <h2 className="text-4xl font-bold mb-1.5 pb-1.5 border-b-3 border-amber-950">Barbearia Real</h2>
                            <div className="flex flex-col font-semibold">
                                <p>Horario de funcionamento</p>
                                <span>manhã - 08:00 ás 12:00</span>
                                <span>tarde - 14:00 ás 20:00</span>
                            </div>
                            <button className="justify-center w-full p-[10px] mt-4 bg-amber-950 text-red-50 hover:bg-amber-900">Agendar horario</button>
                        </div>
                    </div>
                    <div className="flex flex-col p-5 bg-amber-950 text-orange-300 m-2.5 rounded-sm">
                        <h2 className="text-2xl font-bold mb-6 pb-3 border-b-3 border-orange-300">Tabela de serviços</h2>
                        <div className="flex flex-col w-full max-w-[500px] gap-2">
                            <div className="grid grid-cols-3">
                                <span className="text-center">Nome</span>
                                <span className="text-center">Valor</span>
                                <span className="text-center">Opções</span>
                            </div>
                            <div className="grid grid-cols-3">
                                <span className="text-center">Corte Social</span>
                                <span className="text-center">{numberForBrl(25)}</span>
                                <span className="flex justify-center"><FontAwesomeIcon icon={faCalendar} /></span>
                            </div>
                            <div className="grid grid-cols-3">
                                <span className="text-center">Degradê</span>
                                <span className="text-center">{numberForBrl(30)}</span>
                                <span className="flex justify-center"><FontAwesomeIcon icon={faCalendar} /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}