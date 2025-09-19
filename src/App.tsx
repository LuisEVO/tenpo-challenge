import { AuthProvider } from '@/core/auth';
import { AppRouter } from '@/core/routes/AppRouter';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
