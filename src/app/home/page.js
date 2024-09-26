"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const events = [
  {
    id: 1,
    title: 'Concierto de Rock',
    date: '2024-10-10',
    description: 'Una noche llena de música rock en vivo.',
  },
  {
    id: 2,
    title: 'Feria de Comida',
    date: '2024-11-15',
    description: 'Disfruta de los mejores platillos de la región.',
  },
  {
    id: 3,
    title: 'Maratón Anual',
    date: '2024-12-05',
    description: 'Corre por una buena causa en nuestra maratón anual.',
  },
];

const Home = () => {
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
    // Cargar el JavaScript de Bootstrap
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";
    script.integrity = "sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz";
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);
  }, []);

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/contacto" className={styles.navLink}>Contacto</Link>
        </div>
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
        {events.map(event => (
          <div key={event.id} className={styles.eventCard}>
            <h2 className={styles.eventTitle}>{event.title}</h2>
            <p className={styles.eventDate}>{event.date}</p>
            <p className={styles.eventDescription}>{event.description}</p>
            <button className={styles.button}>Más Información</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
