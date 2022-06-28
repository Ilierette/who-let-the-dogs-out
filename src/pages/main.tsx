import { Modal } from "components/modal";
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

    const [breed, setBreed] = useState("")
    const [isOpen, setIsOpen] = useState(false)

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
        const temp = tempDogs.filter((dog: Dog) => { return dog.name.toLowerCase().includes(e.target.value.toLowerCase()) })
        setDogs(temp)
    }

    const handleModal = (name?: string, breed?: string) => {
        if (name) {
            if (breed) {
                setBreed(name + "/" + breed)
            } else {
                setBreed(name)
            }
        }
        else {
            setBreed("")
        }
        setIsOpen(!isOpen)
    }

    return (
        <>
            <img className="logo" src={require('../img/logo.jpg')} />
            <div className="search-container">
                <label className="form-control">
                    <input type="text" name="name" placeholder="Search..." onChange={handleSearch} />
                </label>
            </div>
            <div className="overflow-container">
                <div className="container">
                    <div className="pills-container">
                        {dogs && dogs.map((dog: Dog) => (
                            <>
                                <button onClick={() => handleModal(dog.name)} key={dog.name} className="pill pill-primary">{dog.name}</button>
                                {dog.subbreed.map((breed: string) => (
                                    <button key={breed} onClick={() => handleModal(dog.name, breed)} className="pill pill-secondary">{breed} ({dog.name})</button>
                                ))}
                            </>
                        ))}
                    </div>
                </div>
            </div>
            {
                isOpen && <Modal breed={breed} handleModal={handleModal} />
            }
        </>
    )
}