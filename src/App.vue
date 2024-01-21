<script setup lang="ts">
  import {ref, onMounted, Ref, computed} from 'vue';
  import axios from 'axios';
  import Cookies from 'js-cookie';

  import EditModal from '@/components/EditModal.vue';
  import ProductList from '@/components/ProductList.vue';
  import LoginForm from '@/components/LoginForm.vue';
  import {Button} from '@/components/ui/button';
  import {useToast} from '@/components/ui/toast/use-toast';
  import {Toaster} from '@/components/ui/toast';
  import ProductDetail from './components/ProductDetail.vue';
  import {DialogTrigger, Dialog} from './components/ui/dialog';

  const baseUrl = 'https://ec-course-api.hexschool.io/v2';

  const productData = ref({
    success: false,
    products: [],
  });
  const showMessage = ref(false);
  const message = ref('');
  const isLoading = ref(false);
  const isLoggedIn = ref(false);
  const token = ref('');

  const cookieToken = Cookies.get('token');

  axios.defaults.headers.common.Authorization = `${token.value || cookieToken || ''}`;

  const formStatus: Ref<FormStatus> = ref('new');
  const openProductForm = ref(false);

  const {toast} = useToast();

  const temp: Ref<Product> = ref({
    title: '',
    category: '',
    content: '',
    description: '',
    imageUrl: '',
    imagesUrl: [],
    is_enabled: 0,
    origin_price: 0,
    price: 0,
    unit: '',
  });

  function handleShowMessage(bool: boolean) {
    showMessage.value = bool;
    if (bool) {
      toast({
        title: message.value,
      });
    }
  }

  async function handleCheck() {
    try {
      const res = await axios.post(`${baseUrl}/api/user/check`, {});
      if (res.data.success) {
        isLoggedIn.value = true;
        message.value = '登入成功';
        handleShowMessage(true);
        return true;
      }
    } catch (error: unknown) {
      if ((error as any)?.response?.data?.success === false) {
        message.value = (error as any).response?.data?.message;
        handleShowMessage(true);
        isLoggedIn.value = false;
      }
    }
  }

  async function handleGetAllProduct() {
    try {
      isLoading.value = true;
      const res = await axios.get(`${baseUrl}/api/synthwave/admin/products/all`);
      productData.value = res.data;
      isLoading.value = false;
    } catch (error) {
      if ((error as any)?.response?.data?.success === false) {
        message.value = `取得商品失敗 ${(error as any).response?.data?.message}`;
        handleShowMessage(true);
      }
    }
  }

  const itemsPerPage = 5;
  const currentPage = ref(1);

  const paginatedData = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const productArray = Object.values(productData.value.products);
    return productArray.slice(startIndex, endIndex);
  });

  const totalPages = computed(() =>
    Math.ceil(Object.keys(productData.value?.products).length / itemsPerPage)
  );

  function handlePageChange(newPage: number) {
    currentPage.value = newPage;
  }

  async function handleAddProduct() {
    try {
      isLoading.value = true;
      const res = await axios.post(`${baseUrl}/api/synthwave/admin/product`, {
        data: {
          ...temp.value,
          is_enabled: 0,
        },
      });
      message.value = res.data.message;
      handleShowMessage(true);
      handleReset();
      handleGetAllProduct();
    } catch (error: unknown) {
      if ((error as any)?.response?.data?.success === false) {
        message.value = `新增商品失敗 ${(error as any).response?.data?.message}`;
        handleShowMessage(true);
      }
    }
  }

  function handleEditProduct(product: Product) {
    openProductForm.value = true;
    formStatus.value = 'edit';
    temp.value = {
      ...product,
      origin_price: parseInt(product.origin_price.toString(), 10),
      price: parseInt(product.price.toString(), 10),
    };
  }

  async function handleUpLoadMainImage(e: Event) {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const formData = new FormData();
    formData.append('file-to-upload', file);
    try {
      const {data} = await axios.post(`${baseUrl}/api/synthwave/admin/upload`, formData);
      temp.value.imageUrl = data.imageUrl;
    } catch (error: unknown) {
      if ((error as any)?.response?.data?.success === false) {
        message.value = `上傳圖片失敗 ${(error as any).response?.data?.message}`;
        handleShowMessage(true);
      }
    }
  }

  async function handleUpLoadProductImage(e: Event) {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const formData = new FormData();
    formData.append('file-to-upload', file);
    try {
      const {data} = await axios.post(`${baseUrl}/api/synthwave/admin/upload`, formData);
      temp.value.imagesUrl.push(data.imageUrl);
    } catch (error: unknown) {
      if ((error as any)?.response?.data?.success === false) {
        message.value = `上傳圖片失敗 ${(error as any).response?.data?.message}`;
        handleShowMessage(true);
      }
    }
  }

  async function handleDeleteProduct(id: string) {
    try {
      isLoading.value = true;
      const res = await axios.delete(`${baseUrl}/api/synthwave/admin/product/${id}`);
      message.value = res.data.message;
      handleShowMessage(true);
      handleReset();
      handleGetAllProduct();
    } catch (error: unknown) {
      if ((error as any)?.response?.data?.success === false) {
        message.value = `刪除商品失敗 ${(error as any).response?.data?.message}`;
        handleShowMessage(true);
      }
    }
  }

  function handleReset() {
    temp.value = {
      title: '',
      category: '',
      content: '',
      description: '',
      imageUrl: '',
      imagesUrl: [],
      is_enabled: 0,
      origin_price: 0,
      price: 0,
      unit: '',
      top: false,
    };
  }

  function handleTarget(product: Product) {
    handleReset();
    openProductForm.value = false;
    temp.value = product;
  }

  function handleCloseModal() {
    openProductForm.value = false;
    handleReset();
  }

  function handleRemoveProductImage(index: number) {
    temp.value.imagesUrl.splice(index, 1);
  }

  function handleSetMessage(msg: string) {
    message.value = msg;
  }

  const resultFormStatus = computed(() => {
    return formStatus.value === 'new' ? '新增' : '編輯';
  });

  const dynamicIsLoading = computed(() => {
    return isLoading.value;
  });

  function handleLoading(bool: boolean) {
    isLoading.value = bool;
  }

  onMounted(async () => {
    const isLogin = await handleCheck();
    if (isLogin) {
      handleGetAllProduct();
    }
  });
