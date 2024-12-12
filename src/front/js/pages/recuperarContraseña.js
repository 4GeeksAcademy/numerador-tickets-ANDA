import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Context } from "../store/appContext";

const ResetPassword = () => {
    const {actions, store}= useContext(Context)
    const [email, setEmail] = useState("");
   
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Obtiene el token de la URL
    const token = searchParams.get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setErrorMessage("Los campos no pueden estar vacíos.");
            setSuccessMessage("");
            return;
        }


        try {
            setLoading(true);
            setErrorMessage("");
            let resp= await actions.recuperar(email, token)
           

            if (resp) {
                setSuccessMessage("Email enviado con exito");
               

                setTimeout(() => navigate("/login"), 2000);
            } else {
                throw new Error("Error al restablecer la contraseña.");
            }
        } catch (error) {
            setErrorMessage("Error al restablecer la contraseña. Inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="card p-4" style={{ width: "400px" }}>
                <h2 className="text-center mb-4">Restablecer Contraseña</h2>

                {successMessage && (
                    <div className="alert alert-success" role="alert">
                        {successMessage}
                    </div>
                )}

                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="newPassword">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Ingrese su email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* <div className="form-group mb-3">
                        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="form-control"
                            placeholder="Confirma la nueva contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div> */}

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >
                        {loading ? 'Actualizando...' : 'Restablecer Contraseña'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
