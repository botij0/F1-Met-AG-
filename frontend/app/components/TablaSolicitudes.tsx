"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { paginate } from "../utils/paginate";
import Pagination from "./Pagination";
import FilaSolicitud from "./FilaSolicitud";

const TablaSolicitudes = () => {
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const USUARIOS_API_BASE_URL =
    "http://localhost:8080/api/v1/usuarios/solicitudes";
  const [usuarios, setUsuarios] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginateUsuarios = paginate(usuarios, currentPage, pageSize);

  useEffect(() => {
    const getUsuarios = async () => {
      setLoading(true);
      try {
        const response = await axios.get(USUARIOS_API_BASE_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const data = await response.data;
        setUsuarios(data.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getUsuarios();
  }, []);

  console.log(usuarios);
  return (
    <>
      <div className="container mx-auto my-8">
        <h2 className="text-black text-2xl">Solicitudes</h2>
        <hr className="border-black w-[100%] mb-5 m-auto" />

        <div className="flex shadow border-b">
          <table className="min-w-full">
            <thead className="bg-red-500 border-b">
              <tr>
                <th className="text-left font-medium text-white uppercase tracking-wide py-3 px-6">
                  Id
                </th>
                <th className="text-left font-medium text-white uppercase tracking-wide py-3 px-6">
                  Nombre de usuario
                </th>
                <th className="text-left font-medium text-white uppercase tracking-wide py-3 px-6">
                  Email
                </th>
                <th className="text-left font-medium text-white uppercase tracking-wide py-3 px-6">
                  Nombre
                </th>
                <th className="text-right font-medium text-white uppercase tracking-wide py-3 px-6">
                  Acciones
                </th>
              </tr>
            </thead>
            {!loading && (
              <tbody className="bg-gray-50">
                {paginateUsuarios?.map(
                  (usuario: {
                    id: number;
                    username: string;
                    email: string;
                    nombre: string;
                  }) => (
                    <FilaSolicitud key={usuario.id} usuario={usuario} />
                  )
                )}
              </tbody>
            )}
          </table>
        </div>
        <Pagination
          items={usuarios == null ? 0 : usuarios.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default TablaSolicitudes;