// Em desenvolvimento usa o back-end local. Em produção (Vercel, mesmo domínio) usa caminho relativo.
// Para apontar para outro servidor, defina VITE_API_URL.
const API_URL =
  import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? "http://localhost:3000" : "");

async function request(caminho, opcoes = {}) {
  let resposta;
  try {
    resposta = await fetch(`${API_URL}${caminho}`, {
      headers: { "Content-Type": "application/json" },
      ...opcoes,
    });
  } catch {
    throw new Error("Não foi possível conectar ao servidor. Verifique se o back-end está rodando.");
  }

  const dados = await resposta.json().catch(() => ({}));
  if (!resposta.ok) {
    throw new Error(dados.erro || "Erro inesperado. Tente novamente.");
  }
  return dados;
}

export const api = {
  // O back-end identifica o usuário por "login"; usamos o email como login.
  login: (email, senha) =>
    request("/api/usuarios/login", {
      method: "POST",
      body: JSON.stringify({ login: email, senha }),
    }),

  cadastrar: (email, senha) =>
    request("/api/usuarios", {
      method: "POST",
      body: JSON.stringify({ login: email, senha }),
    }),
};
