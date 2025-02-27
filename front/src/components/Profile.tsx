// src/components/Profile.tsx
import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Carregando...</div>;

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h2>Bem-vindo, {user?.name}</h2>
          <p>Email: {user?.email}</p>
        </div>
      ) : (
        <div>Faça login para continuar</div>
      )}
    </div>
  );
};