</script>

<template>
  <main class="container p-4 mx-auto space-y-4">
    <LoginForm v-if="!isLoggedIn" :isLoading="isLoading" :handleCheck="handleCheck" :handleLoading="handleLoading" />
    <div class="grid grid-cols-2 gap-4" v-if="isLoggedIn === true">
      <ProductList
        :productData="productData"
        :paginatedData="paginatedData"
        :totalPages="totalPages"
        :handlePageChange="handlePageChange"
        :handleTarget="handleTarget"
        :itemsPerPage="itemsPerPage"
        :currentPage="currentPage"
        :handleLoading="handleLoading"
      />
      <div class="p-4 space-y-2 border border-gray-200 rounded-lg shadow">
        <h2 class="text-2xl font-bold text-center">單一產品細節</h2>
        <ProductDetail
          v-if="temp.title.length > 0 && !openProductForm"
          :productData="productData"
          :handleReset="handleReset"
          :openProductForm="openProductForm"
          :temp="temp"
          :handleDeleteProduct="handleDeleteProduct"
        />
        <p v-else class="text-lg">請選擇一個商品查看</p>
        <Dialog v-model:open="openProductForm">
          <DialogTrigger as-child>
              <Button
                type="button"
                v-if="temp.title"
                class="w-full bg-gray-700 hover:bg-gray-800 text-gray-50"
                @click="
                  openProductForm = true; handleEditProduct(temp); formStatus = 'edit';
                "
                >編輯產品</Button
              >
              <Button
                type="button"
                class="w-full bg-blue-700 hover:bg-blue-800 text-gray-50 "
                @click="
                  openProductForm = true;
                  formStatus = 'new';
                  handleReset();
                "
                >新增產品</Button
              >
          </DialogTrigger>
          <EditModal
            v-if="openProductForm"
            :openProductForm="openProductForm"
            :formStatus="resultFormStatus"
            :temp="temp"
            :handleReset="handleReset"
            :handleAddProduct="handleAddProduct"
            :handleUpLoadMainImage="handleUpLoadMainImage"
            :handleCloseModal="handleCloseModal"
            :handleUpLoadProductImage="handleUpLoadProductImage"
            :handleRemoveProductImage="handleRemoveProductImage"
            :handleSetMessage="handleSetMessage"
            :handleShowMessage="handleShowMessage"
            :handleGetAllProduct="handleGetAllProduct"
            :isLoading="dynamicIsLoading"
            :handleLoading="handleLoading"
          />
        </Dialog>
      </div>
    </div>
    <Toaster />
  </main>
</template>
