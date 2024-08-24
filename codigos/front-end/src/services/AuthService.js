export const login = async (username, password) => {
  const response = await fetch('http://localhost:3002/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }), // Envia os dados do usuário
  });

  const data = await response.json(); // Lê a resposta JSON do servidor
  if (!response.ok) {
    throw new Error(data.message || 'Erro ao fazer login'); // Lida com erros
  }
  return data; // Retorna os dados recebidos do backend
};
