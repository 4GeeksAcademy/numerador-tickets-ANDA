import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const ScheduleSelector = () => {
  const initialSchedule = [
    { time: "8:00", available: true },
    { time: "8:30", available: true },
    { time: "9:00", available: true },
    { time: "9:30", available: true },
    { time: "10:00", available: true },
    { time: "10:30", available: true },
    { time: "11:00", available: true },
    { time: "11:30", available: true },
    { time: "12:00", available: true },
    { time: "12:30", available: true },
    { time: "13:00", available: true },
    { time: "13:30", available: true },
  ];
  

  const [selectedTime, setSelectedTime] = useState(null);
  const [isReserved, setIsReserved] = useState(false);
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  const handleSelect = (index) => {
    setSelectedTime(initialSchedule[index].time);
  };

  const handleReservation = async () => {
    const response = await actions.createReservation(
        store.selectedDate,
        selectedTime,
        store.selectedService,
        store.selectedBranch
    );

    if(!response.success) {
      setMsg(response.message);
  } else {
      setMsg("Reserva creada correctamente.");
      navigate("/");
  }
  };

  const handleViewReservations = () => {
    navigate("/");
  };

  if (isReserved) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 m-0">
        {msg && <p style={{ color: msg.includes("correctamente") ? "green" : "red" }}>{msg}</p>}
        <div className="card p-3 shadow-lg border-0" style={{ maxWidth: "400px" }}>
          <img
            src="https://logoteca.uy/wp-content/uploads/sites/3/2024/09/Logo-ANDA.svg"
            alt="Logo ANDA"
            className="d-block mx-auto mb-2"
            style={{ width: "100px" }}
          />
          <h2 className="text-center text-primary h5">¡Reserva realizada con éxito!</h2>
          {store.selectedDate ? (
            <h3>Fecha seleccionada: {new Date(store.selectedDate).toLocaleDateString()}</h3>
          ) : (
            <p>No se ha seleccionado ninguna fecha aún.</p>
          )}
          <p className="text-center">HORA: {selectedTime}</p>
          <p className="text-center">ESPECIALIDAD: {store.selectedService}</p>
          <p className="text-center">SUCURSAL: {store.selectedBranch}</p>
          <button onClick={handleViewReservations} className="btn btn-primary w-100 mt-2 btn-sm">
            Ver Mis Reservas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 m-0">
      <div className="card p-2 shadow-lg border-0" style={{ maxWidth: "400px", width: "100%" }}>
        <img
          src="https://logoteca.uy/wp-content/uploads/sites/3/2024/09/Logo-ANDA.svg"
          alt="Logo ANDA"
          className="d-block mx-auto mb-2"
          style={{ width: "100px" }}
        />

        <div className="mb-4 text-center text-primary">
          <div>
            {store.selectedDate ? (
              <h3>Fecha seleccionada: {new Date(store.selectedDate).toLocaleDateString()}</h3>
            ) : (
              <p>No se ha seleccionado ninguna fecha aún.</p>
            )}
          </div>
          <div>
            <span className="h6">Horarios disponibles:</span>
          </div>
        </div>
        <div className="row row-cols-2 g-1">
          {initialSchedule.map((slot, index) => (
            <div key={slot.time} className="col">
              <div
                className={`d-flex justify-content-between align-items-center border border-primary-subtle rounded px-2 py-1 ${
                  slot.time === selectedTime ? "bg-light" : ""
                }`}
              >
                <span className={`small ${slot.time === selectedTime ? "text-primary fw-bold" : "text-dark"}`}>
                  {slot.time}
                </span>
                <button
                  onClick={() => handleSelect(index)}
                  className={`btn btn-sm ${slot.time === selectedTime ? "btn-primary text-white" : "btn-outline-primary"} rounded-circle`}
                  style={{ width: "30px", height: "30px" }}
                >
                  {slot.time === selectedTime ? "✓" : ""}
                </button>
              </div>
            </div>
          ))}
        </div>
        {selectedTime && (
          <button onClick={handleReservation} className="btn btn-primary w-100 mt-2 btn-sm">
            Reservar
          </button>
        )}
      </div>
    </div>
  );
};

export default ScheduleSelector;
