export interface Address {
  id?: number;
  street?: string;
  city?: string;
  country?: Address.CountryEnum;
  postalcode?: string;
}

export namespace Address {
  export type CountryEnum = "ES" | "UK" | "DE" | "US" | "PE";
  export const CountryEnum = {
    ES: "ES" as CountryEnum,
    UK: "UK" as CountryEnum,
    DE: "DE" as CountryEnum,
    US: "US" as CountryEnum,
    PE: "PE" as CountryEnum
  };
}
