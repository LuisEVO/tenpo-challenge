import { useAuthContext } from '@/core/auth';
import { Button } from '@/shared/ui/Button';
import React from 'react';
import styles from './HomePage.module.scss';

// TODO: for future improvements, logout could a be an http request that invalidates the token
export const HomePage: React.FC = () => {
  const { user, clearToken } = useAuthContext();

  const listItems = ['Usuarios', 'Configuración', 'Reportes', 'Soporte'];

  return (
    <div className={styles.container}>
      <header className={styles.toolbar}>
        <span className={styles.welcome}>Bienvenido {user?.email}</span>
        <Button onClick={clearToken}>Cerrar Sesión</Button>
      </header>

      <main className={styles.content}>
        <ul className={styles.list}>
          {listItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </main>
    </div>
  );
};
