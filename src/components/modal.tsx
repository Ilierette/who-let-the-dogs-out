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


    useEffect(() => {
        handleRandom()
    }, [])

    const handleRandom = () => {
        dogService.getRandom(breed).then((resp) => {
            setBreedImg(resp.data.message)
        }).catch((ex) => {
            setError("Wystąpił błąd. Spróbuj ponownie później")
        })
    }

    return (
        <div className="modal">
            <div className="modal-body">
                <div className="modal-header">
                    <span>{!error && breed}</span>
                    <img src={require('../img/close.svg')} onClick={() => handleModal()} />
                </div>
                <div className="modal-inner">
                    <img src={breedImg} />
                    {error && <div className="error-container">
                        <img src={require('../img/error.svg')} />
                        {error}
                    </div>}
                </div>
                <div className="modal-footer">
                    <button className="btn" onClick={() => handleModal()}>Close</button>
                    <button disabled={error} className="btn btn-random" onClick={() => handleRandom()}>RANDOM!</button>
                </div>
            </div>
        </div>
    )
}