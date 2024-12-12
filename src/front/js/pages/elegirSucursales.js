import React, {useState, useContext} from "react";
import { Context } from "../store/appContext"; 
import { useNavigate } from "react-router-dom";

const Sucursales = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [selectedBranch, setSelectedBranch] = useState("");
    const handleBranchChange = (event) => {
      setSelectedBranch(event.target.value);
    };
    const handleSubmit = (event) => {
      event.preventDefault();
      if (selectedBranch) {
        actions.setSelectedBranch(selectedBranch);
        navigate("/fecha");
      } else {
        alert("Selecciona una sucursal.");
      }   
    };
    const branches = store.sucursales;
    return (
      <div className="container mt-5"> 
        <img
          src="https://logoteca.uy/wp-content/uploads/sites/3/2024/09/Logo-ANDA.svg"
          alt="Logo Anda"
          className="mb-4"
          style={{ maxWidth: "150px" }}
        />
        <h2 className="mb-4">Selecciona una sucursal</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="branch" className="form-label">
              <b>Sucursales</b>
            </label>
            <select
              name="branch"
              id="branch"
              className="form-select w-50"
              value={selectedBranch}
              onChange={handleBranchChange}
              required
            >
              <option value="" disabled>
                Seleccionar
              </option>
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Confirmar
          </button>
        </form>
      </div>
    );
  };
  export default Sucursales;