import { useEffect, useState } from "react";
import { SuperJob } from "../../../service/SuperJob";
import { Search } from "../../Search/Search";
import { Vacancy } from "../../Vacancy/Vacancy";
import { Filters } from "../../Filters/Filters";

import { Context } from "../../../context";

import { Skeleton } from "@mantine/core";
import { Pagination } from '@mantine/core';

import  './Main.css';

export const Main = () => {

    const {
        getAccessToken, 
        getVacancies, 
        vacancies,
        setVacancies, 
        countVacancies, 
        loading,
    } = SuperJob();
    
    const [vacancy, setVacancy] = useState([]);
    const [page, setPage] = useState(1);

    const [activeBtn, setActiveBtn] = useState(false)
    
    const [catalogValue, setCatalogValue] = useState(null);
    const [paymentFrom, setPaymentFrom] = useState(null);
    const [paymentTo, setPaymentTo] = useState(null);
    const [filtersActive, setActiveFilters] = useState(false);

    const noAgreement = filtersActive ? 1 : 0;

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
        getVacancies(vacancy, paymentFrom , paymentTo, catalogValue, vacanciesOnThePage, page, noAgreement);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vacancy, page]);

    useEffect(() => {
        if (activeBtn) {
            page === 1 ? getVacancies(vacancy, paymentFrom , paymentTo, catalogValue, vacanciesOnThePage, page) : setPage(1);
            setActiveBtn(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeBtn]); 

    return (
        <Context.Provider 
            value={
                {
                    catalogValue,setCatalogValue, 
                    paymentFrom, setPaymentFrom,
                    paymentTo, setPaymentTo,
                    activeBtn, setActiveBtn,
                    setActiveFilters
                }
            }
        >
            <>
                <Filters
                    updateFilters={(catalogValue, paymentFrom, paymentTo) => {
                            setCatalogValue(catalogValue)
                            setPaymentFrom(paymentFrom)
                            setPaymentTo(paymentTo)
                        }
                    }
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
        </Context.Provider>
    )
}