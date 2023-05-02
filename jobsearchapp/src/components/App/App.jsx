import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import { Header } from '@mantine/core';
import { Main } from '../pages/Main';
import { VacancyDetails } from '../pages/VacancyDetails';
import "./App.css";

export const App = () => {
    

    return (
        <>
            <Header />
            <Router>
                <Routes>
                    <Route path="*" element={<Main />}/>
                    <Route path="/:id" element={<VacancyDetails/>}/>
                </Routes>
            </Router>
        </>
    )
}

