import { useServices } from "contexts";
import React, { useEffect, useState } from "react";
import '../style/modal.scss'

interface ModalProps {
    breed: string,
    handleModal: (name?: string, breed?: string) => void
}

export const Modal = ({ breed, handleModal }: ModalProps) => {
    const { dogService } = useServices();
    const [breedImg, setBreedImg] = useState("")


    useEffect(() => {
        handleRandom()
    }, [])

    const handleRandom = () => {
        dogService.getRandom(breed).then((resp) => {
            setBreedImg(resp.data.message)
        })
    }
    return (
        <div className="modal">
            <div className="modal-body">
                <div className="modal-header">
                    {breed}
                    <img src={require('../img/close.svg')} onClick={() => handleModal()} />
                </div>
                <div className="modal-inner">
                    <img src={breedImg} />
                </div>
                <div className="modal-footer">
                    <button className="btn" onClick={() => handleModal()}>Close</button>
                    <button className="btn btn-random" onClick={() => handleRandom()}>RANDOM!</button>
                </div>
            </div>
        </div>
    )
}