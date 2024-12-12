import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import "../../styles/index.css";

const EditProfile = () => {
    // Mensaje de exito o error
    const [message, setMessage] = useState("");

    // Campos de formulario
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    // Guarda los valores iniciales para comparar con los cambios
    const [initialEmail, setInitialEmail] = useState("");
    const [initialPhone, setInitialPhone] = useState("");
    const [initialAddress, setInitialAddress] = useState("");

    // Funcion para manejar el cambio de los campos
    const handleInputChange = (e) => {
        const { id, value } = e.target;

        if (id === "email") { 
            setEmail(value);
        } else if (id === "phone") {
            setPhone(value);
        } else if (id === "address") {
            setAddress(value);
        }
    };

    // Funcion para validar el telefono (solo números)
    const validatePhone = (phone) => {
        const phoneRegex = /^[0-9]+$/; 
        return phoneRegex.test(phone);
    };

    // Funcion que se llama cuando se presiona "Confirmar cambios"
    const handleConfirmChanges = () => {
        // Validar que el correo tenga un formato valido
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail.com|hotmail.com|yahoo.com)$/;
        if (!email.match(emailRegex)) {
            setMessage("El correo debe ser un correo válido");
            return;
        }

        // Validar que el telefono solo contenga numeros
        if (!validatePhone(phone)) {
            setMessage("El teléfono debe contener solo números.");
            return;
        }

        // Validar que los campos no esten vacios
        if (!email || !phone || !address) {
            setMessage("Todos los campos deben estar llenos.");
            return;
        }

        // Verificar si el usuario ha modificado algun campo
        if (email === initialEmail && phone === initialPhone && address === initialAddress) {
            setMessage("No se han realizado cambios.");
            return;
        }

        setMessage("Datos modificados con éxito!");

        // Limpia el mensaje despues de 3 segundos
        setTimeout(() => {
            setMessage(""); 
        }, 3000);

        // Actualiza los valores iniciales con los nuevos cambios
        setInitialEmail(email);
        setInitialPhone(phone);
        setInitialAddress(address);
    };

    return (
        <div className="edit-profile-container">
            <h2 className="text-blue">Modificar datos personales</h2>
            
           
            {message && (
                <div style={{ marginBottom: "10px" }} className={`alert ${message.includes("exito") ? "alert-success" : "alert-danger"}`}>
                    {message}
                </div>
            )}


            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label text-blue">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="ejemplo@correo.com"
                        value={email}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="phone" className="form-label text-blue">Teléfono</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        placeholder="0991234567"
                        value={phone}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="address" className="form-label text-blue">Dirección</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="Av. Siempre Viva 1234"
                        value={address}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mt-4">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleConfirmChanges} // Llama a la funcion que maneja los cambios
                    >
                        Confirmar cambios
                    </button>
                </div>

                <div className="mt-3">
                    <Link to="/change-password">
                        <button type="button" className="btn btn-secondary">
                            Cambiar contraseña
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
