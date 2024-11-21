"use client";
import React, { useState } from 'react';
import { useUser } from '../context/UserContext';  // Importamos el hook para acceder al contexto
import styles from './contacto.module.css';  // Tu archivo de estilos
import Link from 'next/link';

const Contacto = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const { saveUserData } = useUser();  // Accedemos a la función para guardar los datos en el contexto

  const handleSubmit = (e) => {
    e.preventDefault();

    // Guardamos los datos del formulario en el contexto
    saveUserData({
      nombre,
      email,
      mensaje,
    });

    console.log('Formulario de contacto enviado:', { nombre, email, mensaje });

    // Aquí podrías agregar la lógica para enviar los datos a un backend, por ejemplo.
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Formulario de Contacto</h1>
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
            <label htmlFor="mensaje" className={styles.label}>Mensaje</label>
            <textarea
              id="mensaje"
              className={styles.input}
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.button}>Enviar</button>
        </form>
      </div>
      <div className={styles.mapContainer}>
        {/* Aquí podrías agregar tu mapa */}
        <div className={styles.map}>Mapa de contacto</div>
      </div>
    </div>
  );
};

export default Contacto;
