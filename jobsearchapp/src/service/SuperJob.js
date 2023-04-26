export const SuperJob = () => {

const URL = 'https://startup-summer-2023-proxy.onrender.com/2.0';
const password = '/oauth2/password/?';
const vacancies = '/vacancies/'; 
const catalogues = '/catalogues/';


const options = {
    login: 'login=sergei.stralenia@gmail.com',
    password: 'password=paralect123',
    client_id: 'client_id=2231',
    client_secret: 'client_secret=v3.r.137440105.399b9c5f19384345afe0ad0339e619e71c66af1d.800f8642a38256679e908c370c44267f705c2909',
    hr: 'hr=0',
};

    const getData = async (url) => {
        let response = await fetch(url);

        if(!response.ok) {
            throw new Error (`url - ${url}, status: ${response.status}`)
        }
        return await response.json();
    }

    const getAccessToken = () => {
        getData(`${URL}${password}&${options.login}&${options.password}&${options.client_id}&${options.client_secret}&${options.hr}`)
            .then(response => console.log(response))
    }

    const getVacancies = () => {
        getData(`${URL}${vacancies}`)
            .then(response => console.log(response))
    }

    const getCatalogues = () => {
        getData(`${URL}${catalogues}`)
            .then(response => console.log(response))
    }

    return {getAccessToken, getCatalogues, getVacancies}
}