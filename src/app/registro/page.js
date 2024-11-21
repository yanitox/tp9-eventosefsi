"use client"; 
import React, { useState } from "react";
import styles from "../registro/registro.module.css"; // Tu archivo de estilos
import { UserProvider, useUser } from "../context/UserContext";// Para acceder al contexto de usuario
import { useRouter } from "next/navigation"; // Para redirigir

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState(""); 
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState(""); 

  const { saveUserData } = useUser(); // Guardar los datos del usuario en el contexto
  const router = useRouter(); // Para redirigir al usuario

  // Manejo del envío de formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Datos del formulario
    const userData = {
      first_name: nombre,
      last_name: apellido,
      username: email,
      password: mensaje,
    };

    try {
      const response = await fetch("http://localhost:4000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      // Verifica si el estado HTTP es 201 Created
      if (response.status === 201) {
        // Redirige al usuario a la página de login
        router.push("/");
      } else if (response.statusText === "Created") {
        // Si statusText es "Created", también se redirige
        router.push("/login");
      } else {
        // Si el estado no es "201 Created", muestra un error
        const result = await response.text(); // Lee la respuesta como texto
        alert(`Error al registrarse: ${result}`); 
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      setError("Hubo un error al procesar tu solicitud. Intenta de nuevo.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Formulario de Registro</h1>
        
        {/* Mostrar error si ocurre uno */}
        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="nombre" className={styles.label}>Nombre</label>
            <input
              type="text"
              id="nombre"
              className={styles.input}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="apellido" className={styles.label}>Apellido</label>
            <input
              type="text"
              id="apellido"
              className={styles.input}
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Correo Electrónico</label>
            <input
              type="email"
              id="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="mensaje" className={styles.label}>Contraseña</label>
            <input
              type="password"
              id="mensaje"
              className={styles.input}
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.button}>Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <UserProvider>
      <Registro /> 
    </UserProvider>
  );
}
