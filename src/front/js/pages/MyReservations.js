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
        className="card w-100 p-3 justify-space-between shadow-lg border-0"

      >
        <h2 className="text-center text-primary h5">Mis reservas</h2>
        <div className="row">
          {store.reservations.length > 0 ? (
            store.reservations.map((reservation, index) => (
              <div
                key={index}
                className="list-group-item col d-flex justify-content-between align-items-center"
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
              </div>
            ))
          ) : (
            <div className="list-group-item">No hay ninguna reserva realizada.</div>
          )}
        </div>
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
