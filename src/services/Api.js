import Axios from 'axios';

const Api = Axios.create({
    baseURL: 'http://localhost/dev/desafio_aba/api'
});

export default Api;