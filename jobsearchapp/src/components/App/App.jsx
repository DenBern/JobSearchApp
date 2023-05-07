import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import { Header } from '../Header/Header';
import { Main } from '../pages/Main/Main';
import { VacancyDetails } from '../pages/VacancyDetails/VacancyDetails';
import { Favorites } from '../pages/Favorites/Favorites';

import './App.css';

export const App = () => {
    return (
        <>
            <Router>
                <Header />
                    <main>
                <Routes>
                        <Route path="*" element={<Main/>}/>
                        <Route path="/:id" element={<VacancyDetails/>}/>
                        <Route path="/favorite" element={<Favorites/>}/>
                </Routes>
                    </main>
            </Router>
        </>
    )
}

