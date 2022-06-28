import { Modal } from "components/modal";
import { useServices } from "contexts";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

interface Dog {
    name: string,
    subbreed: string[]
}

export const MainPage = () => {
    const { dogService } = useServices();
    const [dogs, setDogs] = useState(null);
    const [tempDogs, setTempDogs] = useState(null);

    const [dogBreed, setDogBreed] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    const { breed, sub } = useParams()
    const [error, setError] = useState(null)

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
        }).catch((ex) => {
            setError("Wystąpił błąd. Spróbuj ponownie później")
        })

        if (breed) {
            handleModal(breed, sub)
        }
    }, [])

    const handleSearch = (e) => {
        const temp = tempDogs.filter((dog: Dog) => { return dog.name.toLowerCase().includes(e.target.value.toLowerCase()) })
        setDogs(temp)
    }

    const handleModal = (name?: string, breed?: string) => {
        if (name) {
            if (breed) {
                setDogBreed(name + "/" + breed)
            } else {
                setDogBreed(name)
            }
        }
        else {
            setDogBreed("")
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

            {
                error && <div className="error-container">
                    <img src={require('../img/error.svg')} />
                    {error}
                </div>
            }

            {dogs && <div className="pills-container">
                {dogs.map((dog: Dog) => (
                    <>
                        <button onClick={() => handleModal(dog.name)} key={dog.name} className="btn btn-primary">{dog.name}</button>
                        {dog.subbreed.map((breed: string) => (
                            <button key={breed} onClick={() => handleModal(dog.name, breed)} className="btn btn-secondary">{breed} ({dog.name})</button>
                        ))}
                    </>
                ))}
            </div>}
            {
                isOpen && <Modal breed={dogBreed} handleModal={() => setIsOpen(!isOpen)} />
            }
        </>
    )
}