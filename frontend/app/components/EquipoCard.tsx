import React, { useState } from "react";

interface Equipo {
  id: number;
  nombre: string;
  logo: string;
}

interface Props {
  equipo: Equipo;
}

const IMGS_BASE_URL =
  "https://pxfvrkflonlookyusxtb.supabase.co/storage/v1/object/public/Images/";

const EquipoCard: React.FC<Props> = ({ equipo }) => {
  const imagenUrl = IMGS_BASE_URL + equipo.logo + ".png";

  return (
    <div className="w-64 text-center rounded overflow-hidden shadow-lg hover:shadow-2xl">
      {/** FALTA REDIRIGIR AL EQUIPO, PERO NO ESTABAN ACABADOS CUANDO LO IMPLEMENTÉ */}
      <a href="http://localhost:3000">
        <div className="flex items-center justify-center h-32 ">
          <img
            className="w-20 h-auto"
            src={imagenUrl}
            alt={equipo.nombre + " logo"}
          />
        </div>
        <div className="px-6 py-4 bg-red-600">
          <p className="text-white-700 text-xl">{equipo.nombre}</p>
        </div>
      </a>
    </div>
  );
};

export default EquipoCard;
