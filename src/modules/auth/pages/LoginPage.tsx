import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Zod schema for validation
const loginSchema = z.object({
  email: z.email('Ingrese un correo válido'),
  password: z.string('Ingrese una contraseña'),
});

// Type inference from Zod schema
type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        setMessage(`Login successful! Token: ${responseData.token}`);
        // Store token in localStorage for future use
        localStorage.setItem('token', responseData.token);
        reset(); // Clear form after successful login
      } else {
        setMessage(`Error: ${responseData.message}`);
      }
    } catch (error) {
      setMessage(
        `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" {...register('email')} />
          {errors.email && (
            <div style={{ color: 'red' }}>{errors.email.message}</div>
          )}
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" {...register('password')} />
          {errors.password && (
            <div style={{ color: 'red' }}>{errors.password.message}</div>
          )}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
};
