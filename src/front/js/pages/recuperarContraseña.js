import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Obtiene el token de la URL
    const token = searchParams.get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newPassword || !confirmPassword) {
            setErrorMessage("Los campos no pueden estar vacíos.");
            setSuccessMessage("");
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrorMessage("Las contraseñas no coinciden.");
            setSuccessMessage("");
            return;
        }

        try {
            setLoading(true);
            setErrorMessage("");

            const response = await fetch('/api/restablecer-contrasena', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    password: newPassword,
                    token
                })
            });

            if (response.ok) {
                setSuccessMessage("Contraseña modificada con éxito.");
                setNewPassword("");
                setConfirmPassword("");

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
                        <label htmlFor="newPassword">Nueva Contraseña</label>
                        <input
                            type="password"
                            id="newPassword"
                            className="form-control"
                            placeholder="Introduce la nueva contraseña"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="form-control"
                            placeholder="Confirma la nueva contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

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
