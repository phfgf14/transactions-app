/**
 * O axios é uma biblioteca para
 * requisições HTTP bem mais intuitiva
 * e flexível que o comando fetch. Uso
 * bastante para POST, PUT e DELETE
 */
import axios from 'axios';

/**
 * Link da API
 */
const API_URL = '/api/transaction';

async function getAllTransactions(period) {
  const res = await axios.get(`${API_URL}/period=${period}`);
  return res;
}

async function getTransaction(id) {
  const res = await axios.get(`${API_URL}/id=${id}`);
  return res;
}

/**
 * Inserção no back end
 */
async function insertTransaction(transaction) {
  const response = await axios.post(API_URL, transaction);
  return response.data.id;
}

/**
 * Atualização no back end
 */
async function updateTransaction(transaction) {
  const response = await axios.put(
    `${API_URL}/id=${transaction._id}`,
    transaction
  );
  return response.data;
}

/**
 * Exclusão no back end
 */
async function deleteTransaction(transaction) {
  const response = await axios.delete(`${API_URL}/id=${transaction._id}`);
  return response;
}

/**
 * Tornando todas as funções
 * abaixo disponíveis para
 * serem utilizadas por outros
 * arquivos
 */
export {
  getAllTransactions,
  getTransaction,
  insertTransaction,
  updateTransaction,
  deleteTransaction,
};
