import React from "react";

const NameList = () => {
  const names = ["Ana", "Bruno", "Carla", "Diego"];

  const handleClick = (name) => {
    alert(`Você clicou em ${name}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lista de Nomes</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {names.map((name, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            {name}{" "}
            <button onClick={() => handleClick(name)}>
              Clique aqui
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NameList;
