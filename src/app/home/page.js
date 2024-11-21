"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import img from '../../../kal.png';

const Home = () => {
  const [events, setEvents] = useState([]);
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

    // Obtener eventos desde el backend
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:4000/api/event');
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          console.error("Error al obtener los eventos:", response.statusText);
        }
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
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

        <h1 className={styles.title}>Listado de Eventos</h1>
        <div className={styles.eventList}>
          {isLoading ? (
            <p>Cargando eventos...</p>
          ) : events.length > 0 ? (
            events.map(event => (
              <div key={event.id} className={styles.eventCard}>
                <h2 className={styles.eventTitle}>{event.name}</h2>
                <p className={styles.eventDate}>{new Date(event.start_date).toLocaleDateString()}</p>
                <p className={styles.eventDescription}>{event.description}</p>
                <Link href={`/saberMas?id=${event.id}`} className={styles.button}>
                  Más Información
                </Link>
              </div>
            ))
          ) : (
            <p>No se encontraron eventos.</p>
          )}
        </div>
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

export default Home;
