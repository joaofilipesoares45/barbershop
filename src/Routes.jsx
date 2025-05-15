import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import AdminPage from './pages/admin'
import LogPage from './pages/log'
import BarberPage from './pages/barbearia'

export default function RouterApp() {
    return (
        <HashRouter basename='/'>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path={'/login'} element={<LogPage/>} />
                <Route path={'/admin'} element={<AdminPage />} />

                <Route path={'/barbearia'} element={<BarberPage />} />
            </Routes>
        </HashRouter>
    )
}