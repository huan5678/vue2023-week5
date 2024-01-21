<script lang="ts" setup>
import { ref } from 'vue';
import axios from 'axios';
import Cookies from 'js-cookie';


import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';

  const baseUrl = 'https://ec-course-api.hexschool.io/v2';


const userData = ref({
  username: '',
  password: '',
});

const handleLogin = async () => {
  try {
    props.handleLoading(true);
    const res = await axios.post(`${baseUrl}/admin/signin`, { ...userData.value });
    const { token, expired } = res.data;
    Cookies.set('token', token, { expires: new Date(expired) });
    props.handleLoading(false);
    window.location.reload();
  } catch (error) {
    console.dir(error);
    props.handleLoading(false);
  }
};

const props = defineProps({
  handleCheck: {
    type: Function,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  handleLoading : {
    type: Function,
    required: true,
  },
})


</script>

<template>
  <form @submit.prevent="handleLogin()" class="grid items-end grid-cols-2 gap-4 p-4">
    <div class="space-y-6">
      <h2 class="text-2xl text-center">使用者登入</h2>
      <div>
        <Label for="username" class="text-gray-700">
          使用者名稱
        </Label>
          <Input type="text" id="username" v-model="userData.username" class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="" :disabled="isLoading" />
      </div>
      <div>
        <Label for="password" class="text-gray-700">
          密碼
        </Label>
        <Input type="password" id="password" v-model="userData.password" class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" :disabled="isLoading" />
      </div>
      <div>
        <Button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:bg-gray-500" :disabled="isLoading">登入</Button>
      </div>
    </div>
    <div class="flex items-end justify-between gap-4">
      <div class="flex-auto space-y-6">
      <h2>驗證使用者</h2>
      <Button type="button" @click="handleCheck()" :disabled="isLoading">驗證</Button>
    </div>
    </div>
  </form>
</template>
