/// <reference types="vite/client" />
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
