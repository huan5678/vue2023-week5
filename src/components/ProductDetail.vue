<script lang="ts" setup>
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ThumbsUp } from 'lucide-vue-next';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from './ui/dialog'
defineProps({
  productData: {
    type: Object,
    required: true,
  },
  handleReset: {
    type: Function,
    required: true,
  },
  openProductForm: {
    type: Boolean,
    required: true,
  },
  temp: {
    type: Object,
    required: true,
  },
  handleDeleteProduct: {
    type: Function,
    required: true,
  },
});
</script>

<template>
          <div class="flex flex-col" v-if="temp.title.length > 0 && !openProductForm">
          <img
            :src="temp.imageUrl"
            class="object-cover object-center w-full rounded aspect-video max-h-80"
            alt="主圖"
          />
          <div class="flex flex-col gap-2 py-4">
            <div class="flex items-center gap-4 pb-2 border-b">
              <h5 class="text-2xl font-medium">
                {{ temp.title }}
              </h5>
              <Badge>{{
                temp.category
              }}</Badge>
              <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
              <div :class="`p-2 ml-auto  rounded ${temp.top ? 'bg-amber-400 text-gray-50' : 'bg-gray-200 text-gray-700'}`">
                <ThumbsUp class="w-6 h-6" />
              </div>
      </TooltipTrigger>
      <TooltipContent>
        <div :class="`p-2 text-sm  ${temp.top ? 'text-amber-500' : 'text-gray-700 bg-white'}`">
          {{ temp.top ? '熱門商品' : '普通商品' }}
        </div>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
            </div>
            <p>商品描述：{{ temp.description }}</p>
            <p>商品內容：{{ temp.content }}</p>
            <div class="flex items-center gap-2">
              <p>{{ temp.price }}</p>
              <p class="text-sm">
                <del>{{ temp.origin_price }}</del>
              </p>
              元 / {{ temp.unit }}
            </div>
          </div>
          <div class="flex gap-2 overflow-x-scroll">
            <img
              :src="img"
              class="object-cover object-center rounded max-h-48"
              alt=""
              v-for="img in temp.imagesUrl"
            />
          </div>
          <Dialog>
    <DialogTrigger as-child>
              <Button
                type="button"
                variant="outline"
                class="w-1/3 text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
              >
                刪除產品
              </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>刪除產品</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        <p>確定要刪除產品 <span class="text-xl font-medium text-red-500">{{ temp.title }}</span> 嗎？</p>
      </DialogDescription>
      <DialogFooter>
        <Button type="button" variant="destructive" class="w-1/2 mr-6" @click="handleDeleteProduct(temp.id)">
          確認
        </Button>
        <DialogClose as-child>
          <Button type="button" variant="outline" class="w-1/2">
            取消
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
        </div>
</template>
