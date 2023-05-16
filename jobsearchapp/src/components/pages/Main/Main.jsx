import { useEffect, useState } from "react";
import { SuperJob } from "../../../service/SuperJob";
import { Search } from "../../Search/Search";
import { Vacancy } from "../../Vacancy/Vacancy";
import { Filters } from "../../Filters/Filters";

import { Context } from "../../../context";

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

    let [searchParams, setSearchParams] = useSearchParams();


    const [vacancy, setVacancy] = useState('');
    const [page, setPage] = useState(+searchParams.get('page') || 1);

    const [activeBtn, setActiveBtn] = useState(false)
    
    const [catalogValue, setCatalogValue] = useState(null);
    const [paymentFrom, setPaymentFrom] = useState(null);
    const [paymentTo, setPaymentTo] = useState(null);
    const [activeFilters, setActiveFilters] = useState(false);

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
        getVacancies(vacancy, paymentFrom, paymentTo, catalogValue, page, activeFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vacancy, page, activeFilters]);

    const isFavoriteVacancy = (id) => {
        const filteredVacancies = favoritesStorage.filter(favorite => favorite.id === id);
        return filteredVacancies.length > 0;
    }

    return (
        <Context.Provider 
            value={
                {
                    catalogValue,setCatalogValue, 
                    paymentFrom, setPaymentFrom,
                    paymentTo, setPaymentTo,
                    activeBtn, setActiveBtn,
                    activeFilters, setActiveFilters,
                    page, setPage,
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
                                        favorite={isFavoriteVacancy(vacancy.id)}
                                    />
                            )
                        }
                    </div>
                    {countVacancies > 4 && 
                        (
                            <Pagination 
                                defaultValue={page}
                                value={page}
                                onChange={(page) => {
                                        setPage(page)
                                        setSearchParams(`page=${page}`)
                                    }
                                }
                                total={pages}
                            />
                        )
                    }
                </div>
            </>
        </Context.Provider>
    )
}