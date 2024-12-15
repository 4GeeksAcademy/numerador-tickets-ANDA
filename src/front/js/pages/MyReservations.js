import React, { useContext, useState, useEffect } from "react"; 
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

const MyReservations = () => {
  const { store, actions } = useContext(Context);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    actions.fetchReservations(); 
  }, []);

  const handleDeleteReservation = async (reservationId) => {
    const response = await actions.deleteReservation(reservationId);
    if (!response.success) {
      setMsg(response.message);
    } else {
      setMsg("Reserva eliminada correctamente.");
      navigate("/");
    }
  };

  return (
    <div className="d-flex flex-column align-items-center min-vh-100 p-3 bg-light">
      
      {msg && <p style={{ color: msg.includes("correctamente") ? "green" : "red" }}>{msg}</p>}

      <div className="container p-4 shadow-lg bg-white rounded">
        <h2 className="text-center text-primary mb-4">Mis reservas</h2>

        <div className="row g-4">
          {store.reservations.length > 0 ? (
            store.reservations.map((reservation, index) => (
              <div key={index} className="col-12 col-md-4">
                <div className="card h-100 shadow-sm border-0 rounded">
                  <div className="card-body">
                    <h5 className="card-title text-secondary fw-bold">Reserva {index + 1}</h5>
                    <p className="card-text">
                      <strong>Fecha:</strong> {new Date(reservation.datetime).toLocaleDateString()} <br />
                      <strong>Hora:</strong> {new Date(reservation.datetime).toLocaleTimeString()} <br />
                      <strong>Especialidad:</strong> {reservation.speciality} <br />
                      <strong>Sucursal:</strong> {reservation.branch}
                    </p>
                  </div>
                  <div className="card-footer bg-transparent border-0 text-center">
                    <button
                      onClick={() => handleDeleteReservation(reservation.id)}
                      className="btn btn-outline-danger btn-sm"
                    >
                      Borrar Reserva
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>No hay ninguna reserva realizada.</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4">
        <Link to="/elegir-servicio" className="btn btn-primary btn-lg">
          Agende una nueva reserva
        </Link>
      </div>
    </div>
  );
};

export default MyReservations;
