export const SuperJob = () => {

    const URL = 'https://startup-summer-2023-proxy.onrender.com/2.0';
    const urlPassword = '/oauth2/password/?';
    const urlVacancies = '/vacancies/'; 
    const urlCatalogues = '/catalogues/';


    const options = {
        login: 'login=sergei.stralenia@gmail.com',
        password: 'password=paralect123',
        client_id: 'client_id=2231',
        client_secret: 'client_secret=v3.r.137440105.399b9c5f19384345afe0ad0339e619e71c66af1d.800f8642a38256679e908c370c44267f705c2909',
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
        const response = await getData(`${URL}${urlPassword}${options.login}&${options.password}&${options.client_id}&${options.client_secret}&${options.hr}`);
        console.log(response.access_token)
        return response.access_token;
    };
    
    const getVacancies = async () => {
        const token = await getAccessToken();
        
        const vacancies = await getData(`${URL}${urlVacancies}`, {
            headers: {
                'authorization': `Bearer ${token}`,
                'X-Api-App-Id': 'GEU4nvd3rej*jeh.eqp',
            }
        });
        console.log(vacancies)
        return vacancies;
    };
    
    const getCatalogues = async () => {
        const catalogues = await getData(`${URL}${urlCatalogues}`);
        console.log(catalogues)
        return catalogues;
    };
    
    return { getAccessToken, getVacancies, getCatalogues};
    
}