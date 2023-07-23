import axios from 'axios';

const baseURL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL,
    
});

export const fetchPessoas = async () => {
    try {
        const response = await api.get('/pessoas/buscarTodasPessoas');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar pessoas:', error);
        throw error;
    }
};

export const fetchPessoaPorId = async (id) => {
    try {
        const response = await api.get(`/pessoas/buscarPessoaPorId/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar pessoa por ID ${id}:`, error);
        throw error;
    }
};

export const buscarPorNomeOrRazaoSocial = async (nome) => {
    try {
        const response = await api.get('/pessoas/buscarPorNomeOrRazaoSocial', {
            params: { nome: nome },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar pessoas por nome ou razão social:', error);
        return [];
    }
};

export const excluirPessoaPorId = async (id) => {
    try {
        const response = await api.delete(`/pessoas/excluirPessoaPorId/${id}`);
        return response.status === 204; // Retorna true se a exclusão foi bem-sucedida (204 - No Content)
    } catch (error) {
        console.error(`Erro ao excluir pessoa por ID ${id}:`, error);
        return false;
    }
};

export const cadastrarPessoa = async (pessoaDTO) => {
    try {
        const response = await api.post('/pessoas/cadastrarPessoa', pessoaDTO);
        return response.data;
    } catch (error) {
        console.error('Erro ao cadastrar pessoa:', error);
        throw error;
    }
};

export const atualizarPessoa = async (id, pessoaDTO) => {
    try {
        const response = await api.put(`/pessoas/atualizarPessoa/${id}`, pessoaDTO);
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar pessoa com ID ${id}:`, error);
        throw error;
    }
};

export const excluirEnderecoPorId = async (id) => {
    try {
      const response = await api.delete(`/enderecos/excluirEnderecoPorId/${id}`);
      return response.status === 204;
    } catch (error) {
      console.error(`Erro ao excluir endereço por ID ${id}:`, error);
      return false;
    }
  };