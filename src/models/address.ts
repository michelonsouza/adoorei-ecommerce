export interface AddressGeoLocation {
  lat: string;
  long: string;
}

export interface Address {
  city: string;
  number: number;
  street: string;
  zipcode: string;
  geolocation: AddressGeoLocation;
}
