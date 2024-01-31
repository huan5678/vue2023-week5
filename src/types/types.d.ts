declare module '*.vue' {
  // import {DefineComponent} from 'vue';
  // const component: DefineComponent<{}, {}, Vue>;
  // export default component;
  import Vue from 'vue';
  export default Vue;
}

type Product = {
  id?: string;
  title: string;
  category: string;
  content: string;
  description: string;
  imageUrl: string;
  imagesUrl: string[];
  is_enabled: string | number | boolean;
  origin_price: number;
  price: number;
  unit: string;
  imageTemp?: string;
  top?: boolean | string;
};

type FormStatus = 'new' | 'edit';

type ApiProductResponse = {
  success: boolean;
  products: Product[];
};

type Coupon = {
  id?: string;
  title: string;
  due_date: number;
  percent: number;
  code: string;
  is_enabled: number;
};

type Cart = {
  id?: string;
  product_id: string;
  qty: number;
  total: number;
  product?: Product;
  final_total?: number;
};

type ApiCartResponse = {
  success: boolean;
  data: {
    carts: Cart[];
    total: number;
    final_total: number;
  };
  messages: string[];
};

type PostOrder = {
  user: {
    name: string;
    email: string;
    tel: string;
    address: string;
  };
  message?: string;
};

type ApiPostOrderResponse = {
  success: boolean;
  message: string;
  total: number;
  create_at: number;
  orderId: string;
};

type Order = PostOrder & {
  create_at: number;
  id: string;
  is_paid: boolean;
  products: {
    id: string;
    product_id: string;
    qty: number;
  }[];
  num?: number;
  total?: number;
};

type Pagination = {
  total_pages: number;
  current_page: number;
  has_pre: boolean;
  has_next: boolean;
  category: string;
};

type ApiGetOrdersResponse = {
  success: boolean;
  orders: Order[];
  pagination: Pagination;
  messages: string[];
};

type ApiGetOrderResponse = {
  success: boolean;
  order: Order;
};

type ApiPostOrderResponse = Order & {
  success: boolean;
};

type PaymentData = {
  name: string;
  email: string;
  tel: string;
  address: string;
};
