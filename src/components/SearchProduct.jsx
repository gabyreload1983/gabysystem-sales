import React, { useState } from "react";
import { getFromApi } from "./../utils";

export default function SearchProduct({ onChangeProducts }) {
  const [input, setInput] = useState([]);
  const [searchBy, setSearchBy] = useState("description");

  const searchProduct = async () => {
    const response = await getFromApi(
      `http://${
        import.meta.env.VITE_URL_HOST
      }/api/products/search-by?${searchBy}=${input}`
    );
    console.log(response);
    onChangeProducts(response.payload);
  };

  const handleSearchChange = (event) => {
    const input = event.target.value;
    setInput(input);
  };

  const handleKeyDown = async (event) => {
    const keyCode = event.keyCode;
    if (keyCode === 13) searchProduct();
    if (keyCode === 115) {
      document.querySelector("#search").value = "";
      setSearchBy((prev) => {
        if (prev === "code") return "ean";
        if (prev === "ean") return "description";
        if (prev === "description") return "code";
      });
    }
  };

  const formatSearchBy = (searcBy) => {
    if (searcBy === "code") return "CODIGO";
    if (searcBy === "ean") return "AEN";
    if (searcBy === "description") return "DESCRIPCION";
  };

  return (
    <div className="col p-3">
      <div className="d-flex">
        <input
          className="form-control me-2"
          type="search"
          placeholder={`${formatSearchBy(searchBy)}`}
          onChange={handleSearchChange}
          name="search"
          onKeyDown={handleKeyDown}
          id="search"
        />

        <button className="btn btn-outline-success" onClick={searchProduct}>
          Buscar
        </button>
      </div>
      <div className="form-text">
        Presiona F4 para cambiar el tipo de busqueda
      </div>
    </div>
  );
}
