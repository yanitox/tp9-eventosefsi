"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './contacto.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import img from '../../../kal.png';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Mensaje enviado!');
    setFormData({ name: '', email: '', message: '' });
  };

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

  useEffect(() => {
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
        <Image src={img} className={styles.logo} width={200} height={100} />
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

      <h1 className={styles.title}>Contáctenos</h1>

      {/* Formulario y Mapa */}
      <div className={styles.formContainer}>
  <form className={styles.form} onSubmit={handleSubmit}>
    <h2 className={styles.subtitle}>Enviar un Mensaje</h2>
    <div className={styles.formGroup}>
      <label className={styles.label} htmlFor="name">Nombre:</label>
      <input
        className={styles.input}
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
    </div>
    <div className={styles.formGroup}>
      <label className={styles.label} htmlFor="email">Email:</label>
      <input
        className={styles.input}
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
    </div>
    <div className={styles.formGroup}>
      <label className={styles.label} htmlFor="message">Mensaje:</label>
      <textarea
        className={styles.textarea}
        id="message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
      ></textarea>
    </div>
    <button type="submit" className={styles.submitButton}>Enviar</button>
  </form>

  <div className={styles.mapContainer}>
    <h2 className={styles.subtitle}>Ubicación</h2>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345091636!2d144.95373531531714!3d-37.81627997975197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f6b20b3%3A0xf3a618c06d1240b7!2sCalle%20Ejemplo%20123%2C%20Ciudad%2C%20Pa%C3%ADs!5e0!3m2!1ses!2sus!4v1603912402367!5m2!1ses!2sus"
      width="100%"
      height="300"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
    ></iframe>
  </div>
</div>

      {/* Información de contacto */}
      <div className={styles.contactInfo}>
        <h2 className={styles.subtitle}>Información de Contacto</h2>
        <p><strong>Email:</strong> info@tuempresa.com</p>
        <p><strong>Teléfono:</strong> +1 (234) 567-890</p>
        <p><strong>Dirección:</strong> Calle Ejemplo 123, Ciudad, País</p>
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

export default Contact;
