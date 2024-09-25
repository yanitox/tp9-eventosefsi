"use client";
import React from 'react';
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
  return (
    
    <div className={styles.container}>
      <nav className={styles.navbar}>
       
        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/contacto" className={styles.navLink}>Contacto</Link>
          
        </div>
        <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
      👤
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div class="accordion-body">
       
      </div>
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
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
//<Link href="/" className={styles.logo}></Link>
export default Home;
