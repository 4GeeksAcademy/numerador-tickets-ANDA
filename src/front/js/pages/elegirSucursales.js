import React, {useState} from "react";

const SucursalSelector = () => {
    const [selectedBranch, setSelectedBranch] = useState("");
  
    const handleBranchChange = (event) => {
      setSelectedBranch(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      if (selectedBranch) {
       /* alert(Sucursal seleccionada, ${selectedBranch}); */
      } else {
        alert("Selecciona una sucursal.");
      }
    };
  
    const branches = [
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
    ];
  
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
  
  export default SucursalSelector;