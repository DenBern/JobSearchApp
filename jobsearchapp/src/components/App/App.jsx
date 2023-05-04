import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import { Header } from '../Header/Header';
import { Main } from '../pages/Main';
import { VacancyDetails } from '../pages/VacancyDetails';
import { Favorites } from '../pages/Favorites';
import "./App.css";

export const App = () => {
    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route path="*" element={<Main/>}/>
                    <Route path="/:id" element={<VacancyDetails/>}/>
                    <Route path="/favorite" element={<Favorites/>}/>
                </Routes>
            </Router>
        </>
    )
}

