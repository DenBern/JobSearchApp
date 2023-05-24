import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SuperJob } from "../../../service/SuperJob";
import { Search } from "../../Search/Search";
import { Vacancy } from "../../Vacancy/Vacancy";
import { Filters } from "../../Filters/Filters";
import { Context } from "../../../Context";
import { SkeletonVacancy } from "../../Skeleton/Skeleton";
import { Empty } from "../../Empty/Empty";
import { Error } from "../../Error/Error";

import { Pagination } from "@mantine/core";

import  "./Main.css";

export const Main = () => {
    const {
        getAccessToken, 
        getVacancies, 
        vacancies,
        countVacancies, 
        loadingVacancy,
        countPerPage,
        errorVacancy,
    } = SuperJob();

    const {
        catalogValue,
        paymentFrom,
        paymentTo,
        activeFilters,
    } = useContext(Context);

    let [searchParams, setSearchParams] = useSearchParams();
    const [vacancy, setVacancy] = useState('');
    const [page, setPage] = useState(+searchParams.get('page') - 1 || 0);
    const [paginationPage, setPaginationPage] = useState(+searchParams.get('page') || 1);
    const [reset, setReset] = useState(false);
    const [accessToken, setAccessToken] = useState(sessionStorage.getItem('token'));

    const maxAPILimit = 500;
    const pages = countVacancies <= maxAPILimit 
        ? Math.ceil(countVacancies / countPerPage) 
        : Math.ceil(maxAPILimit / countPerPage);

    const noAgreement = activeFilters ? 1 : null;

    useEffect(() => {
        getAccessToken().then(token => setAccessToken(token));
    }, []);
    
    useEffect(() => {
        if (activeFilters && accessToken) {
            getVacancies(vacancy, paymentFrom, paymentTo, catalogValue, 0, noAgreement);
        }
    }, [activeFilters, accessToken]);

    useEffect(() => {
        accessToken && getVacancies(vacancy, paymentFrom, paymentTo, catalogValue, page, noAgreement);
    }, [page, vacancy, reset, accessToken]);

    const emptySearch = !countVacancies && !loadingVacancy && !errorVacancy;

    return (
        <>
            <Filters
                setSearchParams={setSearchParams}
                setPaginationPage={setPaginationPage}
                setPage={setPage}
                setReset={setReset}
            />
            <div className="search-vacancies">
                <Search 
                    updateVacancy={(search) => {
                            setVacancy(search);
                            setPage(0);
                            setPaginationPage(1);
                            setReset(false);
                        }
                    }
                    updatePage={setPage}
                />
                {errorVacancy
                    ? <Error/> 
                    :   (
                            <div className="vacancies">
                                {loadingVacancy || !accessToken
                                    ? <SkeletonVacancy/>
                                    : vacancies.map(vacancy => {
                                            return (
                                                <Vacancy
                                                    key={vacancy.id}  
                                                    {...vacancy}
                                                />
                                            )
                                        }
                                    )
                                }
                            </div>
                        )
                }
                {emptySearch && <Empty/>}
                {countVacancies  > countPerPage && 
                    (
                        <Pagination 
                            defaultValue={paginationPage}
                            value={paginationPage}
                            onChange={(page) => {
                                    setPaginationPage(page);
                                    setPage(page - 1);
                                    setSearchParams(`page=${page}`);
                                    setReset(false);
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