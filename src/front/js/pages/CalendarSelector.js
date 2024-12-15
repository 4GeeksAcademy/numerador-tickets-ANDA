import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { format, startOfMonth, endOfMonth, addDays, subMonths, addMonths, isSameDay, isBefore } from "date-fns";
import { Context } from "../store/appContext";
import "../../styles/ScheduleDate.css";

const CalendarSelector = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const today = new Date();
    const startDate = startOfMonth(currentMonth);
    const endDate = endOfMonth(currentMonth);

    const daysInMonth = [];
    for (let day = startDate; day <= endDate; day = addDays(day, 1)) {
        daysInMonth.push(day);
    }

    const handleDateClick = (day) => {
        if (!isBefore(day, today) || isSameDay(day, today)) {
            setSelectedDate(day);
        }
    };

    const handleReservation = () => {
        const formattedDate = format(selectedDate, "yyyy/MM/dd");
        console.log("Fecha seleccionada:", formattedDate);
        actions.setSelectedDate(formattedDate);
        navigate("/agenda");
    };

    const handlePrevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    return (
        <div className="container my-5 d-flex justify-content-center">
            <div className="card p-2 shadow-lg text-center">
                
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <button onClick={handlePrevMonth} className="btn btn-outline-primary">
                    <i class="fa-solid fa-left-long"></i>
                    </button>
                    <h4 className="text-primary mb-0">{format(currentMonth, "MMMM yyyy")}</h4>
                    <button onClick={handleNextMonth} className="btn btn-outline-primary">
                    <i class="fa-solid fa-right-long"></i>
                    </button>
                </div>
                <div className="calendar-grid">
                    {daysInMonth.map((day, index) => (
                        <div
                            key={index}
                            className={`calendar-day ${
                                isSameDay(day, selectedDate) ? "selected-day" : ""
                            } ${
                                isBefore(day, today) && !isSameDay(day, today) ? "disabled-day" : ""
                            }`}
                            onClick={() => {
                                if (!isBefore(day, today) || isSameDay(day, today)) {
                                    handleDateClick(day);
                                }
                            }}
                        >
                            {format(day, "d")}
                        </div>
                    ))}
                </div>
                <button onClick={handleReservation} className="btn btn-success w-100 mt-4">
                    Confirmar
                </button>
            </div>
        </div>
    );
};

export default CalendarSelector;
