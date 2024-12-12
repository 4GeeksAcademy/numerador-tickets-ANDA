import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

const MyReservations = () => {
  const { store, actions } = useContext(Context);
  const [ msg, setMsg ] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    //Levanta las reservas al cargar el componente cuando se llame a actions.
    actions.fetchReservations()
  }, []);

  const handleDeleteReservation = async (reservationId) => {
    const response = await actions.deleteReservation(reservationId);
    if(!response.success) {
      setMsg(response.message);
  } else {
      setMsg("Reserva eliminada correctamente.");
      navigate("/");
  }
};

  return (
    <div className="d-flex flex-column align-items-center min-vh-100">
      {msg && <p style={{ color: msg.includes("correctamente") ? "green" : "red" }}>{msg}</p>}
      <div
        className="card p-3 shadow-lg border-0"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <img
          src="https://logoteca.uy/wp-content/uploads/sites/3/2024/09/Logo-ANDA.svg"
          alt="Logo ANDA"
          className="d-block mx-auto mb-2"
          style={{ width: "100px" }}
        />
        <h2 className="text-center text-primary h5">Mis reservas</h2>
        <ul className="list-group">
          {store.reservations.length > 0 ? (
            store.reservations.map((reservation, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <p className="m-0">
                    Fecha: {new Date(reservation.datetime).toLocaleDateString()}
                  </p>{" "}
                  {/* Convertir a cadena */}
                  <p className="m-0">Hora: {new Date(reservation.datetime).toLocaleTimeString()}</p>
                  <p className="m-0">Especialidad: {reservation.speciality}</p>
                  <p className="m-0">Sucursal: {reservation.branch}</p>{" "}
                  {/* Mostrar la Sucursal */}
                </div>
                <button
                  onClick={() => handleDeleteReservation(reservation.id)}
                  className="btn btn-outline-danger btn-sm"
                >
                  Borrar Reserva
                </button>
              </li>
            ))
          ) : (
            <li className="list-group-item">No hay ninguna reserva realizada.</li>
          )}
        </ul>
      </div>
      <div className="mt-4">
        <Link to="/elegir-servicio" className="btn btn-primary">
          Agende una nueva reserva
        </Link>
      </div>
    </div>
  );
};

export default MyReservations;
