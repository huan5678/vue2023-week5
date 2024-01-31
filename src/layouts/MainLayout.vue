<script setup lang="ts">
  import {watch} from 'vue';
  import {RouterLink} from 'vue-router';
  import {NavBar} from '@/components/';
  import {useToast} from '@/components/ui/toast/use-toast';
  import {Toaster} from '@/components/ui/toast';
  import {useMessageStore} from '@/stores';
import { storeToRefs } from 'pinia';
  const messageStore = useMessageStore();
  const {toast} = useToast();
  const {message, isShow} = storeToRefs(messageStore);

  watch(isShow,
    (newVal) => {
      if (newVal === true) {
        console.log(message.value);
        toast({
          title: message.value,
        });
      }
    }
  );
</script>

<template>
  <div class="flex flex-col min-h-screen bg-background">
    <header class="sticky top-0 z-40 border-b border-border bg-background">
      <div class="container">
        <NavBar />
      </div>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="z-40 border-t border-border bg-background text-foreground">
      <div class="container flex items-center justify-between h-20 p-4 mx-auto max-w-8xl">
        <div class="flex gap-6 md:gap-8">
          <RouterLink to="/" class="font-bold text-md"> LOGO </RouterLink>
        </div>
        <nav class="items-center justify-center hidden gap-6 md:flex">
          <RouterLink
            to="/dashboard"
            class="text-sm font-medium transition-colors text-muted-foreground dark:hover:text-gray-300"
          >
            後台
          </RouterLink>
        </nav>
      </div>
    </footer>
  </div>
  <Toaster />
</template>
