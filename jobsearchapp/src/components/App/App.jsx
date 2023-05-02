import { useEffect, useState } from "react";
import { SuperJob } from "../../service/SuperJob";
import { Search } from "../Search/Search";
import { Header } from "../Header/Header";
import { Vacancy } from "../Vacancy/Vacancy";

import ReactPaginate from "react-paginate";

import "./App.css";

export const App = () => {
    const [vacancy, setVacancy] = useState('');
    const [page, setPage] = useState(0);
    const [catalog, setCatalog] = useState(0);

    const [paymentFrom, setPaymentFrom] = useState(0);
    const [paymentTo, setPaymentTo] = useState();

    const {getAccessToken, getVacancies, vacancies, countVacancies, getCatalogues, catalogues} = SuperJob();

    const vacanciesOnThePage = 4;
    const maxAPILimit = 500;
    const pages = countVacancies <= maxAPILimit ? Math.ceil(countVacancies / vacanciesOnThePage) : Math.ceil(maxAPILimit / vacanciesOnThePage) 

    useEffect(() => {
        getAccessToken()
        getCatalogues()
    }, [])

    useEffect(() => {
        if (vacancy !== '') {
            getVacancies(vacancy, paymentFrom , paymentTo, catalog, vacanciesOnThePage, page)
        }
    }, [page, vacancy])

    const submitFilters = (e) => {
        e.preventDefault();
        page === 1 ? getVacancies(vacancy, paymentFrom , paymentTo, catalog, vacanciesOnThePage, page) : setPage(1)
    }

    return (
        <>
            <Header/>
            <main>
                <div className="filters">
                <form action="https://api.superjob.ru/2.0/vacancies/" method="GET">
                    <input type="number" name="payment_from" onChange={(e) => setPaymentFrom(e.target.value)}/>
                    <input type="number" name="payment_to" onChange={(e) => setPaymentTo(e.target.value)}/>
                    <label>отрасль
                    <select onChange={event => setCatalog(event.target.value)}>
                        {catalogues.map(catalog => 
                            <option 
                                key={catalog.key}
                                value={catalog.key}>
                                {catalog.title_rus}
                            </option>
                        )}
                    </select>
                    </label>
                    <button type="submit" onClick={submitFilters}>Искать</button>
                    </form>
                </div>
                <div className="search-content">
                    <Search updateVacancy={(search) => setVacancy(search)} updatePage={setPage}/>
                    <div className="vacancies"
                        style={
                            {
                                display: 'flex', 
                                flexDirection: 'column', 
                                gap: '15px'
                            }
                        }>
                        {vacancies.map(vacancy => <Vacancy key={vacancy.id}  {...vacancy}/>)}
                    </div>
                    {vacancies.length > 0 && 
                        (
                            <ReactPaginate
                                className="pagination"
                                breakLabel="..."
                                nextLabel=" >"
                                previousLabel="< "
                                pageCount={pages - 1}
                                renderOnZeroPageCount={null}
                                onPageChange={(e) => setPage(e.selected + 1)}
                                pageRangeDisplayed={2}
                                marginPagesDisplayed={1}
                                forcePage={page - 1}
                                initialPage={0}
                            />
                        )
                    }
                    
                </div>
            </main>
        </>
    )
}