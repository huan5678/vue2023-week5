<script setup lang="ts">
import { onMounted, ref } from "vue";
import MainLayout from "@/layouts/MainLayout.vue";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-vue-next';
import { handleGetProductsAll } from '@/api/';
import { useCartStore } from '@/stores';

const products = ref<Product[]>([]);

const isLoading = ref(false);

const cartStore = useCartStore();
const { addCartData } = cartStore;

const handleAddCart = async (id: string) =>
{
  isLoading.value = true;
  await addCartData(id, 1);
  isLoading.value = false;
};

onMounted(async () =>
{
  try {
    const data = await handleGetProductsAll();
    products.value = data.products;
  } catch (error) {
    console.log(error);
  }
});
</script>


<template>
  <MainLayout>
    <section class="h-[80vh] bg-gray-300 py-6">
      <div class="container h-full">
        <div class="flex items-center justify-end h-full">
          <h1 class="text-6xl text-gray-700">Home View</h1>
        </div>

      </div>
    </section>
    <section class="px-10 py-20">
      <h2 class="mb-8 text-4xl">產品列表</h2>
      <div class="container">
        <ul class="grid grid-cols-4 gap-4">
          <Card v-for="item in products" :key="item.id">
            <CardHeader>
              <CardTitle>{{ item.title }}</CardTitle>
              <CardDescription>{{ item.description }}</CardDescription>
            </CardHeader>
            <CardContent>
              <img class="object-cover aspect-video" :src="item.imageUrl" alt="" />
            </CardContent>
            <CardFooter>
              <div class="flex items-center justify-between">
                <span class="text-xl font-bold text-gray-500">NT${{ item.price.toLocaleString() }}</span>
                <Button :disabled="isLoading" @click="handleAddCart(item.id as string)">
                  <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
                  {{ isLoading ? '...' : '加入購物車' }}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </ul>
      </div>
    </section>
  </MainLayout>
</template>
