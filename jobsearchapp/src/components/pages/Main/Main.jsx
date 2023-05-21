import { useContext, useEffect, useState } from "react";
import { SuperJob } from "../../../service/SuperJob";
import { Search } from "../../Search/Search";
import { Vacancy } from "../../Vacancy/Vacancy";
import { Filters } from "../../Filters/Filters";
import { Context } from "../../../Context";
import { SkeletonVacancy } from "../../Skeleton/Skeleton";

import { Pagination } from "@mantine/core";
import { useSearchParams } from "react-router-dom";

import  "./Main.css";

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

    let [searchParams, setSearchParams] = useSearchParams();
    const [vacancy, setVacancy] = useState('');
    const [page, setPage] = useState(+searchParams.get('page') - 1 || 0);
    const [paginationPage, setPaginationPage] = useState(+searchParams.get('page') || 1);

    const maxAPILimit = 500;
    const pages = countVacancies <= maxAPILimit 
        ? Math.ceil(countVacancies / countPerPage) 
        : Math.ceil(maxAPILimit / countPerPage);

    const noAgreement = activeFilters ? 1 : null;

    useEffect(() => {
        getAccessToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (activeFilters) {
            getVacancies(vacancy, paymentFrom, paymentTo, catalogValue, 0, noAgreement);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeFilters]);

    useEffect(() => {
        getVacancies(vacancy, paymentFrom, paymentTo, catalogValue, page, noAgreement);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, vacancy]);

    return (
        <>
            <Filters
                setSearchParams={setSearchParams}
                setPaginationPage={setPaginationPage}
                setPage={setPage}
            />
            <div className="search-vacancies">
                <Search 
                    updateVacancy={(search) => {
                            setVacancy(search)
                            setPage(0)
                            setPaginationPage(1)
                        }
                    }
                    updatePage={setPage}
                />
                <div className="vacancies">
                    {loading 
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
                {countVacancies > countPerPage && 
                    (
                        <Pagination 
                            defaultValue={paginationPage}
                            value={paginationPage}
                            onChange={(page) => {
                                    setPaginationPage(page);
                                    setPage(page - 1);
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