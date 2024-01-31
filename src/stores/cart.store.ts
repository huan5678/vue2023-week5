import {
  handleAddToCart,
  handleDeleteAllCart,
  handleDeleteCart,
  handleEditCart,
  handleGetCart,
} from '@/api';
import {defineStore} from 'pinia';
import {useMessageStore} from './message.store';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartData: [] as Cart[],
    final_total: 0,
    cartId: '',
    isCartOpen: false,
    isModalOpen: false,
  }),
  actions: {
    showMessage: async function (message: string) {
      const messageStore = useMessageStore();
      messageStore.showMessage(message);
    },
    getCartData: async function () {
      const {data} = await handleGetCart();
      this.cartData = data.carts;
      this.final_total = data.final_total;
      this.cartId = data.id;
    },
    performCartAction: async function (action: () => Promise<{success: boolean; message: string}>) {
      const {success, message} = await action();
      if (success) {
        this.showMessage(message);
        this.getCartData();
      }
    },
    openCart: function () {
      this.isCartOpen = true;
    },
    closeCart: function () {
      this.isCartOpen = false;
    },
    openModal: function () {
      this.isModalOpen = true;
    },
    closeModal: function () {
      this.isModalOpen = false;
    },
    addCartData: async function (id: string, qty: number) {
      await this.performCartAction(() => handleAddToCart(id, qty));
    },
    updateCartData: async function (id: string, product: {id: string; qty: number}) {
      await this.performCartAction(() => handleEditCart(id, product));
    },
    deleteCartData: async function (id: string) {
      await this.performCartAction(() => handleDeleteCart(id));
    },
    clearCartData: async function () {
      await this.performCartAction(() => handleDeleteAllCart());
    },
  },
});
