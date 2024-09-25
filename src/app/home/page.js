"use client";
import React from 'react';
import Link from 'next/link';
import styles from './home.module.css'
import Layout from '../components/Layout';


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
  // Agrega más eventos según sea necesario
];

const Home = ({ user }) => {
  return (
    <Layout user={user}>
      <div className={styles.container}>
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
    </Layout>
  );
};

export default Home;
