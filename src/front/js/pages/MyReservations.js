import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const MyReservations = () => {
  const { store, actions } = useContext(Context);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Simula la obtención de reservas desde el contexto o una API
    setReservations(store.reservations || []);
  }, [store.reservations]);

  const handleDeleteReservation = (index) => {
    actions.deleteReservation(index);
  };

  return (
    <div className="d-flex flex-column align-items-center min-vh-100">
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
          {reservations.length > 0 ? (
            reservations.map((reservation, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <p className="m-0">
                    Fecha: {new Date(reservation.date).toLocaleDateString()}
                  </p>{" "}
                  {/* Convertir a cadena */}
                  <p className="m-0">Hora: {reservation.time}</p>
                  <p className="m-0">Especialidad: {reservation.specialty}</p>{" "}
                  {/* Mostrar la especialidad */}
                  <p className="m-0">Sucursal: {reservation.branch}</p>{" "}
                  {/* Mostrar la Sucursal */}
                </div>
                <button
                  onClick={() => handleDeleteReservation(index)}
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
