import { useContext, useEffect, useState } from "react";
import { SuperJob } from "../../../service/SuperJob";
import { Search } from "../../Search/Search";
import { Vacancy } from "../../Vacancy/Vacancy";
import { Filters } from "../../Filters/Filters";
import { Context } from "../../../Context";

import { Skeleton } from "@mantine/core";
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
        isFavoriteVacancy,
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
    }, []);

    useEffect(() => {
        if (activeFilters) {
            getVacancies(vacancy, paymentFrom, paymentTo, catalogValue, 0, noAgreement);
        } 
    }, [activeFilters]);

    useEffect(() => {
        getVacancies(vacancy, paymentFrom, paymentTo, catalogValue, page, noAgreement);
    }, [page]);

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