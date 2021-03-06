import { useServices } from "contexts";
import React, { useEffect, useState } from "react";
import '../style/modal.scss'

interface ModalProps {
    breed: string,
    handleModal: () => void
}

export const Modal = ({ breed, handleModal }: ModalProps) => {
    const { dogService } = useServices();
    const [breedImg, setBreedImg] = useState("")
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        handleRandom()
    }, [])

    const handleRandom = () => {
        setIsLoading(true)
        dogService.getRandom(breed).then((resp) => {
            setBreedImg(resp.data.message)
            setIsLoading(false)
        }).catch((ex) => {
            setError("Wystąpił błąd. Spróbuj ponownie później")
            setIsLoading(false)
        })
    }

    return (
        <div className="modal">
                <div className="modal-close"  onClick={() => handleModal()}>
                    <img src={require('../img/close.svg')} />
                </div>
                <div className="modal-inner">
                    {
                        isLoading ? <div className="loader">
                            <div className="lds-ripple"><div></div><div></div></div>
                        </div> : <>
                            <img src={breedImg} />
                            <span className="desc">{!error && breed}</span>

                            {error && <div className="error-container">
                                <img src={require('../img/error.svg')} />
                                {error}
                            </div>}

                        </>
                    }
                </div>
                <div className="modal-footer">
                    <button disabled={error} className="btn btn-random" onClick={() => handleRandom()}>RANDOM!</button>
                </div>
        </div>
    )
}