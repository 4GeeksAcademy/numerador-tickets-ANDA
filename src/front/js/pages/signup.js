import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext"; 
import logoAnda from "../../img/logo_anda.png";

export const Signup = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const [doc_id, setDocId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const result = await actions.signup(doc_id, name, email, password);
        setMessage(result.message);

        if(result.success) {
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        }
    };

    return(
        <div className="container text-center">
            <Link to="/">
                <img className="img-fluid w-50 mx-auto" src={logoAnda} style={{
        maxWidth: "200px",
        height: "auto",
        marginBottom: "20px"
    }} />
            </Link>
            {message && <p style={{ color: message.includes("Error") ? "red" : "green" }}>{message}</p>}
            <main className="form-signin w-100 m-auto" style={{ maxWidth: "400px" }}>
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 my-5 fw-normal celeste">Ingrese sus datos personales:</h1>
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
                            id="name"
                            placeholder="name"
                            className="form-control"
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)} 
                            required
                        />
                        <label htmlFor="cedula" className="form-label">Nombre y apellido</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            id="email"
                            placeholder="Email"
                            className="form-control"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                        <label htmlFor="email" className="form-label">Email</label>
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

                    <button className="btn btn-primary w-100 py-2" type="submit">Registrese aquí</button>
                    <div className="mt-3 celeste">
                        <Link to="/login">¿Ya tiene cuenta? Ingrese aquí</Link>
                    </div>
                </form>
            </main>
        </div>
    )
}