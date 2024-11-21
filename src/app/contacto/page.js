"use client";
import React, { useState, useEffect } from 'react';
import { UserProvider, useUser } from '../context/UserContext'; // Importar el UserProvider y el hook
import styles from './contacto.module.css';  // Tu archivo de estilos
import Link from 'next/link';
import Image from 'next/image';
import img from '../../../kal.png';

const Contacto = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null); // Estado para guardar la información del usuario

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    if (window.confirm("¿Seguro que quieres cerrar la sesión?")) {
      localStorage.removeItem("user"); // Elimina los datos del usuario
      window.location.href = "./"; // Redirige a la página de login
    }
  };
  
  useEffect(() => {
    // Obtener los datos del usuario desde localStorage
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (loggedUser) {
      setUser(loggedUser); // Actualiza el estado con la información del usuario
    }
  }, []); // El efecto se ejecuta solo al montar el componente


  return (
    <>
    <div className={styles.container}>
        <nav className={styles.navbar}>
          <div className={styles.navLinks}>
            <Link href="/home" className={styles.navLink}>Home</Link>
            <Link href="/contacto" className={styles.navLink}>Contacto</Link>
          </div>
      <Image src={img} className={styles.logo} width={200} height={100} />
      <div className={styles.userMenu}>
            <button 
              className={styles.userButton} 
              onClick={toggleModal}
              aria-expanded={isOpen}
            >
              👤
            </button>
            {isOpen && user && (
              <div className={styles.modal}>
                <p className={styles.greeting}>
                  ¡Hola {user.first_name} {user.last_name}!
                </p>
                <button className={styles.logoutButton} onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
    </nav>

        <h1 className={styles.title}>Formulario de Contacto</h1>
        <form  className={styles.form}>
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
      
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>&copy; 2024 Mi Página Web. Todos los derechos reservados.</p>
          <div className={styles.socialLinks}>
            <Link href="#" className={styles.socialLink}>Facebook</Link>
            <Link href="#" className={styles.socialLink}>Twitter</Link>
            <Link href="#" className={styles.socialLink}>Instagram</Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default function Page() {
  return (
    <UserProvider>
      <Contacto/>
    </UserProvider>
  );
}
