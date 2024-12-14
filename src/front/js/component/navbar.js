import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { Context } from "../store/appContext";
import logoAnda from "../../img/logo_anda_fondo_azul.png";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
	const [username, setUsername] = useState("");

	useEffect(() => {
		const loadUser = async () => {
			if (!store.user) { 
				const result = await actions.fetchUserData();
				if (!result.success) {
					localStorage.removeItem("token");
					navigate("/login");
				}
			}
		};
	
		loadUser();
	}, [actions, navigate, store.user]);

    const handleLogout = () => {
        actions.logout();
		setUsername("");
        navigate("/login");
    };
	return (
		<nav className="navbar navbar-light bg-light bg-body-tertiary">
			<div className="container-fluid d-flex align-items-center justify-content-between align-items-start">
				
				<div className="logo-container">
					<Link to="/" className="logo-link">
						<img className="img-fluid" src={logoAnda} alt="Logo Anda" />
					</Link>
				</div>
				
				<div>
					<span className="me-3">Hola, {store.user?.name || "Usuario"}</span>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNavAltMarkup"
						aria-controls="navbarNavAltMarkup"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
						<div className="navbar-nav">
							<Link className="nav-link" to="/">Mis reservas</Link>
							<Link className="nav-link" to="/editar-perfil">Editar perfil</Link>
							<a onClick={handleLogout} className="nav-link" href="#">
								Cerrar Sesión
							</a>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

