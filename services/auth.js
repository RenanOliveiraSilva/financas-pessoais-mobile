import api from './api';

export const login = async (email, senha) => {
  const response = await api.post('/usuarios/autenticar', {
    email,
    senha,
  });

  return response.data; // aqui pode vir o usuário direto
};
