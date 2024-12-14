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
      <div className="content d-flex flex-column justify-content-center align-items-center">
        <h2 className="mb-4 my-5">Selecciona una sucursal</h2>
        <form className="w-50 text-center" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="branch" className="form-label">
              <b>Sucursales</b>
            </label>
            <select
              name="branch"
              id="branch"
              className="form-select w-100"
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