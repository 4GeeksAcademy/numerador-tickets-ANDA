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
            token: '',
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
                    setStore({ user: data.user }); 
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
                    const response = await fetch(`${process.env.BACKEND_URL}/api/me`, {
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
                setStore({ user: null });
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
        }
    };
};

export default getState;
