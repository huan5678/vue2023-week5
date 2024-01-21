import type {ToastRootProps} from 'radix-vue';
import type {VariantProps} from 'class-variance-authority';

interface ToastVariantProps extends VariantProps<typeof toastVariants> {}

export interface ToastProps extends ToastRootProps {
  class?: string;
  variant?: ToastVariantProps['variant'];
  onOpenChange?: ((value: boolean) => void) | undefined;
}
