<script setup lang="ts">
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from './ui/pagination';
import { Button } from './ui/button';
import { PropType } from 'vue';

defineProps({
  paginatedData: {
    type: Array as PropType<Product[]>,
    required: true,
  },
  productData: {
    type: Object,
    required: true,
  },
  handleTarget: {
    type: Function,
    required: true,
  },
  handlePageChange: {
    type: Function as PropType<(page: number) => void>,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    required: true,
  },
});

</script>

<template>
<div class="space-y-2">
      <h2 class="p-2 text-2xl font-bold text-center">產品列表</h2>
      <Table>
        <TableHeader class="border-b-2 border-black">
          <TableRow>
            <TableHead class="py-2" width="150">產品名稱</TableHead>
            <TableHead width="120">
              原價
            </TableHead>
            <TableHead width="120">
              售價
            </TableHead>
            <TableHead width="150">
              是否啟用
            </TableHead>
            <TableHead width="120">
              查看細節
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow class="border-b border-gray-200" v-for="item in paginatedData" :key="item.id">
            <TableCell width="150">
              {{ item.title }}
            </TableCell>
            <TableCell width="120">
              {{ item.price }}
            </TableCell>
            <TableCell width="120">
              {{ item.origin_price }}
            </TableCell>
            <TableCell width="150">
              <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </TableCell>
            <TableCell class="py-2" width="120">
              <Button type="button" class="px-4 py-2 text-white transition duration-300 bg-blue-500 rounded hover:bg-blue-600" @click="handleTarget(item)">查看細節</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div class="flex justify-center py-4 border-y">
        <Pagination v-slot="{ page }" :total="Object.keys(productData.products).length" :itemsPerPage="itemsPerPage" :sibling-count="1" show-edges :default-page="1" :page="currentPage" @update:page="handlePageChange">
          <PaginationList v-slot="{ items }" class="flex items-center gap-1">
            <PaginationFirst />
            <PaginationPrev />

            <template v-for="(item, index) in items">
              <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                <Button type="button" class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
                  {{ item.value }}
                </Button>
              </PaginationListItem>
              <PaginationEllipsis v-else :key="item.type" :index="index" />
            </template>
            <PaginationNext />
            <PaginationLast />
          </PaginationList>
        </Pagination>
      </div>
      <p>目前有 <span>{{ Object.keys(productData.products).length }}</span> 項產品</p>
    </div>
</template>
