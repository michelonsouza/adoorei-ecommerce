<template>
  <TransitionRoot appear :show="props.open" as="template">
    <Dialog as="div" class="relative z-10" @close="handleClose">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white dark:bg-gray-400 p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900 dark:text-white"
              >
                Thank you for shopping at Adoorei E-commerce
              </DialogTitle>

              <p class="text-center font-semibold text-xl mt-3">
                Your invoice will arrive by email.
              </p>

              <button
                class="bg-accent rounded w-full p-2 mt-4 transition text-white hover:bg-accent-dark disabled:bg-gray-300 disabled:text-gray-900 disabled:cursor-not-allowed"
                @click="handleClose"
              >
                Keep buying
              </button>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue';
import { useRouter } from 'vue-router';

interface SuccessModalProps {
  open: boolean;
}

type EmitTypes = {
  (event: 'close'): void;
};

const props = defineProps<SuccessModalProps>();
const emits = defineEmits<EmitTypes>();

const router = useRouter();

function handleClose() {
  emits('close');
  router.push('/');
}
</script>

<script lang="ts">
export default {
  name: 'SuccessModal',
};
</script>
