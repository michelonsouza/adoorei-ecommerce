import {
  ComputerDesktopIcon,
  UserGroupIcon,
  StopCircleIcon,
  UsersIcon,
} from '@heroicons/vue/24/solid';

import { CategoryEnum } from '@/enums';

export const categories = {
  [CategoryEnum.ELETRONICS]: ComputerDesktopIcon,
  [CategoryEnum.JEWELERY]: StopCircleIcon,
  [CategoryEnum.MENS_CLOATING]: UserGroupIcon,
  [CategoryEnum.WOMENS_CLOATING]: UsersIcon,
};
