export interface links {
  first: string
  last: string
  next: string
  prev: null
}

export interface dataElemStocks {
  barcode: number
  brand: string
  category: string
  date: string
  discount: string
  in_way_from_client: number
  in_way_to_client: number
  is_realization: boolean
  is_supply: boolean
  last_change_date: string
  nm_id: string
  price: string
  quantity: number
  quantity_full: number
  sc_code: number
  subject: string
  supplier_article: string
  tech_size: string
  warehouse_name: string
}

export interface dataStocks {
  data: dataElemStocks[]
  links: links
}

export interface dataElemSales {
  g_number: string
  date: string
  last_change_date: string
  supplier_article: string
  tech_size: string
  barcode: number
  total_price: string
  discount_percent: string
  is_supply: boolean
  is_realization: boolean
  promo_code_discount: null
  warehouse_name: string
  country_name: string
  oblast_okrug_name: string
  region_name: string
  income_id: number
  sale_id: string
  odid: null
  spp: string
  for_pay: string
  finished_price: string
  price_with_disc: string
  nm_id: number
  subject: string
  category: string
  brand: string
  is_storno: null
}

export interface dataSales {
  data: dataElemSales[]
  links: links
}

export interface dataElemOrders {
  g_number: string
  date: string
  last_change_date: string
  supplier_article: string
  tech_size: string
  barcode: number
  total_price: string
  discount_percent: number
  warehouse_name: string
  oblast: string
  income_id: number
  odid: string
  nm_id: number
  subject: string
  category: string
  brand: string
  is_cancel: boolean
  cancel_dt: null
}

export interface dataOrders {
  data: dataElemOrders[]
  links: links
}

export interface dataElemIncomes {
  income_id: number
  number: string
  date: string
  last_change_date: string
  supplier_article: string
  tech_size: string
  barcode: number
  quantity: number
  total_price: string
  date_close: string
  warehouse_name: string
  nm_id: number
}

export interface dataIncomes {
  data: dataElemIncomes[]
  links: links
}
