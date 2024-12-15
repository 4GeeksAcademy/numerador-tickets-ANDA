import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  const handleLinkClick = () => {
    const navbar = document.querySelector(".navbar-collapse");
    if (navbar.classList.contains("show")) {
      navbar.classList.remove("show");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary shadow-lg">
      <div className="container-fluid">
        {/* Logo */}
        <Link to="/" className="navbar-brand text-white">
          <img src={logoAnda} alt="Logo Anda" style={{ height: "40px" }} />
        </Link>

        {/* Botón Hamburguesa */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon boton-hamburguesa"></span>
        </button>

        {/* Enlaces */}
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav align-items-center ms-auto">
            <span className="text-white fw-bold me-3">
              Hola, {store.user?.name || "Usuario"}
            </span>
            <Link className="nav-link mx-2 text-white" to="/" onClick={handleLinkClick}>
              Mis reservas
            </Link>
            <Link className="nav-link mx-2 text-white" to="/editar-perfil" onClick={handleLinkClick}>
              Editar perfil
            </Link>
            <a
              onClick={(e) => {
                handleLogout();
                handleLinkClick();
              }}
              className="nav-link text-white mx-2"
              href="#"
              style={{ cursor: "pointer" }}
            >
              Cerrar Sesión
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
