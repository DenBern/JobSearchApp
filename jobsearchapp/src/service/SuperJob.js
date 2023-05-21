import { useState } from "react";

export const SuperJob = () => {

    // const URL = 'https://startup-summer-2023-proxy.onrender.com/2.0';

    const URL = 'https://startup-summer-proxy-production.up.railway.app/2.0';
    const urlPassword = '/oauth2/password/?';
    const urlVacancies = '/vacancies/?'; 
    const urlCatalogues = '/catalogues/';
    const urlVacancy = '/vacancies/';
    const countPerPage = 4;

    const [vacancies, setVacancies] = useState([]);
    const [vacancyDetails, setVacancyDetails] = useState({});
    const [countVacancies, setCountVacancies] = useState(0);
    const [catalogues, setCatalogues] = useState([]);

    const [loadingVacancy, setLoadingVacancy] = useState(false);
    const [errorVacancy, setErrorVacancy] = useState(false);
    const [loadingVacancyDetails, setLoadingVacancyDetails] = useState(false);
    const [errorVacancyDetails, setErrorVacancyDetails] = useState(false);
    
    // const tokenSave = 'v3.r.137440105.88868155de00f085b669ba7944421ce8dede25db.a69ca8815874fc60c757223804ec907ded5a821e';
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
        if (sessionStorage.getItem('token')) return;
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

    const getVacancies = async (keyword = '', paymentFrom = undefined, paymentTo = undefined, catalogues = [], page, noAgreement) => {
        setLoadingVacancy(true);
        await getData(`${URL}${urlVacancies}keyword=${keyword}
            &payment_from=${paymentFrom}
            &payment_to=${paymentTo}
            ${noAgreement && `&no_agreement=${noAgreement}`}
            &catalogues=${catalogues}
            &published=1
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
            setLoadingVacancy(false);
        })
        .catch(() => {
            setErrorVacancy(true)
            setLoadingVacancy(false)
        })
    }

    const getVacancyDetails = async (id) => {
        setLoadingVacancyDetails(true);
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
            setLoadingVacancyDetails(false);
        })
        .catch(() => {
                console.log(errorVacancyDetails)
                setErrorVacancyDetails(true)
                setLoadingVacancyDetails(false)
            }
        )
        
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
        loadingVacancy,
        loadingVacancyDetails,
        countPerPage,
        errorVacancy,
        errorVacancyDetails,
    }
}