import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { Context } from "../store/appContext";

export const Login = () =>{
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [doc_id, setDocId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [logo, setLogo] = useState("");
    const [email, setEmail] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchLogo = async () => {
            if (!store.logoUrl) {
                
                const file = await fetch("https://res.cloudinary.com/ddw7ebpjg/image/upload/v1733250156/logo_anda_gwzhol.png").then(res => res.blob()); 
                const result = await actions.uploadImage(file); 
                if (result.success) {
                    setLogo(result.url);
                }
            } else {
                
                setLogo(store.logoUrl);
            }
        };
        fetchLogo();
    }, [store.logoUrl, actions]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const result = await actions.login(doc_id, password);
        if(!result.success) {
            setError(result.message);
        } else {
            setError("Inicio de sesión exitoso");
            navigate("/");
        }
    };

    const handleRecoverPassword = async () => {
        const response = await actions.recoverPassword(email);
        if (response.success) {
            setModalMessage("Correo enviado, revise su casilla y siga los pasos.");
        } else {
            setModalMessage("Error al enviar el correo. Verifique el correo ingresado.");
        }
    };

    return(
        <div className="container text-center">
            <Link to="/">
                
                {logo ? (
                    <img
                    className="img-fluid"
                    src={logo}
                    alt="Logo Anda"
                    style={{ 
                        maxWidth: "200px", 
                        height: "auto",    
                        marginBottom: "20px" 
                    }}
                />
                ) : (
                    <p>Cargando logo...</p>
                )}
            </Link>
            {error && <p style={{ color: error.includes("success") ? "green" : "red" }}>{error}</p>}
            
            <main className="form-signin w-100 m-auto" style={{ maxWidth: "400px" }}>
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 my-5 fw-normal celeste">Ingrese su CI y su Contraseña:</h1>
                    <div className="form-floating mb-3">
                        <input
                            id="personal_document"
                            placeholder="Cédula de identidad"
                            className="form-control"
                            type="number"
                            value={doc_id}
                            onChange={(event) => setDocId(event.target.value)} 
                            required
                        />
                        <label htmlFor="personal_document" className="form-label">Documento de identidad</label>
                    </div>                                     
                    <div className="form-floating mb-3">
                        <input
                            id="password"
                            placeholder="Password"
                            className="form-control"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                        <label htmlFor="password" className="form-label">Contraseña</label>
                    </div>

                    <button className="btn btn-primary w-100 py-2" type="submit">Ingrese aquí</button>
                    <div className="mt-3 celeste">
                        <Link to="/signup">¿No tiene cuenta? Registrese aquí</Link>
                    </div>

                    <div className="mt-3 celeste">
                        <a
                            
                            className=""
                            onClick={() => setShowModal(true)}
                        >
                            ¿Olvidó su contraseña?
                        </a>
                    </div>
                </form>
            </main>

            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Recuperar Contraseña</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Ingrese su correo para recuperar la contraseña:</p>
                                <input
                                    type="email"
                                    className="form-control mb-3"
                                    placeholder="Correo electrónico"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {modalMessage && <p className="text-success">{modalMessage}</p>}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cerrar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleRecoverPassword}
                                    disabled={!email}
                                >
                                    Enviar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};