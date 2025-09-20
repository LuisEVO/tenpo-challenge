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

// Generate 2000 mock articles for the list
const generateMockArticles = (): Array<{
  id: string;
  title: string;
  summary: string;
  author: string;
  publishedAt: string;
  image: string;
  tags: string[];
}> => {
  const authors = [
    'María García',
    'Carlos López',
    'Ana Martínez',
    'Luis Rodríguez',
    'Carmen Sánchez',
    'Pedro González',
    'Laura Pérez',
    'Diego Torres',
    'Sofia Flores',
    'Juan Ramírez',
  ];
  const tags = [
    'innovación',
    'tendencia',
    'análisis',
    'tutorial',
    'noticia',
    'opinión',
    'investigación',
    'guía',
    'caso de estudio',
    'entrevista',
    'review',
    'actualización',
  ];

  const articleTitles = [
    'El futuro de la inteligencia artificial en el trabajo',
    'Cómo optimizar tu productividad diaria',
    'Tendencias en desarrollo web para 2024',
    'La importancia de la ciberseguridad empresarial',
    'Guía completa de React y TypeScript',
    'Estrategias de marketing digital efectivas',
    'El impacto del cambio climático en la economía',
    'Tecnologías emergentes en el sector salud',
    'Cómo construir una cultura empresarial sólida',
    'La revolución de las criptomonedas',
  ];

  const summaries = [
    'Un análisis profundo sobre cómo la IA está transformando el mundo laboral',
    'Técnicas probadas para aumentar tu eficiencia personal y profesional',
    'Las últimas tecnologías y frameworks que dominarán el desarrollo web',
    'Mejores prácticas para proteger tu empresa de amenazas digitales',
    'Todo lo que necesitas saber para dominar React con TypeScript',
    'Estrategias comprobadas para hacer crecer tu negocio online',
    'Cómo el cambio climático afecta los mercados globales',
    'Innovaciones tecnológicas que están revolucionando la medicina',
    'Elementos clave para crear un ambiente de trabajo positivo',
    'El panorama actual y futuro de las monedas digitales',
  ];

  return Array.from({ length: 2000 }, (_, index) => {
    const title =
      articleTitles[Math.floor(Math.random() * articleTitles.length)];
    const summary = summaries[Math.floor(Math.random() * summaries.length)];
    const author = authors[Math.floor(Math.random() * authors.length)];
    const articleTags = tags
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 2);

    return {
      id: (index + 1).toString(),
      title: `${title} ${index + 1}`,
      summary,
      author,
      publishedAt: new Date(
        Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
      ).toISOString(),
      image: `https://picsum.photos/400/250?random=${index + 1}`,
      tags: articleTags,
    };
  });
};

const allMockArticles = generateMockArticles();

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

  http.get('/api/articles', async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '50');

    // Calculate pagination
    const total = allMockArticles.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const articles = allMockArticles.slice(startIndex, endIndex);

    // Simulate network delay
    await delay(500);
    return HttpResponse.json({
      data: articles,
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
