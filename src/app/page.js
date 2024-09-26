"use client";
import React, { useState } from 'react';
import styles from "./page.module.css";
import Link from 'next/link';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login info:', { email, password });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Iniciar Sesión</h1>
        <p className={styles.subtitle}>Bienvenido de nuevo. Inicia sesión para continuar.</p>
        <form onSubmit={handleSubmit} className={styles.form}>
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
          <button type="submit" className={styles.button}><Link href="./home"> Iniciar Sesión </Link></button>
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