<template>
  <div class="w-72">
    <Listbox v-model="selectedValue" @update:model-value="handleChange">
      <div class="relative">
        <ListboxButton
          class="relative w-full cursor-default rounded-lg bg-white dark:bg-gray-500 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:text-sm z-10"
        >
          <span class="block truncate">{{ selectedValue.label }}</span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronUpDownIcon
              class="h-5 w-5 text-gray-400 dark:text-white"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-300 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10"
          >
            <ListboxOption
              v-for="option in props.options"
              v-slot="{ active, selected }"
              :key="option.label"
              :value="option"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-primary text-white' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                  >{{ option.label }}</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                >
                  <CheckIcon class="h-5 w-5 text-white" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';

export type SelectOptionType<
  T = string | number | boolean | Record<string, string | number | boolean>,
> = {
  value: T;
  label: string;
};

interface SelectInputProps {
  options: SelectOptionType[];
  value?: SelectOptionType;
}

type EmitTypes = {
  (event: 'change', value: SelectOptionType): void;
};

const props = defineProps<SelectInputProps>();
const emits = defineEmits<EmitTypes>();

const selectedValue = ref<SelectOptionType>(props.value || props.options[0]);

function handleChange(value: SelectOptionType) {
  emits('change', value);
}
</script>

<script lang="ts">
export default {
  name: 'SelectInput',
};
</script>
