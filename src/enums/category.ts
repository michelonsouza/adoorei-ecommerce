export enum CategoryEnum {
  ELETRONICS = 'electronics',
  JEWELERY = 'jewelery',
  MENS_CLOATING = "men's clothing",
  WOMENS_CLOATING = "women's clothing",
}

export type CategoryKeys = keyof typeof CategoryEnum;
