import { useServices } from "contexts";
import React, { useEffect, useState } from "react";

interface Dog {
    name: string,
    subbreed: string[]
}

export const MainPage = () => {
    const { dogService } = useServices();
    const [dogs, setDogs] = useState(null);
    const [tempDogs, setTempDogs] = useState(null);

    useEffect(() => {
        dogService.getAll().then((resp) => {
            const temp = []
            Object.keys(resp.data.message).forEach((key) => {
                temp.push({
                    name: key,
                    subbreed: resp.data.message[key]
                })
            })
            setDogs(temp)
            setTempDogs(temp)
        })
    }, [])

    const handleSearch = (e) => {
        const temp = tempDogs.filter((dog) => { return dog.name.toLowerCase().includes(e.target.value.toLowerCase()) })
        setDogs(temp)
    }

    return (
        <>
            <img className="logo" src={require('../img/logo.jpg')} />
            <div className="search-container">
                <label className="form-control">
                    <input type="text" name="name" placeholder="Wyszukaj..." onChange={handleSearch} />
                </label>
            </div>
            <div className="overflow-container">
                <div className="container">
                    <div className="pills-container">
                        {dogs && dogs.map((dog: Dog) => (
                            <>
                                <button key={dog.name} className="pill pill-primary">{dog.name}</button>
                                {dog.subbreed.map((breed: string) => (
                                    <button className="pill pill-secondary" key={breed}>{breed} ({dog.name})</button>
                                ))}
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}