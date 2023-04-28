export const SuperJob = () => {

    const URL = 'https://startup-summer-2023-proxy.onrender.com/2.0';
    const urlPassword = '/oauth2/password/?';
    const urlVacancies = '/vacancies/?'; 
    const urlCatalogues = '/catalogues/';


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
        const response = 
            await getData(`${URL}${urlPassword}${credits.login}
                &${credits.password}
                &${credits.client_id}
                &${credits.client_secret}
                &${credits.hr}`
            );
        sessionStorage.setItem('token', `${response.access_token}`)
    };
    
    const getVacancies = async (keyword = "учитель", paymentFrom = 0, paymentTo, catalogues = 33) => {
        const vacancies = await getData(`${URL}${urlVacancies}published=1&keyword=${keyword}&payment_from=${paymentFrom}&payment_to=${paymentTo}$catalogues=${catalogues}`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
                'X-Api-App-Id': 'v3.r.137440105.399b9c5f19384345afe0ad0339e619e71c66af1d.800f8642a38256679e908c370c44267f705c2909'
            }
        });
        return vacancies;
    };
    
    const getCatalogues = async () => {
        const catalogues = await getData(`${URL}${urlCatalogues}`);
        return catalogues;
    };
    
    return {getAccessToken, getCatalogues, getVacancies}
}