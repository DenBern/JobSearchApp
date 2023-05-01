import { useState } from "react";

export const SuperJob = () => {

    const [vacancies, setVacancies] = useState([]);
    const [countVacancies, setCountVacancies] = useState(0);
    const [catalogues, setCatalogues] = useState([])

    const URL = 'https://startup-summer-2023-proxy.onrender.com/2.0';
    const urlPassword = '/oauth2/password/?';
    const urlVacancies = '/vacancies/?'; 
    const urlCatalogues = '/catalogues/';
    const tokenSave = 'v3.r.137440105.23922774053d2681b240701d58f9117a3eb040dd.1d6c5fe4f7ee80884e089f319af0d45e1c74b4be';

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
        if (localStorage.getItem('token')) return
        const token = 
            await getData(`${URL}${urlPassword}${credits.login}&${credits.password}&${credits.client_id}&${credits.client_secret}&${credits.hr}`, 
                {
                    headers: {
                        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
                    }
                }
            );
        localStorage.setItem('token', `${token.access_token}`)
    };

    const getVacancies = async (keyword, paymentFrom, paymentTo, catalogues = 33, countPerPage = 4, page = 1) => {
        getData(`${URL}${urlVacancies}published=1
            &keyword=${keyword}
            &payment_from=${paymentFrom}
            &payment_to=${paymentTo}
            &catalogues=${catalogues}
            &count=${countPerPage},
            &page=${page}`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
                        'X-Api-App-Id': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948'
                    }
                }
        )
        .then(vacancies => {
            console.log(vacancies)
                setVacancies([...vacancies.objects])
                setCountVacancies(vacancies.total)
            }
        )
    };

    const getCatalogues = async () => {
        await getData(`${URL}${urlCatalogues}`, {
            headers: {
                'Authorization': `Bearer ${tokenSave}`,
                'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
                'X-Api-App-Id': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948'
            }
        }
        )
        .then(catalogues => setCatalogues([...catalogues]))
    };

    return {getAccessToken, getCatalogues, getVacancies, vacancies, countVacancies, catalogues}
}