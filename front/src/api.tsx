import api from "./axios";

export const initializeCSRF = async (): Promise<void> => {
    await api.get("/sanctum/csrf-cookie");
};
