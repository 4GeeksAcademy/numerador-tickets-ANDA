import React, { useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import logoAnda from "../../img/logo_anda.png";

const ResetPassword = () => {
    const { token } = useParams();
    const { actions } = useContext(Context);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newPassword || !confirmPassword) {
            setMessage("Todos los campos son obligatorios.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setMessage("Las contraseñas no coinciden.");
            return;
        }

        setLoading(true);
        setMessage("");

        
        const response = await actions.resetPassword(token, newPassword);

        setMessage(response.message);
        setLoading(false);

        if (response.success) {
            setTimeout(() => navigate("/login"), 2000); 
        }
    };

    return (
        <div className="container text-center mt-5" style={{ maxWidth: "500px" }}>
            <Link to="/">
                <img className="img-fluid w-50 mx-auto" src={logoAnda} style={{
                    maxWidth: "200px",
                    height: "auto",
                    marginBottom: "20px"
                }} />
            </Link>
            <h2>Restablecer Contraseña</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="form-group mb-3">
                    <label>Nueva Contraseña:</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Ingrese su nueva contraseña"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Confirmar Contraseña:</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Confirme su nueva contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Restableciendo..." : "Restablecer Contraseña"}
                </button>
            </form>
            {message && <div className="alert mt-3">{message}</div>}
        </div>
    );
};

export default ResetPassword;
