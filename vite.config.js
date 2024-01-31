import path from 'path';
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';

export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [postcss(), tailwind(), autoprefixer()],
    },
  },
  base: '/vue2023-week5/',
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
      '@': path.resolve(__dirname, './src'),
    },
  },
});
