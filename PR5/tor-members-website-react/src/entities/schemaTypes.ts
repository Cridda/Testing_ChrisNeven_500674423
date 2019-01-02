/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MeQuery
// ====================================================

export interface MeQuery_me {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface MeQuery {
  me: MeQuery_me | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AccommodationsQuery
// ====================================================

export interface AccommodationsQuery_accommodations_photos {
  url: string;
}

export interface AccommodationsQuery_accommodations {
  id: string;
  name: string;
  code: number;
  photos: AccommodationsQuery_accommodations_photos[];
}

export interface AccommodationsQuery {
  accommodations: AccommodationsQuery_accommodations[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BathroomTypesQuery
// ====================================================

export interface BathroomTypesQuery_bathroomTypes {
  id: string;
  name: string;
}

export interface BathroomTypesQuery {
  bathroomTypes: BathroomTypesQuery_bathroomTypes[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProfileQuery
// ====================================================

export interface ProfileQuery_me {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface ProfileQuery {
  me: ProfileQuery_me | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SitesQuery
// ====================================================

export interface SitesQuery_sites {
  id: string;
  name: string;
}

export interface SitesQuery {
  sites: SitesQuery_sites[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FeaturesQuery
// ====================================================

export interface FeaturesQuery_features {
  id: string;
  name: string | null;
}

export interface FeaturesQuery {
  features: FeaturesQuery_features[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BedroomTypesQuery
// ====================================================

export interface BedroomTypesQuery_bedroomTypes {
  id: string;
  name: string;
}

export interface BedroomTypesQuery {
  bedroomTypes: BedroomTypesQuery_bedroomTypes[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateBedroom
// ====================================================

export interface CreateBedroom_createBedroom_type {
  name: string;
}

export interface CreateBedroom_createBedroom_name {
  nl: string | null;
  en: string | null;
  de: string | null;
}

export interface CreateBedroom_createBedroom {
  id: string;
  singleBed: number;
  doubleBed: number;
  type: CreateBedroom_createBedroom_type;
  name: CreateBedroom_createBedroom_name;
}

export interface CreateBedroom {
  createBedroom: CreateBedroom_createBedroom[] | null;
}

export interface CreateBedroomVariables {
  accommodationId: string;
  bedroom: BedroomInput;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateBathroom
// ====================================================

export interface CreateBathroom_createBathroom_type {
  name: string;
}

export interface CreateBathroom_createBathroom_name {
  nl: string | null;
  en: string | null;
  de: string | null;
}

export interface CreateBathroom_createBathroom {
  id: string;
  toilet: number;
  bath: number;
  shower: number;
  type: CreateBathroom_createBathroom_type;
  name: CreateBathroom_createBathroom_name;
}

export interface CreateBathroom {
  createBathroom: CreateBathroom_createBathroom[] | null;
}

export interface CreateBathroomVariables {
  accommodationId: string;
  bathroom: BathroomInput;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SelectedAccommodationQuery
// ====================================================

export interface SelectedAccommodationQuery_accommodation_description {
  nl: string | null;
  en: string | null;
  de: string | null;
}

export interface SelectedAccommodationQuery_accommodation_type {
  name: string | null;
}

export interface SelectedAccommodationQuery_accommodation_address {
  address: string;
  postcode: string;
  city: string;
}

export interface SelectedAccommodationQuery_accommodation_keyAddress {
  address: string;
  postcode: string;
  city: string;
}

export interface SelectedAccommodationQuery_accommodation_photos_name {
  en: string | null;
  nl: string | null;
  de: string | null;
}

export interface SelectedAccommodationQuery_accommodation_photos {
  id: string;
  name: SelectedAccommodationQuery_accommodation_photos_name;
  url: string;
}

export interface SelectedAccommodationQuery_accommodation_bathrooms_type {
  name: string;
}

export interface SelectedAccommodationQuery_accommodation_bathrooms_name {
  nl: string | null;
  en: string | null;
  de: string | null;
}

export interface SelectedAccommodationQuery_accommodation_bathrooms {
  id: string;
  toilet: number;
  bath: number;
  shower: number;
  type: SelectedAccommodationQuery_accommodation_bathrooms_type;
  name: SelectedAccommodationQuery_accommodation_bathrooms_name;
}

export interface SelectedAccommodationQuery_accommodation_bedrooms_type {
  name: string;
}

export interface SelectedAccommodationQuery_accommodation_bedrooms_name {
  nl: string | null;
  en: string | null;
  de: string | null;
}

export interface SelectedAccommodationQuery_accommodation_bedrooms {
  id: string;
  singleBed: number;
  doubleBed: number;
  type: SelectedAccommodationQuery_accommodation_bedrooms_type;
  name: SelectedAccommodationQuery_accommodation_bedrooms_name;
}

export interface SelectedAccommodationQuery_accommodation_sites {
  name: string;
}

export interface SelectedAccommodationQuery_accommodation_features {
  name: string | null;
}

export interface SelectedAccommodationQuery_accommodation {
  id: string;
  code: number;
  description: SelectedAccommodationQuery_accommodation_description;
  type: SelectedAccommodationQuery_accommodation_type;
  livingArea: number;
  outsideArea: number;
  minCapacity: number;
  maxCapacity: number;
  address: SelectedAccommodationQuery_accommodation_address;
  keyAddress: SelectedAccommodationQuery_accommodation_keyAddress;
  contactPerson: string;
  contactPhone: string;
  photos: SelectedAccommodationQuery_accommodation_photos[];
  bathrooms: SelectedAccommodationQuery_accommodation_bathrooms[] | null;
  bedrooms: SelectedAccommodationQuery_accommodation_bedrooms[] | null;
  sites: SelectedAccommodationQuery_accommodation_sites[] | null;
  features: SelectedAccommodationQuery_accommodation_features[] | null;
}

export interface SelectedAccommodationQuery {
  accommodation: SelectedAccommodationQuery_accommodation | null;
}

export interface SelectedAccommodationQueryVariables {
  id: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateAccommodation
// ====================================================

export interface UpdateAccommodation_updateAccommodation {
  id: string;
  name: string;
}

export interface UpdateAccommodation {
  updateAccommodation: UpdateAccommodation_updateAccommodation;
}

export interface UpdateAccommodationVariables {
  id: string;
  name?: string | null;
  description?: TranslatableStringInput | null;
  address?: AddressInput | null;
  keyAddress?: AddressInput | null;
  type?: AccommodationTypeInput | null;
  livingArea?: number | null;
  outsideArea?: number | null;
  contactPhone?: string | null;
  contactPerson?: string | null;
  minCapacity?: number | null;
  maxCapacity?: number | null;
  city?: CityInput | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginMutation
// ====================================================

export interface LoginMutation_login {
  token: string;
}

export interface LoginMutation {
  login: LoginMutation_login;
}

export interface LoginMutationVariables {
  email: string;
  password: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterMutation
// ====================================================

export interface RegisterMutation_signup {
  token: string;
}

export interface RegisterMutation {
  signup: RegisterMutation_signup;
}

export interface RegisterMutationVariables {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: AddressInput;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: LanguagesFragment
// ====================================================

export interface LanguagesFragment {
  nl: string | null;
  en: string | null;
  de: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AddressFragment
// ====================================================

export interface AddressFragment {
  address: string;
  postcode: string;
  city: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DetailsFragment
// ====================================================

export interface DetailsFragment_description {
  nl: string | null;
  en: string | null;
  de: string | null;
}

export interface DetailsFragment_type {
  name: string | null;
}

export interface DetailsFragment_address {
  address: string;
  postcode: string;
  city: string;
}

export interface DetailsFragment_keyAddress {
  address: string;
  postcode: string;
  city: string;
}

export interface DetailsFragment {
  code: number;
  description: DetailsFragment_description;
  type: DetailsFragment_type;
  livingArea: number;
  outsideArea: number;
  minCapacity: number;
  maxCapacity: number;
  address: DetailsFragment_address;
  keyAddress: DetailsFragment_keyAddress;
  contactPerson: string;
  contactPhone: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BedroomFragment
// ====================================================

export interface BedroomFragment_type {
  name: string;
}

export interface BedroomFragment_name {
  nl: string | null;
  en: string | null;
  de: string | null;
}

export interface BedroomFragment {
  id: string;
  singleBed: number;
  doubleBed: number;
  type: BedroomFragment_type;
  name: BedroomFragment_name;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BathroomFragment
// ====================================================

export interface BathroomFragment_type {
  name: string;
}

export interface BathroomFragment_name {
  nl: string | null;
  en: string | null;
  de: string | null;
}

export interface BathroomFragment {
  id: string;
  toilet: number;
  bath: number;
  shower: number;
  type: BathroomFragment_type;
  name: BathroomFragment_name;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FacilitiesFragment
// ====================================================

export interface FacilitiesFragment_bathrooms_type {
  name: string;
}

export interface FacilitiesFragment_bathrooms_name {
  nl: string | null;
  en: string | null;
  de: string | null;
}

export interface FacilitiesFragment_bathrooms {
  id: string;
  toilet: number;
  bath: number;
  shower: number;
  type: FacilitiesFragment_bathrooms_type;
  name: FacilitiesFragment_bathrooms_name;
}

export interface FacilitiesFragment_bedrooms_type {
  name: string;
}

export interface FacilitiesFragment_bedrooms_name {
  nl: string | null;
  en: string | null;
  de: string | null;
}

export interface FacilitiesFragment_bedrooms {
  id: string;
  singleBed: number;
  doubleBed: number;
  type: FacilitiesFragment_bedrooms_type;
  name: FacilitiesFragment_bedrooms_name;
}

export interface FacilitiesFragment_sites {
  name: string;
}

export interface FacilitiesFragment_features {
  name: string | null;
}

export interface FacilitiesFragment {
  bathrooms: FacilitiesFragment_bathrooms[] | null;
  bedrooms: FacilitiesFragment_bedrooms[] | null;
  sites: FacilitiesFragment_sites[] | null;
  features: FacilitiesFragment_features[] | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PhotoFragment
// ====================================================

export interface PhotoFragment_name {
  en: string | null;
  nl: string | null;
  de: string | null;
}

export interface PhotoFragment {
  id: string;
  name: PhotoFragment_name;
  url: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface AccommodationTypeInput {
  name?: string | null;
}

export interface AddressInput {
  address?: string | null;
  postcode?: string | null;
  city?: string | null;
}

export interface BathroomInput {
  name: TranslatableStringInput;
  type: BathroomTypeInput;
  toilet: number;
  bath: number;
  shower: number;
}

export interface BathroomTypeInput {
  id: string;
}

export interface BedroomInput {
  name: TranslatableStringInput;
  type: BedroomTypeInput;
  singleBed: number;
  doubleBed: number;
}

export interface BedroomTypeInput {
  id: string;
}

export interface CityInput {
  name?: string | null;
}

export interface TranslatableStringInput {
  en?: string | null;
  nl?: string | null;
  de?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
