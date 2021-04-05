import Axios from 'axios';

const Api = Axios.create({
    baseURL: 'https://desafioaba.nexusdev.com.br/api'
});

export default Api;