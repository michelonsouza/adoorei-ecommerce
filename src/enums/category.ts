export enum CategoryEnum {
  ELETRONICS = 'electronics',
  JEWELERY = 'jewelery',
  MENS_CLOATING = "men's clothing",
  WOMENS_CLOATING = "women's clothing",
}

export enum CategoryTagEnum {
  electronics = CategoryEnum.ELETRONICS,
  jewelery = CategoryEnum.JEWELERY,
  'men-s-cloating' = CategoryEnum.MENS_CLOATING,
  'women-s-cloating' = CategoryEnum.WOMENS_CLOATING,
}

export enum CategoryToTagEnum {
  'electronics' = 'electronics',
  'jewelery' = 'jewelery',
  "men's clothing" = 'men-s-cloating',
  "women's clothing" = 'women-s-cloating',
}

export type CategoryKeys = keyof typeof CategoryEnum;
export type CategoryTagKeys = keyof typeof CategoryTagEnum;
