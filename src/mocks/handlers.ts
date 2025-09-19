import { delay, http, HttpResponse } from 'msw';
import { sign } from './jsonwebtoken';

const mockUsers = [
  {
    id: '1',
    email: 'admin@tenpo.com',
    password: 'admin123',
    name: 'Admin User',
  },
];

// Generate 2000 mock users for the list
const generateMockUsers = (): Array<{
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin: string;
}> => {
  const roles = ['admin', 'user', 'moderator', 'viewer'];
  const statuses: ('active' | 'inactive')[] = ['active', 'inactive'];
  const firstNames = [
    'Juan',
    'María',
    'Carlos',
    'Ana',
    'Luis',
    'Carmen',
    'Pedro',
    'Laura',
    'Diego',
    'Sofia',
  ];
  const lastNames = [
    'García',
    'Rodríguez',
    'Martínez',
    'López',
    'González',
    'Pérez',
    'Sánchez',
    'Ramírez',
    'Torres',
    'Flores',
  ];

  return Array.from({ length: 2000 }, (_, index) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const role = roles[Math.floor(Math.random() * roles.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    return {
      id: (index + 1).toString(),
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index + 1}@example.com`,
      role,
      status,
      createdAt: new Date(
        Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
      ).toISOString(),
      lastLogin: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
    };
  });
};

const allMockUsers = generateMockUsers();

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

  http.get('/api/users', async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const search = url.searchParams.get('search') || '';
    const role = url.searchParams.get('role') || '';
    const status = url.searchParams.get('status') || '';

    let filteredUsers = allMockUsers;

    if (search) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (role) {
      filteredUsers = filteredUsers.filter((user) => user.role === role);
    }

    if (status) {
      filteredUsers = filteredUsers.filter((user) => user.status === status);
    }

    // Calculate pagination
    const total = filteredUsers.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const users = filteredUsers.slice(startIndex, endIndex);

    // Simulate network delay
    await delay(500);
    return HttpResponse.json({
      data: users,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  }),
];
