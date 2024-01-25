"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuid } from "uuid";
import { useParams } from "next/navigation";
import Constantes from "@/app/(utils)/constantes";
import { getRequest, postRequest } from "@/app/(utils)/api";
import Cabecera from "../Cabecera";
import VolverButton from "../volverBtn";

const supabase = createClient(
    "https://pxfvrkflonlookyusxtb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4ZnZya2Zsb25sb29reXVzeHRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwODYyNTUsImV4cCI6MjAxMzY2MjI1NX0.I3v1fYevo3rzWOT8KvkIVDrZ0LbyvABN6YaynXIYE4I"
);

const TWITTER_REG_EX = /^[a-zA-Z0-9\s]*$/i;

async function uploadImage(img: any) {
    let file = img;

    if (file == undefined) {
        return { path: logoEquipo };
    } else {
        const { data, error } = await supabase.storage
            .from("Images")
            .upload("" + uuid(), file);

        if (data) {
            return data;
        } else {
            return -1;
        }
    }
}

const initialEquipo = { nombre: "", twitter: "", logo: "" };
let logoEquipo = "";

const FormEquipo = () => {
    const [equipo, setEquipo] = React.useState(initialEquipo);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const onSubmit = handleSubmit((data: any) => {
        logoEquipo = equipo.logo;
        let img_Name = uploadImage(data.logo[0]);

        img_Name.then((value) => {
            if (value != -1) {
                console.log(value);
                postRequest("equipos", {
                    id: id != undefined ? id : 0,
                    nombre: data.nombre,
                    twitter: data.twitter,
                    logo: value.path,
                })
                    .then((data) => {
                        window.history.back();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        });
    });

    const params = useParams();
    const id = params.id;

    if (id != undefined) {
        useEffect(() => {
            (async () => {
                try {
                    const response = await getRequest("equipos/" + id);
                    const equipo = response.data.data;
                    setEquipo(equipo);
                    setValue("nombre", equipo.nombre);
                    setValue("twitter", equipo.twitter);
                } catch (error) {
                    console.log(error);
                }
            })();
        }, []);
    }

    return (
        <div className="container mx-auto my-8">
            <Cabecera
                titulo={id != undefined ? "Editar Equipo" : "Añadir Equipo"}
                subtitulo="Rellene los campos como desee"
            />

            <form className="w-full max-w-lg mx-auto mt-5" onSubmit={onSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="nombre"
                        >
                            Nombre
                        </label>

                        {errors.nombre && (
                            <span className="text-red-500 text-xs italic">
                                {errors.nombre.message as string}
                            </span>
                        )}

                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                                    py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                            id="nombre"
                            type="text"
                            placeholder="Nombre del Equipo"
                            {...register("nombre", {
                                required: {
                                    value: true,
                                    message: "Este campo es obligatorio",
                                },
                                maxLength: {
                                    value: 50,
                                    message:
                                        "El Nombre no puede tener mas de 50 caracteres",
                                },
                            })}
                        />

                        <p className="text-gray-600 text-xs italic">
                            Nombre del Equipo
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="twitter"
                        >
                            Twitter
                        </label>
                        {errors.twitter && (
                            <span className="text-red-500 text-xs italic">
                                {errors.twitter.message as string}
                            </span>
                        )}
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                                            py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                            id="twitter"
                            type="text"
                            placeholder="Usuario sin el @"
                            {...register("twitter", {
                                required: {
                                    value: true,
                                    message: "Este campo es obligatorio",
                                },
                                maxLength: {
                                    value: 50,
                                    message:
                                        "El Twitter no puede tener mas de 50 caracteres",
                                },
                                pattern: {
                                    value: TWITTER_REG_EX,
                                    message:
                                        "El Nombre de usuario no es válido, solo se permiten letras y números",
                                },
                            })}
                        />

                        <p className="text-gray-600 text-xs italic">
                            Nombre de Usuario de Twitter del Equipo
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="logo"
                        >
                            Logo
                        </label>
                        {errors.logo && (
                            <span className="text-red-500 text-xs italic">
                                {errors.logo.message as string}
                            </span>
                        )}
                        <input
                            className="cursor-pointer file:cursor-pointer text-gray-700 w-full text-sm border border-gray-200 shadow-sm rounded-lg focus:z-10 
                                    focus:border-red-500 focus:ring-red-500 disabled:opacity-50 disabled:pointer-events-none 
                                    file:border-0 bg-gray-50 file:me-4 file:py-2 file:px-4 file:text-gray-600 file:italic 
                                    file:bg-gray-200 file:hover:bg-gray-300 hover:bg-gray-200"
                            id="logo"
                            type="file"
                            placeholder="Imagen"
                            {...register("logo", {
                                required: {
                                    value: equipo?.logo == "" ? true : false,
                                    message: "Este campo es obligatorio",
                                },
                            })}
                        />

                        <p className="text-gray-600 text-xs italic">
                            Logo del Equipo
                        </p>
                        {equipo?.logo != "" ? (
                            <Image
                                src={Constantes.IMAGE_BASE_URL + equipo?.logo}
                                alt="Logo del Equipo"
                                width={80}
                                height={80}
                            />
                        ) : (
                            <p></p>
                        )}
                    </div>
                </div>
                <div className="flex flex-wrap mb-6 items-center ">
                    <div className="w-full px-3 flex justify-center">
                        <button
                            className="bg-red-500 hover:bg-red-700 mr-5 text-white font-bold py-2 px-4 rounded"
                            type="submit"
                        >
                            Guardar
                        </button>
                        <VolverButton />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FormEquipo;
