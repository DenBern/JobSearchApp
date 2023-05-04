/* eslint-disable react-hooks/rules-of-hooks */
import {useEffect, useState } from "react";
import { SuperJob } from "../../service/SuperJob";
import { Search } from "../Search/Search";
import { Vacancy } from "../Vacancy/Vacancy";

import { Select } from "@mantine/core";
import { NumberInput } from '@mantine/core';
import { Button } from '@mantine/core';
import ReactPaginate from "react-paginate";


export const Main = () => {
    const [vacancy, setVacancy] = useState('');
    const [page, setPage] = useState(0);
    const [catalog] = useState(0);
    const [searchOn, setSearchOn] = useState(false);

    const [paymentFrom, setPaymentFrom] = useState(0);
    const [paymentTo, setPaymentTo] = useState();

    const {getAccessToken, getVacancies, vacancies, countVacancies, getCatalogues, catalogues} = SuperJob();

    const vacanciesOnThePage = 4;
    const maxAPILimit = 500;
    const pages = countVacancies <= maxAPILimit ? Math.ceil(countVacancies / vacanciesOnThePage) : Math.ceil(maxAPILimit / vacanciesOnThePage) 

    useEffect(() => {
        getAccessToken();
        getCatalogues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (vacancy !== '') {
            getVacancies(vacancy, paymentFrom , paymentTo, catalog, vacanciesOnThePage, page)
            setSearchOn(true)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, vacancy])

    const submitFilters = (e) => {
        e.preventDefault();
        if (vacancy === '') return 
        if (page === 1) { 
            getVacancies(vacancy, paymentFrom , paymentTo, catalog, vacanciesOnThePage, page)
        } else {
            setPage(1)
        }
    }
    
    return (
        <main>
            <div className="filters">
            <form action="https://api.superjob.ru/2.0/vacancies/" method="GET">
                <Select
                    data={catalogues.map(catalog => catalog.title_rus)}
                    placeholder="Выберете отрасль"
                    label="Отрасль"
                    radius="md"
                    size="md"
                    limit={2}
                />
                <label>Оклад
                    <NumberInput
                        type="number"
                        placeholder="От"
                        min={0}
                        max={paymentTo}
                        onChange={value => setPaymentFrom(value)}
                    />
                    <NumberInput
                        type="number"
                        placeholder="До"
                        min={paymentFrom}
                        onChange={value => setPaymentTo(value)}
                    />
                </label>

                {/* <select onChange={event => setCatalog(event.target.value)}>
                    {catalogues.map(catalog => 
                        <option 
                            key={catalog.key}
                            value={catalog.key}>
                            {catalog.title_rus}
                        </option>
                    )}
                </select>
                <input type="number" name="payment_to" onChange={(e) => setPaymentTo(e.target.value)}/>
                <input type="number" name="payment_from" onChange={(e) => setPaymentFrom(e.target.value)}/> */}
                <Button
                    style={{backgroundColor: searchOn ? '#228be6' : '#228be64d'}}
                    onClick={submitFilters}>
                    Применить
                </Button>
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
    )
}