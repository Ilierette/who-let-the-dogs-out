import { useServices } from "contexts";
import React, { useEffect } from "react";

export const MainPage = () => {
    const { dogService } = useServices();

    useEffect(()=> {
        dogService.getAll().then((resp)=>{
            console.log(resp.data.message)
        })
    },[])

    return (
        <div>
            <h1>My React and TypeScript App!</h1>
        </div>
    )
}