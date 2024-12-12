import React, { useContext, useState } from "react";
import { Link } from "react-router-dom"; 
import "../../styles/index.css";
import {Context} from "../store/appContext"

const EditProfile = () => {
    const {store} = useContext(Context);
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    // Simulamos el nombre del usuario logueado como dato adicional
    const [name, setName] = useState("");
    
    const [initialData, setInitialData] = useState({ email: "algo@algo.com", phone: "091234567", address: "Av.Siempre Viva 742", name: "Juanma" });

    // Función para manejar los cambios en los campos
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "email") setEmail(value);
        else if (id === "phone") setPhone(value);
        else if (id === "address") setAddress(value);
        else if (id === "name") setName(value);
    };

    // Función para enviar datos al backend
    const handleConfirmChanges = async () => {
        // Validaciones
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail.com|hotmail.com|yahoo.com)$/;
        if (!email.match(emailRegex)) {
            setMessage("El correo debe ser un correo válido");
            return;
        }
        if (!/^[0-9]+$/.test(phone)) {
            setMessage("El teléfono debe contener solo números.");
            return;
        }
        if (!email || !phone || !address || !name) {
            setMessage("Todos los campos deben estar llenos.");
            return;
        }

        try {
            const token = store.token; // Suponemos que el token está guardado en localStorage
            const response = await fetch(`${process.env.BACKEND_URL}api/update-user`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Envía el token en el encabezado
                },
                body: JSON.stringify(initialData),
            });

            if (response.ok) {
                setMessage("Datos modificados con éxito!");
                setTimeout(() => setMessage(""), 3000); // Limpia el mensaje después de 3 segundos
                const updatedData = { email, phone, address, name };
                console.log(email);
                
            //    setInitialData(updatedData);
            } else {
                const error = await response.json();
                setMessage(error.msg || "Error al actualizar los datos");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            setMessage("Hubo un error al conectar con el servidor.", token);
        }
    };

    return (
        <div className="edit-profile-container">
            <h2 className="text-blue">Modificar datos personales</h2>
            {message && (
                <div
                    style={{ marginBottom: "10px" }}
                    className={`alert ${message.includes("éxito") ? "alert-success" : "alert-danger"}`}
                >
                    {message}
                </div>
            )}

            <form>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label text-blue">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Nombre completo"
                        value={name}
                        onChange={handleInputChange}
                    />
                </div>
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
                        onClick={handleConfirmChanges}
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
