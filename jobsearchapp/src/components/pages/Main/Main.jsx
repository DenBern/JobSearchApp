import {useEffect, useState } from "react";
import { SuperJob } from "../../../service/SuperJob";
import { Search } from "../../Search/Search";
import { Vacancy } from "../../Vacancy/Vacancy";
import { Filters } from "../../Filters/Filters";

import { Skeleton } from "@mantine/core";
import { Pagination } from '@mantine/core';

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
        loading
    } = SuperJob();

    const vacanciesOnThePage = 4;
    const maxAPILimit = 500;
    const pages = countVacancies <= maxAPILimit 
        ? Math.ceil(countVacancies / vacanciesOnThePage) 
        : Math.ceil(maxAPILimit / vacanciesOnThePage);

    useEffect(() => {
        getAccessToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getVacancies(vacancy, paymentFrom , paymentTo, catalogValue, vacanciesOnThePage, page, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vacancy, page]);

    useEffect(() => {
        page === 1 ? getVacancies(vacancy, paymentFrom , paymentTo, catalogValue, vacanciesOnThePage, page, 1) : setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [catalogValue, paymentTo, paymentFrom]);

    return (
        <>
            <Filters
                updateFilters={
                    (catalogValue, paymentFrom, paymentTo) => {
                        setCatalogValue(catalogValue)
                        setPaymentFrom(paymentFrom)
                        setPaymentTo(paymentTo)
                    }
                }
                setPaymentFrom={setPaymentFrom}
                setPaymentTo={setPaymentTo}
                setCatalogValue={setCatalogValue}
            />
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