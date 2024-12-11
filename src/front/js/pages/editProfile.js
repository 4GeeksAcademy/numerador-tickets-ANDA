import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/index.css";

const EditProfile = () => {
    // Mensaje de éxito o error
    const [message, setMessage] = useState("");

    // Campos de formulario
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const navigate = useNavigate();

    // Cargar los datos actuales del usuario al montar el componente
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('https://cuddly-bassoon-97q56gp9v9v4c79px-3001.app.github.dev/api/me', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setName(data.name);
                    setEmail(data.email);
                    setPhone(data.phone);
                    setAddress(data.address);
                } else {
                    const data = await response.json();
                    setMessage(data.msg || "Error al cargar los datos del perfil.");
                    // Redirigir al login si hay un error
                    setTimeout(() => {
                        navigate('/login');
                    }, 3000);
                }
            } catch (error) {
                console.error("Error de conexión:", error);
                setMessage("Error de conexión. Intenta nuevamente.");
            }
        };

        fetchUserData();
    }, [navigate]);

    // Función para manejar el cambio de los campos
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "name") setName(value);
        if (id === "email") setEmail(value);
        if (id === "phone") setPhone(value);
        if (id === "address") setAddress(value);
    };

    // Función que se llama cuando se presiona "Confirmar cambios"
    const handleConfirmChanges = async () => {
        // Validar que el correo tenga un formato válido
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail.com|hotmail.com|yahoo.com)$/;
        if (!email.match(emailRegex)) {
            setMessage("El correo debe ser un correo válido");
            return;
        }

        // Validar que el teléfono solo contenga números
        const validatePhone = (phone) => /^[0-9]+$/.test(phone);
        if (!validatePhone(phone)) {
            setMessage("El teléfono debe contener solo números.");
            return;
        }

        // Validar que los campos no estén vacíos
        if (!name || !email || !phone || !address) {
            setMessage("Todos los campos deben estar llenos.");
            return;
        }

        try {
            const response = await fetch('https://cuddly-bassoon-97q56gp9v9v4c79px-3001.app.github.dev/api/user/edit', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ name, email, phone, address })
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("Datos modificados con éxito!");
            } else {
                setMessage(data.msg || "Error al actualizar el perfil.");
                // Redirigir al login si hay un error
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
        } catch (error) {
            setMessage("Error de conexión. Intenta nuevamente.");
        }

        // Limpia el mensaje después de 3 segundos
        setTimeout(() => {
            setMessage(""); 
        }, 3000);
    };

    return (
        <div className="edit-profile-container">
            <h2 className="text-blue">Modificar datos personales</h2>
            {message && (
                <div style={{ marginBottom: "10px" }} className={`alert ${message.includes("éxito") ? "alert-success" : "alert-danger"}`}>
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
