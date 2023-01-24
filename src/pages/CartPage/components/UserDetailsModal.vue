<template>
  <TransitionRoot appear :show="props.open" as="template">
    <Dialog as="div" class="relative z-10" @close="emits('close')">
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
                User information
              </DialogTitle>
              <div class="mt-2">
                <form @submit="onSubmit">
                  <div class="flex flex-col gap-4">
                    <div class="flex items-center gap-4">
                      <input
                        v-model="firstname"
                        type="text"
                        placeholder="First name*"
                        class="bg-transparent border rounded w-full h-8 px-2 dark:placeholder-gray-100"
                        :aria-errormessage="firstnameError"
                      />
                      <input
                        v-model="lastname"
                        type="text"
                        placeholder="Last name*"
                        class="bg-transparent border rounded w-full h-8 px-2 dark:placeholder-gray-100"
                      />
                    </div>
                    <input
                      v-model="username"
                      type="text"
                      placeholder="Username*"
                      class="bg-transparent border rounded w-full h-8 px-2 dark:placeholder-gray-100"
                    />
                    <input
                      v-model="password"
                      type="password"
                      placeholder="Password*"
                      autocomplete="new:password"
                      class="bg-transparent border rounded w-full h-8 px-2 dark:placeholder-gray-100"
                    />
                    <input
                      v-model="confirmPassword"
                      type="password"
                      placeholder="Confirm password*"
                      class="bg-transparent border rounded w-full h-8 px-2 dark:placeholder-gray-100"
                    />
                    <input
                      v-model="email"
                      type="text"
                      placeholder="E-mail*"
                      class="bg-transparent border rounded w-full h-8 px-2 dark:placeholder-gray-100"
                    />
                    <div class="flex items-center gap-4">
                      <input
                        v-model="phone"
                        type="text"
                        placeholder="Phone*"
                        class="bg-transparent border rounded w-full h-8 px-2 dark:placeholder-gray-100"
                      />
                    </div>
                    <div class="border-b"></div>
                    <div class="flex items-center gap-4">
                      <input
                        v-model="zipcode"
                        type="text"
                        placeholder="Zipcode*"
                        class="bg-transparent border rounded w-full h-8 px-2 dark:placeholder-gray-100"
                      />
                      <input
                        v-model="number"
                        type="number"
                        placeholder="Number*"
                        class="bg-transparent border rounded w-full h-8 px-2 dark:placeholder-gray-100"
                      />
                    </div>
                    <input
                      v-model="street"
                      type="text"
                      placeholder="Street*"
                      class="bg-transparent border rounded w-full h-8 px-2 dark:placeholder-gray-100"
                    />
                    <input
                      v-model="city"
                      type="text"
                      placeholder="City*"
                      class="bg-transparent border rounded w-full h-8 px-2 dark:placeholder-gray-100"
                    />
                  </div>
                  <button
                    :disabled="hasErrors"
                    class="bg-accent rounded w-full p-2 mt-4 transition text-white hover:bg-accent-dark disabled:bg-gray-300 disabled:text-gray-900 disabled:cursor-not-allowed"
                  >
                    Send
                  </button>
                </form>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  <loading-overlay v-if="loading" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue';
import { useField, useForm } from 'vee-validate';

import { LoadingOverlay } from '@/components';
import type { User } from '@/models';
import { addNewUser } from '@/services';
import { useCartStore } from '@/store';
import { userDetailsSchema } from '@/validations';

interface UserDetailsModalProps {
  open: boolean;
}

type EmitTypes = {
  (event: 'close'): void;
  (event: 'success'): void;
  (event: 'error'): void;
};

const props = defineProps<UserDetailsModalProps>();
const emits = defineEmits<EmitTypes>();

const cartStore = useCartStore();

const { handleSubmit } = useForm<Omit<User, 'id'>>({
  validationSchema: userDetailsSchema,
});

const { value: firstname, errorMessage: firstnameError } =
  useField('name.firstname');
const { value: lastname, errorMessage: lastnameError } =
  useField('name.lastname');
const { value: email, errorMessage: emailError } = useField('email');
const { value: phone, errorMessage: phoneError } = useField('phone');
const { value: username, errorMessage: usernameError } = useField('username');
const { value: password, errorMessage: passwordError } = useField('password');
const { value: confirmPassword, errorMessage: confirmPasswordError } =
  useField('confirmPassword');
const { value: city, errorMessage: cityError } = useField('address.city');
const { value: zipcode, errorMessage: zipcodeError } =
  useField('address.zipcode');
const { value: number, errorMessage: numberError } = useField('address.number');
const { value: street, errorMessage: streetError } = useField('address.street');

const loading = ref<boolean>(false);

const hasErrors = computed(() => {
  return !!(
    firstnameError.value ||
    lastnameError.value ||
    emailError.value ||
    phoneError.value ||
    usernameError.value ||
    passwordError.value ||
    confirmPasswordError.value ||
    cityError.value ||
    zipcodeError.value ||
    numberError.value ||
    streetError.value
  );
});

const onSubmit = handleSubmit(async userData => {
  try {
    loading.value = true;
    await addNewUser(userData);

    cartStore.resetCart();
    emits('success');
  } catch {
    emits('error');
  } finally {
    loading.value = false;
  }
});
</script>

<script lang="ts">
export default {
  name: 'UserDetailsModal',
};
</script>
