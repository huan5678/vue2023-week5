import Cookies from 'js-cookie';
import axios from 'axios';

const baseUrl = 'https://ec-course-api.hexschool.io/v2';

const apiPath = 'synthwave';

const cookieToken = Cookies.get('token');

axios.defaults.headers.common.Authorization = `${cookieToken || ''}`;

export async function handleCheck() {
  try {
    const {data} = await axios.post(`${baseUrl}/api/user/check`, {});
    return data;
  } catch (error: unknown) {
    return Promise.reject(error);
  }
}

export async function handleGetProductsAll(): Promise<ApiProductResponse> {
  try {
    const {data} = await axios.get(`${baseUrl}/api/${apiPath}/products/all`);
    return data;
  } catch (error: unknown) {
    return Promise.reject(error);
  }
}

export async function handleGetProducts(page: string, category: string) {
  {
    try {
      const {data} = await axios.get(
        `${baseUrl}/api/${apiPath}/products?${category ? `&category=${category}` : ''}${
          page ? `&page=${page}` : ''
        }`
      );
      return data;
    } catch (error: unknown) {
      return Promise.reject(error);
    }
  }
}

export async function handleGetProduct(id: string) {
  try {
    const {data} = await axios.get(`${baseUrl}/api/${apiPath}/product/${id}`);
    return data;
  } catch (error: unknown) {
    return Promise.reject(error);
  }
}

export async function handleGetCart() {
  try {
    const {data} = await axios.get(`${baseUrl}/api/${apiPath}/cart`);
    return data;
  } catch (error: unknown) {
    return Promise.reject(error);
  }
}

export async function handleAddToCart(id: string, qty: number) {
  try {
    const {data} = await axios.post(`${baseUrl}/api/${apiPath}/cart`, {
      data: {
        product_id: id,
        qty,
      },
    });
    return data;
  } catch (error: unknown) {
    return Promise.reject(error);
  }
}

export async function handleEditCart(id: string, product: {id: string; qty: number}) {
  try {
    const {data} = await axios.put(`${baseUrl}/api/${apiPath}/cart/${id}`, {
      data: {
        product_id: product.id,
        qty: product.qty,
      },
    });
    return data;
  } catch (error: unknown) {
    return Promise.reject(error);
  }
}

export async function handleDeleteCart(id: string) {
  try {
    const {data} = await axios.delete(`${baseUrl}/api/${apiPath}/cart/${id}`);
    return data;
  } catch (error: unknown) {
    return Promise.reject(error);
  }
}

export async function handleDeleteAllCart() {
  try {
    const {data} = await axios.delete(`${baseUrl}/api/${apiPath}/carts`);
    return data;
  } catch (error: unknown) {
    return Promise.reject(error);
  }
}

export async function handlePostOrder(order: PostOrder) {
  try {
    const {data} = await axios.post(`${baseUrl}/api/${apiPath}/order`, {
      data: {
        order,
      },
    });
    return data;
  } catch (error: unknown) {
    return Promise.reject(error);
  }
}

export async function handleGetOrders(page: string) {
  try {
    const {data} = await axios.get(`${baseUrl}/api/${apiPath}/orders?page=${page}`);
    return data;
  } catch (error: unknown) {
    return Promise.reject(error);
  }
}

export async function handleGetOrder(id: string) {
  try {
    const {data} = await axios.get(`${baseUrl}/api/${apiPath}/order/${id}`);
    return data;
  } catch (error: unknown) {
    return Promise.reject(error);
  }
}

export async function handlePayOrder(paymentData: PaymentData) {
  try {
    const {data} = await axios.post(`${baseUrl}/api/${apiPath}/order`, {
      data: {
        user: {
          ...paymentData,
        },
      },
    });
    return data;
  } catch (error: unknown) {
    return Promise.reject(error);
  }
}

export async function handleGetAdminProducts() {
  try {
    const {data} = await axios.get(`${baseUrl}/api/${apiPath}/admin/products/all`);
    return data;
  } catch (error) {
    if ((error as any)?.response?.data?.success === false) {
      return Promise.reject(error);
    }
  }
}

export async function handleAddAdminProduct(product: Product) {
  try {
    const {data} = await axios.post(`${baseUrl}/api/${apiPath}/admin/product`, {
      data: {
        product,
      },
    });
    return data;
  } catch (error: unknown) {
    if ((error as any)?.response?.data?.success === false) {
      return Promise.reject(error);
    }
  }
}

export async function handleUpLoadImage(e: Event) {
  const target = e.target as HTMLInputElement;
  const file: File = (target.files as FileList)[0];
  const formData = new FormData();
  formData.append('file-to-upload', file);
  try {
    const {data} = await axios.post(`${baseUrl}/api/${apiPath}/admin/upload`, formData);
    return data.imageUrl;
  } catch (error: unknown) {
    if ((error as any)?.response?.data?.success === false) {
      return Promise.reject(error);
    }
  }
}

export async function handleDeleteAdminProduct(id: string) {
  try {
    const {data} = await axios.delete(`${baseUrl}/api/${apiPath}/admin/product/${id}`);
    return data;
  } catch (error: unknown) {
    if ((error as any)?.response?.data?.success === false) {
      return Promise.reject(error);
    }
  }
}
