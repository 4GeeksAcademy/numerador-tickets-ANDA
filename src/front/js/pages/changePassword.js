import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import { Context } from "../store/appContext"; 

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { store } = useContext(Context); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      setErrorMessage("Todos los campos son obligatorios.");
      setSuccessMessage("");
      return;
    }


    if (newPassword !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      setSuccessMessage("");
      return;
    }

    try {

      const response = await fetch(`${process.env.BACKEND_URL}/api/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${store.token}`
        },
        body: JSON.stringify({ old_password: oldPassword, new_password: newPassword })
      });

      if (response.ok) {
        setSuccessMessage("Contraseña modificada con éxito.");
        setErrorMessage("");

        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          navigate("/"); 
        }, 2000);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.msg || "Error al cambiar la contraseña.");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      setErrorMessage("Hubo un error al conectar con el servidor.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="d-flex justify-content-center min-vh-100">
      <div className="card p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Cambiar Contraseña</h2>

        {successMessage && (
          <div className="alert alert-success" style={{ marginBottom: "10px" }}>
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="alert alert-danger" style={{ marginBottom: "10px" }}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="oldPassword">Contraseña Actual</label>
            <input
              type="password"
              id="oldPassword"
              className="form-control"
              placeholder="Introduce tu contraseña actual"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="newPassword">Nueva Contraseña</label>
            <input
              type="password"
              id="newPassword"
              className="form-control"
              placeholder="Introduce tu nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="confirmPassword">Confirmar Nueva Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              placeholder="Confirma tu nueva contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Confirmar Cambio</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
