import { useAuth } from "../contexts/AuthContext";
import api from "../axios";

const LogoutButton = () => {
  const { setUser } = useAuth(); // 👈 Agora funciona

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      setUser(null); // 👈 Atualiza o estado global
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return <button onClick={handleLogout}>Sair</button>;
};

export default LogoutButton;