import { useAuthContext } from '@/core/auth';
import { Button } from '@/shared/ui/Button';
import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';

// TODO: for future improvements, logout could a be an http request that invalidates the token
export const Layout: React.FC = () => {
  const { user, clearToken } = useAuthContext();

  return (
    <div className={styles.container}>
      <header className={styles.toolbar}>
        <span className={styles.welcome}>Bienvenido {user?.email}</span>
        <Button onClick={clearToken}>Cerrar Sesión</Button>
      </header>

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};
