"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './contacto.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    alert('Mensaje enviado!'); // Aquí puedes integrar la lógica de envío
    setFormData({ name: '', email: '', message: '' }); // Reinicia el formulario
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/contacto" className={styles.navLink}>Contacto</Link>
        </div>
      </nav>

      <h1 className={styles.title}>Contáctenos</h1>

      <div className={styles.contactInfo}>
        <h2 className={styles.subtitle}>Información de Contacto</h2>
        <p><strong>Email:</strong> info@tuempresa.com</p>
        <p><strong>Teléfono:</strong> +1 (234) 567-890</p>
        <p><strong>Dirección:</strong> Calle Ejemplo 123, Ciudad, País</p>
      </div>

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
    </div>
  );
};

export default Contact;
