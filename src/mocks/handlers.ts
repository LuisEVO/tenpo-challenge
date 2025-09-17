import { delay, http, HttpResponse } from 'msw';
import { sign, verify } from './jsonwebtoken';

const mockUsers = [
  {
    id: '1',
    email: 'admin@tenpo.com',
    password: 'admin123',
    name: 'Admin User',
  },
];

const JWT_SECRET = 'tenpo-secret-key-for-development';

export const handlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as {
      email: string;
      password: string;
    };
    const { email, password } = body;

    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return HttpResponse.json(
        {
          message: 'Invalid credentials',
        },
        { status: 401 }
      );
    }

    const token = sign({ sub: user.id, email: user.email }, JWT_SECRET);

    await delay(1000);

    return HttpResponse.json({
      token,
    });
  }),

  http.get('/api/auth/verify', ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return HttpResponse.json(
        {
          error: 'Token not provided',
        },
        { status: 401 }
      );
    }

    try {
      const payload = verify<{ sub: string; email: string }>(token, JWT_SECRET);

      return HttpResponse.json({
        user: {
          id: payload.sub,
          email: payload.email,
        },
      });
    } catch {
      return HttpResponse.json(
        {
          error: 'Invalid token',
        },
        { status: 401 }
      );
    }
  }),
];
