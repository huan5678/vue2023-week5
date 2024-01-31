<script lang="ts" setup>
  import {RouterLink} from 'vue-router';
  import {ShoppingCart, AlertTriangle} from 'lucide-vue-next';
  import {onMounted, ref} from 'vue';
  import {Plus, Minus, Trash, Loader2} from 'lucide-vue-next';
  import { Button } from '@/components/ui/button';
  import {DialogTrigger, Dialog} from '@/components/ui/dialog';
  import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/stores';
import { storeToRefs } from 'pinia';
import OrderForm from './OrderForm.vue';


const isLoading = ref(false);

const cartStore = useCartStore();
const {cartData, final_total, isModalOpen, isCartOpen} = storeToRefs(cartStore);
const {updateCartData, deleteCartData, getCartData} = cartStore;

onMounted(async () => {
  await getCartData();
});

const handleUpdateCartQty = async (id: string, product: { id: string; qty: number }) =>
{
  isLoading.value = true;
  await updateCartData(id, product);
  isLoading.value = false;
};

const handleRemoveCart = async (id: string) =>
{
    isLoading.value = true;
    await deleteCartData(id);
    isLoading.value = false;
};

const handleClearCart = async () =>
{
    isLoading.value = true;
    await cartStore.clearCartData();
    isLoading.value = false;
};

</script>

<template>
  <div class="mx-auto flex h-[58px] max-w-8xl items-center justify-between py-8 select-none">
    <div class="flex gap-6 md:gap-8">
      <RouterLink to="/" class="font-bold text-md"> LOGO </RouterLink>
    </div>
    <nav class="items-center justify-center hidden gap-6 md:flex">
      <RouterLink
        to="/"
        class="text-sm font-medium transition-colors text-muted-foreground dark:hover:text-gray-300"
      >
        home
      </RouterLink>
      <Sheet v-model:open="isCartOpen">
        <SheetTrigger>
          <div :class="cartData.length > 0 && 'cart_count'" :data-count="cartData.length">
            <Button variant="outline" size="icon">
              <ShoppingCart />
            </Button>
          </div>
        </SheetTrigger>
        <SheetContent class="flex flex-col overflow-auto select-none rounded-l-xl">
          <SheetHeader class="pb-4 border-b">
            <SheetTitle>購物車</SheetTitle>
          </SheetHeader>
          <SheetClose />
          <div v-if="cartData.length > 0">
            <div
              class="flex flex-col gap-4"
              v-for="(item, index) in cartData"
              :key="item.id"
            >
              <div class="space-y-2">
                <div class="flex gap-2">
                  <img
                    :src="item.product?.imageUrl"
                    alt="product image"
                    class="w-16 h-16 rounded-md"
                  />
                  <div class="flex flex-col w-full gap-2">
                    <h3 class="font-bold">{{ item.product?.title }}</h3>
                    <p class="text-sm text-gray-500">{{ item.product?.description }}</p>
                  </div>
                </div>
                <Separator class="my-1" />
                  <div class="flex items-center justify-between gap-2 py-2">
                    <Button
                      variant="default"
                      size="icon"
                      @click="handleRemoveCart(item.id as string)"
                    >
                    <Loader2 v-if="isLoading" class="animate-spin" />
                      <Trash v-else />
                    </Button>
                    <div class="flex items-center gap-4">
                      <Button
                        variant="outline"
                        size="icon"
                        :disabled="item.qty === 1"
                        @click="
                          handleUpdateCartQty(item.id as string, {
                            id: item.product?.id as string,
                            qty: (item.qty && item.qty) - 1,
                          })
                        "
                      >
                        <Loader2 v-if="isLoading" class="animate-spin" />
                        <Minus v-else />
                      </Button>
                      <span class="font-bold">{{ item.qty }}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        @click="
                          handleUpdateCartQty(item.id as string, {
                            id: item.product?.id as string,
                            qty: (item.qty && item.qty) + 1,
                          })
                        "
                      >
                      <Loader2 v-if="isLoading" class="animate-spin" />
                        <Plus v-else />
                      </Button>
                    </div>
                  </div>
                  <Separator class="my-1" />
                <div class="flex justify-between">
                  <div>
                    <h3 class="text-sm text-gray-500">單價</h3>
                    <span class="text-sm">{{ item.product?.price.toLocaleString() }}</span>
                  </div>
                  <div>
                    <h3 class="text-sm text-gray-500">小計</h3>
                    <span class="font-bold">{{
                      ((item.product?.price as number) * item.qty).toLocaleString()
                    }}</span>
                  </div>
                </div>
              </div>
              <Separator v-if="index !== cartData.length - 1" class="my-1" />
            </div>
          </div>
            <div v-else class="flex flex-col items-center justify-center h-full">
              <h3 class="text-2xl text-gray-500">購物車是空的</h3>
            </div>
            <div class="flex flex-col mt-auto" v-if="cartData.length > 0">
              <Separator class="my-2" />
              <SheetDescription class="flex items-end justify-between py-4">
                <Button variant="outline" @click="handleClearCart">
                  <Loader2 v-if="isLoading" class="animate-spin" />
                  <AlertTriangle v-else class="mr-4" />
                  清空購物車
                </Button>
                <span class="text-sm text-gray-500">共 {{ cartData.length }} 項商品</span>
              </SheetDescription>
              <Separator class="my-2" />
                <div class="flex items-end justify-between">
                  <h3 class="text-2xl text-gray-500">總計</h3>
                  <span class="font-bold">NT$ {{ final_total.toLocaleString() }}</span>
                </div>
              <SheetFooter class="mt-10">
                <Dialog v-model:open="isModalOpen">
                  <DialogTrigger as-child>
                    <Button :disabled="isLoading" variant="outline" size="lg" class="w-full"> 結帳 </Button>
                  </DialogTrigger>
                  <OrderForm />
                </Dialog>
              </SheetFooter>
            </div>
        </SheetContent>

      </Sheet>
    </nav>
  </div>
</template>

<style scoped>
  .cart_count {
    position: relative;
    &::before {
      content: attr(data-count);
      position: absolute;
      padding: 0.75rem;
      top: 0;
      right: 0;
      display: grid;
      width: 1rem;
      height: 1rem;
      transform: translateX(0.75rem) translateY(-0.5rem);
      background-color: #f87171;
      border-radius: 9999px;
      place-content: center;
    }
  }
</style>
