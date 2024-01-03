import React from "react";
import TarjetasControl from "@/app/components/TarjetasControl";

const page = () => {
    type tarjeta = {
        id: number;
        nombre: string;
        icono: string;
        url: string;
    };

    const tarjetas: tarjeta[] = [
        {
            id: 1,
            nombre: "Gestión Noticias",
            icono: "/news-icon.png",
            url: "/Noticias/Gestion",
        },
        {
            id: 2,
            nombre: "Solicitudes Usuarios",
            icono: "/solicitud-icon.png",
            url: "/Users/Solicitudes",
        },
        {
            id: 3,
            nombre: "Gestión Usuarios",
            icono: "/user-icon.png",
            url: "/Users",
        },
        {
            id: 4,
            nombre: "Gestión Circuitos",
            icono: "/circuit-icon.png",
            url: "/Circuitos/Gestion",
        },
        {
            id: 5,
            nombre: "Gestión Equipos",
            icono: "/team-icon.png",
            url: "/Equipos/Gestion",
        },
        {
            id: 6,
            nombre: "Gestión Pilotos",
            icono: "/pilot-icon.jpg",
            url: "/Pilotos/Gestion",
        },
         {
            id: 7,
            nombre: "Gestión Votaciones",
            icono: "/poll-icon.jpeg",
            url: "/Votaciones/Gestion",
        }
    ];

    return (
        <div className="mt-[20px]">
            <div className="w-[80%] mx-auto">
                <h2 className="text-black text-2xl">Panel de Control</h2>
                <hr className="border-black w-[100%] mb-5 m-auto" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 mx-auto mt-5">
                    {tarjetas?.map((tarjeta) => (
                        <TarjetasControl tarjeta={tarjeta} key={tarjeta.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default page;
