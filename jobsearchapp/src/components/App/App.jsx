import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import { Header } from '../Header/Header';
import { VacancyDetails } from '../pages/VacancyDetails/VacancyDetails';
import { FavoritesContextProvider, MainContextProvider } from '../../Context';

import './App.css';

export const App = () => {
    return (
        <>
            <Router>
                <Header />
                    <main>
                        <Routes>
                            <Route path="*" element={<MainContextProvider/>}/>
                            <Route path="/:id" element={<VacancyDetails/>}/>
                            <Route path="/favorite" element={<FavoritesContextProvider/>}/>
                        </Routes>
                    </main>
            </Router>
        </>
    )
}

