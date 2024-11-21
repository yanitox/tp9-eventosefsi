"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';  // Usar useSearchParams en lugar de useRouter
import styles from './saberMas.module.css';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import img from '../../../kal.png';

const SaberMas = () => {
  const [event, setEvent] = useState(null);  // Almacena la información del evento
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();  // Acceder a los parámetros de búsqueda

  // Togglear la vista del perfil
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    const confirmed = window.confirm("¿Seguro que quieres cerrar la sesión?");
    if (confirmed) {
      window.location.href = "./";
    }
  };

  useEffect(() => {
    const fetchEvent = async () => {
      const id = searchParams.get('id');  // Obtener el ID del evento desde la URL
      if (id) {
        try {
          const response = await fetch(`http://localhost:4000/api/event/${id}`);  // Asumiendo que la API devuelve el evento por ID
          if (response.ok) {
            const data = await response.json();
            console.log("Evento recibido:", data);  // Depuración: mostrar los datos recibidos
            setEvent(data);  // Guardar la información del evento
          } else {
            console.error("Error al obtener el evento:", response.statusText);
          }
        } catch (error) {
          console.error("Error al hacer la solicitud:", error);
        }
      } else {
        console.error("No se encontró el parámetro 'id' en la URL");
      }
    };

    fetchEvent();  // Llamar a la función para obtener el evento

  }, [searchParams]);  // Esto se ejecutará cada vez que cambien los parámetros de búsqueda

  // Si no hay evento, mostrar mensaje de carga
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
          <Image
            src={img}
            className={styles.logo}
            width={200}
            height={100}
          />
          <div className={`accordion ${styles.accordion}`} id="accordionExample">
            <div className={`accordion-item ${styles.accordionItem}`}>
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  onClick={toggleAccordion}
                  aria-expanded={isOpen}
                >
                  👤
                </button>
              </h2>
              <div className={`${styles.accordionBody} ${isOpen ? styles.show : ''}`}>
                <p>¡Hola!</p>
                <button className={styles.logoutButton} onClick={handleLogout}>Cerrar sesión</button>
              </div>
            </div>
          </div>
        </nav>

        <div className={styles.eventDetails}>
          <h1 className={styles.eventTitle}>{event.name}</h1>
          <p className={styles.eventDate}>{new Date(event.start_date).toLocaleDateString()}</p>
          <p className={styles.eventDescription}>{event.description}</p>
          <p className={styles.eventLocation}>asistencia maxima: {event.max_assistance}</p>
          <p className={styles.eventCategory}>precio: {event.price}</p>
          <p className={styles.eventDuration}>Duración: {event.duration_in_minutes} minutos</p>
          <Link href="/home" className={styles.backButton}>Volver al listado</Link>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>© 2024 Eventos. Todos los derechos reservados.</p>
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
