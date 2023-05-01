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
    const [catalog, setCatalog] = useState(1);
    const {getAccessToken, getVacancies, vacancies, countVacancies, getCatalogues, catalogues} = SuperJob();

    const vacanciesOnThePage = 4;
    const pages = Math.ceil(countVacancies / vacanciesOnThePage);

    useEffect(() => {
        getCatalogues()
    }, [])

    useEffect(() => {
        if (vacancy === '') {
            return
        } else {
            setPage(1)
        }
    }, [vacancy])

    useEffect(() => {
        if (vacancy === '' & page === 1) {
            return
        } else if (vacancy !== '' & page >= 1) {
            getVacancies(vacancy, 0, 99999999, catalog, page)
        }
    }, [page])

    return (
        <>
            <Header/>
            <main>
                <div className="filters">
                    <label>отрасль
                    <select onChange={event => setCatalog(event.target.value)}>
                        {catalogues.map(catalog => 
                            <option 
                                key={catalog.key}
                                value={catalog.title_rus}>
                                {catalog.title_rus}
                            </option>
                        )}
                    </select>
                    </label>
                </div>
                <div className="search-content">
                    <Search updateVacancy={(search) => setVacancy(search)}/>
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
                    <ReactPaginate
                        className="pagination"
                        breakLabel="..."
                        nextLabel=" >"
                        previousLabel="< "
                        pageCount={pages}
                        renderOnZeroPageCount={null}
                        onPageChange={(e) => setPage(e.selected + 1)}
                        pageRangeDisplayed={2}
                        marginPagesDisplayed={1}
                        forcePage={page - 1}
                    />
                </div>
            </main>
        </>
    )
}