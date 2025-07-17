import axios from 'axios'

const api = axios.create({
  baseURL: 'https://109.73.206.144:6969/api',
  // headers: {
  //   Authorization: 'E6kUTYrYwZq2tN4QEtyzsbEBk3ie',
  // },
})

// const params = {
//   key: 'E6kUTYrYwZq2tN4QEtyzsbEBk3ie',
//   dateFrom: '2025-07-16',
//   dateTo: '2025-07-17',
//   limit: '150',
// }

export function getOrders(params: Record<string, string>) {
  return api.get('/orders', { params })
}

export function getSales(params: Record<string, string>) {
  return api.get('/sales', { params })
}

export function getStocks(params: Record<string, string>) {
  return api.get('/stocks', { params })
}

export function getIncomes(params: Record<string, string>) {
  return api.get('/incomes', { params })
}
