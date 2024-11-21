"use client";
import React, { useState } from 'react';
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';  // Para redirigir al usuario
import Link from 'next/link';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();  // Hook para redirigir al usuario

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realizamos la solicitud POST al backend para iniciar sesión
      const response = await fetch('http://localhost:4000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Enviamos los datos del formulario
      });

      const data = await response.json();

      if (response.ok) {
        // Guardamos los datos del usuario y el token en localStorage
        localStorage.setItem('user', JSON.stringify({
          first_name: data.result.first_name,
          last_name: data.result.last_name,
          token: data.token,
        }));

        // Si la respuesta es exitosa, redirigimos al usuario a la página de inicio
        router.push('/home');
      } else {
        alert(data.message || "Credenciales incorrectas.");  // Mostrar mensaje de error
      }
    } catch (error) {
      console.error("Error al intentar iniciar sesión:", error);
      alert("Error en la solicitud. Inténtalo de nuevo.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Iniciar Sesión</h1>
        <p className={styles.subtitle}>Bienvenido de nuevo. Inicia sesión para continuar.</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.label}>Correo Electrónico</label>
            <input
              type="email"
              id="username"
              className={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Contraseña</label>
            <input
              type="password"
              id="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.button}>Iniciar Sesión</button>
        </form>
        <p className={styles.forgotPassword}>
          <a href="#" className={styles.link}>¿Olvidaste tu contraseña?</a>
        </p>
        <p className={styles.footer}>
          No tienes una cuenta? <Link href="./registro" className={styles.link}>Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
