import { useState } from "react";

export const SuperJob = () => {

    const URL = 'https://startup-summer-2023-proxy.onrender.com/2.0';
    const urlPassword = '/oauth2/password/?';
    const urlVacancies = '/vacancies/?'; 
    const urlCatalogues = '/catalogues/';
    const urlVacancy = '/vacancies/';
    const countPerPage = 4;

    const [vacancies, setVacancies] = useState([]);
    const [vacancyDetails, setVacancyDetails] = useState({});
    const [countVacancies, setCountVacancies] = useState(0);
    const [catalogues, setCatalogues] = useState([]);

    const [loading, setLoading] = useState(false);
    const [loadVacancy, setLoadVacancy] = useState(false)
    
    // const tokenSave = 'v3.r.137440105.b59ef02f1f3eed03ff3922bfc7caa36d25e70814.96d2d5461f64f9feefb4ed225fa025586dc61349';
    const credits = {
        login: 'login=sergei.stralenia@gmail.com',
        password: 'password=paralect123',
        client_id: 'client_id=2356',
        client_secret: 'client_secret=v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
        hr: 'hr=0',
    };

    const getData = async (url, headers = {}) => {
        const response = await fetch(url, headers);
        if (!response.ok) {
            throw new Error(`url - ${url}, status: ${response.status}`);
        }
        return await response.json();
    };

    const getAccessToken = async () => {
        if (sessionStorage.getItem('token')) return
        const token = 
            await getData(`${URL}${urlPassword}${credits.login}&${credits.password}&${credits.client_id}&${credits.client_secret}&${credits.hr}`, 
                {
                    headers: {
                        'X-Api-App-Id': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
                        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
                    }
                }
            );
        sessionStorage.setItem('token', `${token.access_token}`);
    };

    const getVacancies = async (keyword = '', paymentFrom = 0, paymentTo = undefined, catalogues = [], page) => {
        setLoading(true);
        await getData(`${URL}${urlVacancies}published=1
            &keyword=${keyword}
            &payment_from=${paymentFrom}
            &payment_to=${paymentTo}
            &catalogues=${catalogues}
            &count=${countPerPage}
            &page=${page}`,
                {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
                        'X-Api-App-Id': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948'
                    }
                }
        )
        .then(vacancies => {
            setVacancies([...vacancies.objects]);
            setCountVacancies(vacancies.total);
            setLoading(false)
        })
    }

    const getVacancyDetails = async (id) => {
        setLoadVacancy(true);
        await getData(`${URL}${urlVacancy}${id}/`, 
            {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                    'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
                    'X-Api-App-Id': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948'
                }
            }
        )
        .then(vacancy => {
            setVacancyDetails(
                {
                    profession: vacancy.profession,
                    payment_from: vacancy.payment_from,
                    payment_to: vacancy.payment_to,
                    town_id: vacancy.town.title,
                    type_of_work_id: vacancy.type_of_work.title,
                    details: vacancy.vacancyRichText,
                    id: vacancy.id,
                }
            );
            setLoadVacancy(false)
        })
    }

    const getCatalogues = async () => {
        await getData(`${URL}${urlCatalogues}`, 
            {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                    'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
                    'X-Api-App-Id': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948'
                }
            }
        )
        .then(catalogues => setCatalogues([...catalogues]));
    };

    return {
        getAccessToken, 
        getCatalogues, 
        getVacancies, 
        getVacancyDetails, 
        vacancyDetails, 
        vacancies, 
        countVacancies, 
        catalogues,
        loading,
        loadVacancy,
        countPerPage,
    }
}