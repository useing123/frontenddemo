import axios from 'axios'

const api = axios.create({
  baseURL: 'https://fastapi-9a00.onrender.com/', // Обновите baseURL на ваш URL backend-сервера
  timeout: 5000, // Время ожидания ответа от сервера (в миллисекундах)
})

export default api
