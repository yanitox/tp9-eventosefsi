"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './saberMas.module.css';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import img from '../../../kal.png';

const SaberMas = () => {
  const [event, setEvent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const fetchEvent = async () => {
      const id = searchParams.get('id');
      if (id) {
        try {
          const response = await fetch(`http://localhost:4000/api/event/${id}`);
          if (response.ok) {
            const data = await response.json();
            setEvent(data);
          } else {
            console.error("Error al obtener el evento:", response.statusText);
          }
        } catch (error) {
          console.error("Error al hacer la solicitud:", error);
        }
      }
    };
    fetchEvent();
  }, [searchParams]);

  if (!event) {
    return <p>Cargando información del evento...</p>;
  }

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

        <div className={styles.eventDetails}>
          <div className={styles.eventCard}>
            <h1 className={styles.eventTitle}>{event.name}</h1>
            <p className={styles.eventDate}>{new Date(event.start_date).toLocaleDateString()}</p>
            <p className={styles.eventDescription}>{event.description}</p>
            <div className={styles.eventInfo}>
              <p><strong>Asistencia máxima:</strong> {event.max_assistance}</p>
              <p><strong>Precio:</strong> ${event.price}</p>
              <p><strong>Duración:</strong> {event.duration_in_minutes} minutos</p>
            </div>
            <Link href="/home" className={styles.backButton}>Volver al listado</Link>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>© 2024 Mi Página Web. Todos los derechos reservados.</p>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialLink}>Facebook</a>
            <a href="#" className={styles.socialLink}>Twitter</a>
            <a href="#" className={styles.socialLink}>Instagram</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default SaberMas;
