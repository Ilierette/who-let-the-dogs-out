import { createContext, useContext } from "react"
import DogService from "services/api"

export const dogServiceContext = createContext({
    dogService: DogService()
})

export const useServices = () => useContext(dogServiceContext)