import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import document from "../../img/document.png";
import odonto from "../../img/odonto.png";
import medico from "../../img/medico.png";
import { Context } from "../store/appContext"; 

export const ElegirServicio = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const handleSelectService = (service) => {
        actions.setSelectedService(service);
        navigate("/sucursales");  
    };

    return (
        <div className="container text-center">
            <div className="row">
                <h2 className="my-2 text-blue">Indique el tipo de reserva:</h2>
                <p><i>Seleccione tocando la imagen</i></p>
                <div className="col-12 col-md-4 my-3 bg-light rounded py-3 celeste" onClick={() => handleSelectService("Administrativas")}>
                    <a>
                        <h3>Administrativas:</h3>
                        <img className="img-fluid w-25 mx-auto" src={document} alt="Documento" />
                    </a>
                </div>
                <div className="col-12 col-md-4 my-3 bg-light rounded py-3 celeste" onClick={() => handleSelectService("Médicas")}>
                    <a>
                        <h3>Médicas</h3>
                        <img className="img-fluid w-25 mx-auto" src={medico} alt="Médico" />
                    </a>
                </div>
                <div className="col-12 col-md-4 my-3 bg-light rounded py-3 celeste" onClick={() => handleSelectService("Odontológicas")}>
                    <a>
                        <h3>Odontológicas</h3>
                        <img className="img-fluid w-25 mx-auto" src={odonto} alt="Odonto" />
                    </a>
                </div>
            </div>
        </div>
    );
};
