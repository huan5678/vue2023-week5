<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Loader2 } from 'lucide-vue-next'
import { useCartStore } from '@/stores'
import { handlePayOrder } from '@/api'

const cartStore = useCartStore();
const { getCartData, showMessage, closeModal, closeCart } = cartStore;

const formSchema = toTypedSchema(z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  tel: z.string().min(10).max(10),
  address: z.string().min(2).max(50),
}))

const {handleSubmit, meta, isSubmitting, resetForm} = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) =>
{
  const res = await handlePayOrder(values);
  if (res.success) {
    await getCartData();
    showMessage('訂單已成立');
    resetForm();
    closeModal();
    closeCart();
  }
})

const layout = [ {
  name: 'name',
  label: '姓名',
  placeholder: '請輸入姓名',
  type: 'text',
}, {
  name: 'email',
  label: 'Email',
  placeholder: '請輸入Email',
  type: 'email',
  },
  {
    name: 'tel',
    label: '電話',
    placeholder: '0912345678',
    type: 'tel',
  },
  {
    name: 'address',
    label: '地址',
    placeholder: '請輸入地址',
    type: 'text',
  },
]

</script>

<template>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>收件人資訊</DialogTitle>
        <DialogDescription>
          <ol>
            <li>為保障您完整的會員權益，請務必填寫正確的手機號碼。</li>
            <li>若您的收件地址為郵政信箱，請勿填寫郵政信箱地址。</li>
          </ol>
        </DialogDescription>
      </DialogHeader>
      <form @submit="onSubmit" class="grid gap-4 py-4">
        <div class="grid items-center gap-4" v-for="item in layout" :key="FormItem.label">
          <FormField v-slot="{ componentField }" :name="item.name" class="w-full">
            <FormItem>
              <FormLabel>{{ item.label }}</FormLabel>
              <FormControl>
                <Input :type="item.type" :placeholder="item.placeholder" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <Button :disabled="!meta.valid || isSubmitting" type="submit" class="flex items-center justify-center p-2 mt-10 transition duration-300 border border-gray-100 rounded-md hover:bg-gray-500 hover:text-gray-100">
          <Loader2 v-if="isSubmitting" class="w-4 h-4 mr-2 animate-spin" />
          {{ isSubmitting ? '送出中...' : '完成結帳' }}
        </Button>
      </form>
    </DialogContent>
</template>
