const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            sucursales: [
                "Casa Central",
                "Alquileres",
                "Centro",
                "Canelones",
                "Cerro Largo",
                "Colonia",
                "Durazno",
                "Flores",
                "Florida",
                "Lavalleja",
                "Maldonado",
                "Paysandu",
                "Rio Negro",
                "Rivera",
                "Rocha",
                "Salto",
                "San Jose",
                "Soriano",
                "Tacuarembo",
                "Treinta y Tres",
            ],
            user: null,
            selectedDate: null, 
            selectedService: '',
            selectedBranch: '',   
            logoUrl: '',
            token: localStorage.getItem("token") || "",
            reservations: [],
        },
        actions: {
            signup: async (doc_id, name, email, password) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}api/signup`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json", 
                        },
                        body: JSON.stringify({ doc_id, name, email, password }),
                    });

                    const data = await response.json();
                    if (!response.ok) {
                        return { success: false, message: data.msg || "Error al registrar usuario" };
                    }

                    return { success: true, message: "Usuario registrado exitosamente" };
                } catch (error) {
                    console.error("Error al registrar usuario:", error);
                    return { success: false, message: "Error inesperado al registrar usuario" };
                }
            },
            login: async (doc_id, password) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}api/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ doc_id, password }),
                    });

                    if (!response.ok) {
                        const data = await response.json();
                        return { success: false, message: data.msg || "Error al iniciar sesión" };
                    }

                    const data = await response.json();
                    localStorage.setItem("token", data.access_token);
                    setStore({ token: data.access_token, user: data.user }); 
                    return { success: true, message: "Inicio de sesión exitoso" };
                } catch (error) {
                    console.log("Error al iniciar sesión:", error);
                    return { success: false, message: "Error inesperado al iniciar sesión" };
                }
            },
            fetchUserData: async () => {
                const store = getStore();
                const token = localStorage.getItem("token");

                if (!token) {
                    console.error("Token no encontrado");
                    return { success: false, message: "Token no encontrado" };
                }

                if (store.user) {
                    console.log("Usuario ya cargado:", store.user);
                    return { success: true, data: store.user };
                }

                try {
                    const response = await fetch(`${process.env.BACKEND_URL}api/me`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error("Token inválido o expirado");
                    }

                    const data = await response.json();
                    setStore({ user: data });
                    return { success: true, data };
                } catch (error) {
                    console.error("Error en la validación del token:", error);
                    setStore({ user: null });
                    return { success: false, message: "Token inválido o expirado" };
                }
            },
            logout: () => {
                localStorage.removeItem("token");
                setStore({ user: null, token: "" });
            },
            setSelectedDate: (date) => {
                setStore({ selectedDate: date });
                console.log(date);
            },
            getSelectedDate: () => {
                return getStore().selectedDate; 
            },
            setSelectedService: (service) => {
                setStore({ selectedService: service });
            },
            setSelectedBranch: (item) => {
                setStore({ selectedBranch: item });
            },
            addReservation: (date, time, specialty, branch) => {
                const store = getStore();
                const newReservations = [...store.reservations, { date, time, specialty, branch }];
                setStore({ reservations: newReservations });
            },
            deleteReservation: (index) => {
                const store = getStore();
                const newReservations = store.reservations.filter((_, i) => i !== index);
                setStore({ reservations: newReservations });
            },
            uploadImage: async (file) => {
                try {
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append("upload_preset", "preset_agustin"); 

                    const response = await fetch(
                        "https://api.cloudinary.com/v1_1/ddw7ebpjg/image/upload",
                        {
                            method: "POST",
                            body: formData,
                        }
                    );

                    if (!response.ok) {
                        throw new Error("Error al subir la imagen");
                    }

                    const data = await response.json();
                    setStore({ logoUrl: data.secure_url }); 
                    return { success: true, url: data.secure_url };
                } catch (error) {
                    console.error("Error al subir la imagen:", error);
                    return { success: false, message: error.message };
                }
            },
            getLogoUrl: () => {
                const store = getStore();
                return store.logoUrl;
            },
            createReservation: async (date, time, specialty, branch) => {
                const store = getStore();
                const token = localStorage.getItem("token");


                if (!token) {
                    console.error("Token no encontrado");
                    return { success: false, message: "Debes iniciar sesión para reservar" };
                }

                try {
                    const response = await fetch(`${process.env.BACKEND_URL}api/appointments`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            user_id: store.user.id,
                            datetime: `${date} ${time}:00.00`, //Si no ponemos segundos, decimas y centesimas harcodeadas da error de tipo.
                            branch,
                            speciality: specialty,
                        }),
                    });
                    
                    const data = await response.json();

                    if (!response.ok) {
                        return { success: false, message: data.msg || "Error al crear la reserva" };
                    }

                    const newReservations = [...store.reservations, data];
                    setStore({ reservations: newReservations });

                    return { success: true, message: "Reserva creada exitosamente" };
                } catch (error) {
                    console.error("Error al crear la reserva:", error);
                    return { success: false, message: "Error inesperado al crear la reserva" };
                }
            },
            fetchReservations: async () => {
                const store = getStore();
                const token = store.token;

                if (!token) {
                    console.error("Token no encontrado");
                    return { success: false, message: "Debes iniciar sesión para ver las reservas" };
                }

                try {
                    const response = await fetch(`${process.env.BACKEND_URL}api/appointments`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error("Error al obtener reservas");
                    }

                    const data = await response.json();
                    setStore({ reservations: data });
                    return { success: true, data };
                } catch (error) {
                    console.error("Error al obtener reservas:", error);
                    return { success: false, message: "Error inesperado al obtener reservas" };
                }
            },
            deleteReservation: async (reservationId) => {
                const store = getStore();
                const token = store.token;

                if (!token) {
                    console.error("Token no encontrado");
                    return { success: false, message: "Debes iniciar sesión para eliminar reservas" };
                }

                try {
                    const response = await fetch(`${process.env.BACKEND_URL}api/appointments/${reservationId}`, {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        const error = await response.json();
                        return { success: false, message: error.msg || "Error al eliminar la reserva" };
                    }

                    //Actualizamos el estado con esto.
                    const newReservations = store.reservations.filter((res) => res.id !== reservationId);
                    setStore({ reservations: newReservations });

                    return { success: true, message: "Reserva eliminada exitosamente" };
                } catch (error) {
                    console.error("Error al eliminar la reserva:", error);
                    return { success: false, message: "Error inesperado al eliminar la reserva" };
                }
            },
            changePassword: async (oldPassword, newPassword, confirmPassword) => {
                const store = getStore();
            
                // Validaciones iniciales
                if (!oldPassword || !newPassword || !confirmPassword) {
                    return { success: false, message: "Todos los campos son obligatorios." };
                }
            
                if (newPassword !== confirmPassword) {
                    return { success: false, message: "Las contraseñas no coinciden." };
                }
            
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/change-password`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${store.token}`,
                        },
                        body: JSON.stringify({ old_password: oldPassword, new_password: newPassword }),
                    });
            
                    if (!response.ok) {
                        const errorData = await response.json();
                        return { success: false, message: errorData.msg || "Error al cambiar la contraseña." };
                    }
            
                    return { success: true, message: "Contraseña modificada con éxito." };
                } catch (error) {
                    console.error("Error al cambiar la contraseña:", error);
                    return { success: false, message: "Hubo un error al conectar con el servidor." };
                }
            },
        }
    };
};

export default getState;
