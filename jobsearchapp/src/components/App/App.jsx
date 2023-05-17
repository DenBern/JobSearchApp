import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import { Header } from '../Header/Header';
import { Main } from '../pages/Main/Main';
import { VacancyDetails } from '../pages/VacancyDetails/VacancyDetails';
import { Favorites } from '../pages/Favorites/Favorites';

import './App.css';
import { SuperJob } from '../../service/SuperJob';

export const App = () => {

    const {vacancyDetails} = SuperJob();
    return (
        <>
            <Router>
                <Header />
                    <main>
                        <Routes>
                            <Route path="*" element={<Main/>}/>
                            <Route path="/:id" element={<VacancyDetails vacancyDetails={vacancyDetails}/>}/>
                            <Route path="/favorite" element={<Favorites/>}/>
                        </Routes>
                    </main>
            </Router>
        </>
    )
}

