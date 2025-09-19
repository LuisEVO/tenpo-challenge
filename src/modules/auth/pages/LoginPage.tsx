import { useAuthContext } from '@/core/auth';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { FormField } from '../../../shared/ui/FormField';
import { getHttpErrorMessage } from '../../../shared/utils/get-http-error-message';
import type { LoginDto } from '../interfaces/login-dto';
import { authService } from '../services/auth-service';
import styles from './LoginPage.module.scss';

const loginSchema = z.object({
  email: z.email('Ingrese su correo electrónico y asegúrese de que sea válido'),
  password: z.string().nonempty('Ingrese su contraseña'),
});

const loginErrorsMap = new Map<number, string>([
  [
    401,
    'Verifique si los datos ingresados son correctos y vuelva a intentarlo',
  ],
]);

export const LoginPage: React.FC = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginDto) => {
    setLoading(true);
    setMessage('');

    try {
      const response = await authService.login(data);
      setToken(response.token);
      navigate('/admin');
    } catch (error) {
      const message = getHttpErrorMessage(error, loginErrorsMap);
      setMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <Card className={styles.page__card}>
        <Card.Header>
          <h1>Login</h1>
        </Card.Header>
        <Card.Content>
          <form
            className={styles.page__form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <FormField>
              <FormField.Label htmlFor="email">Email:</FormField.Label>
              <Input
                type="email"
                id="email"
                {...register('email')}
                state={errors.email ? 'error' : 'default'}
              />
              <FormField.Error error={errors.email?.message} />
            </FormField>

            <FormField>
              <FormField.Label htmlFor="password">Password:</FormField.Label>
              <Input
                type="password"
                id="password"
                {...register('password')}
                state={errors.password ? 'error' : 'default'}
              />
              <FormField.Error error={errors.password?.message} />
            </FormField>

            {message && <div className={styles.page__message}>{message}</div>}

            <Button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Card.Content>
      </Card>
    </div>
  );
};
