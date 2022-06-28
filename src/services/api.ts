import Axios, { AxiosRequestConfig } from 'axios';

export default function DogService() {

    const axios = Axios.create({
        baseURL: "https://dog.ceo/api",
        timeout: 3000
    })

    // const axiosCfg = {
    // tu byłby config
    // } as AxiosRequestConfig

    return {
        getAll: () => {
            return axios.get('/breeds/list/all')
        },
        getRandom: (breed: string) => {
            return axios.get(`/breed/${breed}/images/random`)
        }
    }

}