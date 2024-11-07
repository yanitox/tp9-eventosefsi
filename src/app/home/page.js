"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import img from '../../../kal.png';

const Home = () => {
  const [events, setEvents] = useState([]); // Estado para almacenar los eventos
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    const confirmed = window.confirm("¿Seguro que quieres cerrar la sesión?");
    if (confirmed) {
      window.location.href = "./"; // Redirigir a la página de inicio
    }
  };

  useEffect(() => {
    // Función para obtener los eventos de la API
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/event'); // URL correcta de tu API
        if (response.ok) {
          const data = await response.json();
          
          console.log("Datos recibidos:", data.paginacion.collection); // Log para verificar los datos
          setEvents(data.paginacion.collection); // Ajuste según la estructura real de los datos
        } else {
          console.error("Error al obtener los eventos:", response.statusText);
        }
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
      }
    };

    fetchEvents(); // Llamada a la API al montar el componente
  }, []); // El array vacío asegura que se ejecute solo una vez cuando el componente se monte

  useEffect(() => {
    // Cargar el JavaScript de Bootstrap
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";
    script.integrity = "sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz";
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);
  }, []);

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

        <h1 className={styles.title}>Listado de Eventos</h1>
        <div className={styles.eventList}>
          {events.length > 0 ? (
            events.map(event => (
              <div key={event.id} className={styles.eventCard}>
                <h2 className={styles.eventTitle}>{event.name}</h2>
                <p className={styles.eventDate}>{new Date(event.start_date).toLocaleDateString()}</p>
                <p className={styles.eventDescription}>{event.description}</p>
                <button className={styles.button}>
                  <Link href={`/saberMas?id=${event.id}`} className={styles.linkylinky}>Más Información</Link>
                  
                </button>
              </div>

            ))
          ) : (
            
            <p>Cargando eventos...</p>
            
          )}
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

export default Home;
