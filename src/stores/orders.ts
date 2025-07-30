import { defineStore } from 'pinia'
import type { dataOrders } from '@/types/api'

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    currentOrders: {
      data: [],
      links: {
        first: '',
        last: '',
        next: '',
        prev: null,
      },
    } as dataOrders,

    prevOrders: {
      data: [],
      links: {
        first: '',
        last: '',
        next: '',
        prev: null,
      },
    } as dataOrders,
  }),

  actions: {
    setCurrentOrders(data: dataOrders) {
      this.currentOrders = data
    },
    setPrevOrders(data: dataOrders) {
      this.prevOrders = data
    },
  },
})
