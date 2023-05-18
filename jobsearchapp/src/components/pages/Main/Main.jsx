import { useCallback, useContext, useEffect, useState } from "react";
import { SuperJob } from "../../../service/SuperJob";
import { Search } from "../../Search/Search";
import { Vacancy } from "../../Vacancy/Vacancy";
import { Filters } from "../../Filters/Filters";

import { Context } from "../../../Context";

import { Skeleton } from "@mantine/core";
import { Pagination } from '@mantine/core';
import { useSearchParams } from "react-router-dom";
import  './Main.css';

export const Main = () => {
    const {
        getAccessToken, 
        getVacancies, 
        vacancies,
        countVacancies, 
        loading,
        countPerPage,
    } = SuperJob();

    const {
        catalogValue,
        paymentFrom,
        paymentTo,
        activeFilters,
    } = useContext(Context);

    const [vacancy, setVacancy] = useState('');
    let [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(+searchParams.get('page') || 1);
    const [paginationPage, setPaginationPage] = useState(+searchParams.get('page') || 1);
    
    // const [catalogValue, setCatalogValue] = useState(null);
    // const [paymentFrom, setPaymentFrom] = useState(null);
    // const [paymentTo, setPaymentTo] = useState(null);
    // const [activeFilters, setActiveFilters] = useState(false);

    const maxAPILimit = 500;
    const pages = countVacancies <= maxAPILimit 
        ? Math.ceil(countVacancies / countPerPage) 
        : Math.ceil(maxAPILimit / countPerPage);

    const favoritesStorage = JSON.parse(localStorage.getItem('favorites'));

    useEffect(() => {
        getAccessToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log(activeFilters)
        if (activeFilters) {
            getVacancies(vacancy, paymentFrom, paymentTo, catalogValue, 1);
        } 
    }, [activeFilters]);

    useEffect(() => {
        getVacancies(vacancy, paymentFrom, paymentTo, catalogValue, page);
    }, [vacancy, page]);

    const isFavoriteVacancy = (id) => {
        const filteredVacancies = favoritesStorage.filter(favorite => favorite.id === id);
        return filteredVacancies.length > 0;
    }

    return (
            <>
                <Filters
                    setSearchParams={setSearchParams}
                    setPaginationPage={setPaginationPage}
                    setPage={setPage}
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
                                        favorite={isFavoriteVacancy(vacancy.id)}
                                    />
                            )
                        }
                    </div>
                    {countVacancies > 4 && 
                        (
                            <Pagination 
                                defaultValue={paginationPage}
                                value={paginationPage}
                                onChange={(page) => {
                                        setPaginationPage(page);
                                        setPage(page);
                                        setSearchParams(`page=${page}`);
                                    }
                                }
                                total={pages}
                            />
                        )
                    }
                </div>
            </>
    )
}