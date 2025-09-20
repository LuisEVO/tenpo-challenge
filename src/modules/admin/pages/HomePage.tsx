import { Button } from '@/shared/ui/Button';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bienvenido al panel de administración</h1>
      <p className={styles.welcomeMessage}>
        Aquí puedes administrar los
        <Link to="../articles" className={styles.navigationLink}>
          <Button>Artículos</Button>
        </Link>
      </p>
    </div>
  );
};
