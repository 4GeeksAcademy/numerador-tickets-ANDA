import React, { useContext, useState } from "react";
import { Link } from "react-router-dom"; 
import "../../styles/index.css";
import {Context} from "../store/appContext"

const EditProfile = () => {
    const {store} = useContext(Context);
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");

    // Simulamos el nombre del usuario logueado como dato adicional
    const [name, setName] = useState("");
    
    const [initialData, setInitialData] = useState({ email: "mail@mail.com", name: "John Doe" });

    // Función para manejar los cambios en los campos
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "email") setEmail(value);
        // else if (email == "") setEmail(store.user.email);
        else if (id === "name") setName(value);
       // if (name == "") setName(store.user.name);
    };

    // Función para enviar datos al backend
    const handleConfirmChanges = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (!email.match(emailRegex)) {
            setMessage("El correo debe ser un correo válido");
            return;
        }
    
        if (!email || !name) {
            setMessage("Todos los campos deben estar llenos.");
            return;
        }
    
        if (!store.token) {
            setMessage("El usuario no está autenticado.");
            return;
        }
    
        try {
            const token = store.token;
            const updatedData = { email, name };
    
            const response = await fetch(`${process.env.BACKEND_URL}api/update-user`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
            });
    
            if (response.ok) {
                setMessage("Datos modificados con éxito!");
                setTimeout(() => setMessage(""), 3000);
                setInitialData(updatedData);
            } else {
                const error = await response.json();
                setMessage(error.msg || "Error al actualizar los datos");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            setMessage("Hubo un error al conectar con el servidor.");
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
