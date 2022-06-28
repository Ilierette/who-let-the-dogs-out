import Axios, { AxiosRequestConfig } from 'axios';

export default function DogService() {

    const axios = Axios.create({
        baseURL: "https://dog.ceo/api/breeds/",
        timeout: 3000
    })

    // const axiosCfg = {
    // tu byłby config
    // } as AxiosRequestConfig

    return {
        getAll: () => {
            return axios.get('list/all')
        }
    }

}