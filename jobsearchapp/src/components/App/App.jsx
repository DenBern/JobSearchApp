import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { FavoritesContextProvider, MainContextProvider, VacancyDetailsContextProvider } from '../../Context';

import { Header } from '../Header/Header';

import './App.css';

export const App = () => {
    return (
        <>
            <Router>
                <Header />
                    <main>
                        <Routes>
                            <Route path="*" element={<MainContextProvider/>}/>
                            <Route path="/:id" element={<VacancyDetailsContextProvider/>}/>
                            <Route path="/favorites" element={<FavoritesContextProvider/>}/>
                        </Routes>
                    </main>
            </Router>
        </>
    )
}

