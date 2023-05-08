import {useEffect, useState } from "react";
import { SuperJob } from "../../../service/SuperJob";
import { Search } from "../../Search/Search";
import { Vacancy } from "../../Vacancy/Vacancy";
import { Skeleton } from "@mantine/core";

import { Pagination } from '@mantine/core';
import { Select } from "@mantine/core";
import { NumberInput } from '@mantine/core';
import { Button } from '@mantine/core';

import  './Main.css';

export const Main = () => {
    const [vacancy, setVacancy] = useState('');
    const [page, setPage] = useState(1);
    
    const [catalogValue, setCatalogValue] = useState(null);
    const [paymentFrom, setPaymentFrom] = useState(null);
    const [paymentTo, setPaymentTo] = useState(null);

    const {
        getAccessToken, 
        getVacancies, 
        vacancies, 
        countVacancies, 
        getCatalogues, 
        catalogues,
        loading
    } = SuperJob();

    const vacanciesOnThePage = 4;
    const maxAPILimit = 500;
    const pages = countVacancies <= maxAPILimit 
        ? Math.ceil(countVacancies / vacanciesOnThePage) 
        : Math.ceil(maxAPILimit / vacanciesOnThePage);

    useEffect(() => {
        getAccessToken();
        getCatalogues();
    }, []);

    useEffect(() => {
        getVacancies(vacancy, paymentFrom , paymentTo, catalogValue, vacanciesOnThePage, page);
    }, [vacancy, page]);

    const submitFilters = (e) => {
        e.preventDefault();
        page === 1 ? getVacancies(vacancy, paymentFrom , paymentTo, catalogValue, vacanciesOnThePage, page) : setPage(1);
    }

    const mapCatalogues = () => {
        return catalogues.map(catalog => {
            return {
                value: catalog.key,
                label: catalog.title_rus,
            }
        })
    }

    return (
        <>
            <div className="filters">
                <form>
                    <div className="title-filters">
                        <h3>Фильтры</h3>
                        <button className="reset-all">Сбросить все <span>&times;</span></button>
                    </div>
                    <Select
                        data={catalogues.map(catalog => catalog.title_rus)}
                        placeholder="Выберете отрасль"
                        label="Отрасль"
                        radius="md"
                        size="md"
                        limit={2}
                        value={catalogValue} 
                        onChange={setCatalogValue}
                    />
                    {/* <select onChange={event => setCatalogValue(event.target.value)}>
                        {catalogues.map(catalog => 
                            <option 
                                key={catalog.key}
                                value={catalog.key}>
                                {catalog.title_rus}
                            </option>
                        )}
                    </select> */}
                    <label>Оклад
                        <NumberInput
                            type="number"
                            placeholder="От"
                            min={0}
                            max={paymentTo}
                            onChange={value => setPaymentFrom(value)}
                            step={1000}
                        />
                        <NumberInput
                            type="number"
                            placeholder="До"
                            min={paymentFrom}
                            onChange={value => setPaymentTo(value)}
                            step={1000}
                        />
                    </label>
                    <Button
                        // style={{backgroundColor: searchOn ? '#228be6' : '#228be64d'}}
                        onClick={submitFilters}>
                        Применить
                    </Button>
                </form>
            </div>
            <div className="search-content">
                <Search 
                    updateVacancy={(search) => setVacancy(search)} 
                    updatePage={setPage}
                />
                <div className="vacancies">
                    {loading ? 
                        <>
                            <Skeleton height={8} radius="xl" />
                            <Skeleton height={8} mt={6} radius="xl" />
                            <Skeleton height={8} mt={6} width="70%" radius="xl" />
                        </> 
                        : vacancies.map(vacancy => 
                                <Vacancy 
                                    key={vacancy.id}  
                                    {...vacancy}
                                    favorite={localStorage.getItem(`${vacancy.id}`) ? true : false}
                                />
                        )
                    }
                </div>
                {countVacancies > 4 && 
                    (
                        <Pagination 
                            value={page} 
                            onChange={setPage} 
                            total={pages}
                        />
                    )
                }
            </div>
        </>
    )
}