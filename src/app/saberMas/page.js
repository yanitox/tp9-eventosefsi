"use client";
import React, { useState, useEffect} from 'react';
import styles from './saberMas.module.css';
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import img from '../../../kal.png';


const SaberMas = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleAccordion = () => {
        setIsOpen(!isOpen);
      };
      const handleLogout = () => {
        const confirmed = window.confirm("¿Seguro que quieres cerrar la sesión?");
        if (confirmed) {
          window.location.href = "./";
        }
      };

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

    )
}

export default SaberMas;