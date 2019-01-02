export const typeDefs = /* GraphQL */ `type Accommodation {
  id: ID!
  name: String!
  code: Int!
  type: AccommodationType!
  city: City!
  description: TranslatableString!
  longDescription: TranslatableString
  slug: String!
  livingArea: Int!
  outsideArea: Int!
  contactPerson: String!
  contactPhone: String!
  keyAddress: Address!
  address: Address!
  minCapacity: Int!
  maxCapacity: Int!
  photos(where: PhotoWhereInput, orderBy: PhotoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Photo!]
  owner: User
  createdAt: DateTime!
  updatedAt: DateTime!
  bedrooms(where: BedroomWhereInput, orderBy: BedroomOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Bedroom!]
  bathrooms(where: BathroomWhereInput, orderBy: BathroomOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Bathroom!]
  sites(where: SiteWhereInput, orderBy: SiteOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Site!]
  features(where: AccommodationFeatureWhereInput, orderBy: AccommodationFeatureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [AccommodationFeature!]
}

type AccommodationConnection {
  pageInfo: PageInfo!
  edges: [AccommodationEdge]!
  aggregate: AggregateAccommodation!
}

input AccommodationCreateInput {
  name: String!
  code: Int!
  type: AccommodationTypeCreateOneInput!
  city: CityCreateOneInput!
  description: TranslatableStringCreateOneInput!
  longDescription: TranslatableStringCreateOneInput
  slug: String!
  livingArea: Int!
  outsideArea: Int!
  contactPerson: String!
  contactPhone: String!
  keyAddress: AddressCreateOneInput!
  address: AddressCreateOneInput!
  minCapacity: Int!
  maxCapacity: Int!
  photos: PhotoCreateManyInput
  owner: UserCreateOneWithoutAccommodationsInput
  bedrooms: BedroomCreateManyInput
  bathrooms: BathroomCreateManyInput
  sites: SiteCreateManyInput
  features: AccommodationFeatureCreateManyInput
}

input AccommodationCreateManyWithoutOwnerInput {
  create: [AccommodationCreateWithoutOwnerInput!]
  connect: [AccommodationWhereUniqueInput!]
}

input AccommodationCreateWithoutOwnerInput {
  name: String!
  code: Int!
  type: AccommodationTypeCreateOneInput!
  city: CityCreateOneInput!
  description: TranslatableStringCreateOneInput!
  longDescription: TranslatableStringCreateOneInput
  slug: String!
  livingArea: Int!
  outsideArea: Int!
  contactPerson: String!
  contactPhone: String!
  keyAddress: AddressCreateOneInput!
  address: AddressCreateOneInput!
  minCapacity: Int!
  maxCapacity: Int!
  photos: PhotoCreateManyInput
  bedrooms: BedroomCreateManyInput
  bathrooms: BathroomCreateManyInput
  sites: SiteCreateManyInput
  features: AccommodationFeatureCreateManyInput
}

type AccommodationEdge {
  node: Accommodation!
  cursor: String!
}

type AccommodationFeature {
  id: ID!
  name: String
}

type AccommodationFeatureConnection {
  pageInfo: PageInfo!
  edges: [AccommodationFeatureEdge]!
  aggregate: AggregateAccommodationFeature!
}

input AccommodationFeatureCreateInput {
  name: String
}

input AccommodationFeatureCreateManyInput {
  create: [AccommodationFeatureCreateInput!]
  connect: [AccommodationFeatureWhereUniqueInput!]
}

type AccommodationFeatureEdge {
  node: AccommodationFeature!
  cursor: String!
}

enum AccommodationFeatureOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type AccommodationFeaturePreviousValues {
  id: ID!
  name: String
}

input AccommodationFeatureScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  AND: [AccommodationFeatureScalarWhereInput!]
  OR: [AccommodationFeatureScalarWhereInput!]
  NOT: [AccommodationFeatureScalarWhereInput!]
}

type AccommodationFeatureSubscriptionPayload {
  mutation: MutationType!
  node: AccommodationFeature
  updatedFields: [String!]
  previousValues: AccommodationFeaturePreviousValues
}

input AccommodationFeatureSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: AccommodationFeatureWhereInput
  AND: [AccommodationFeatureSubscriptionWhereInput!]
  OR: [AccommodationFeatureSubscriptionWhereInput!]
  NOT: [AccommodationFeatureSubscriptionWhereInput!]
}

input AccommodationFeatureUpdateDataInput {
  name: String
}

input AccommodationFeatureUpdateInput {
  name: String
}

input AccommodationFeatureUpdateManyDataInput {
  name: String
}

input AccommodationFeatureUpdateManyInput {
  create: [AccommodationFeatureCreateInput!]
  update: [AccommodationFeatureUpdateWithWhereUniqueNestedInput!]
  upsert: [AccommodationFeatureUpsertWithWhereUniqueNestedInput!]
  delete: [AccommodationFeatureWhereUniqueInput!]
  connect: [AccommodationFeatureWhereUniqueInput!]
  disconnect: [AccommodationFeatureWhereUniqueInput!]
  deleteMany: [AccommodationFeatureScalarWhereInput!]
  updateMany: [AccommodationFeatureUpdateManyWithWhereNestedInput!]
}

input AccommodationFeatureUpdateManyMutationInput {
  name: String
}

input AccommodationFeatureUpdateManyWithWhereNestedInput {
  where: AccommodationFeatureScalarWhereInput!
  data: AccommodationFeatureUpdateManyDataInput!
}

input AccommodationFeatureUpdateWithWhereUniqueNestedInput {
  where: AccommodationFeatureWhereUniqueInput!
  data: AccommodationFeatureUpdateDataInput!
}

input AccommodationFeatureUpsertWithWhereUniqueNestedInput {
  where: AccommodationFeatureWhereUniqueInput!
  update: AccommodationFeatureUpdateDataInput!
  create: AccommodationFeatureCreateInput!
}

input AccommodationFeatureWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  AND: [AccommodationFeatureWhereInput!]
  OR: [AccommodationFeatureWhereInput!]
  NOT: [AccommodationFeatureWhereInput!]
}

input AccommodationFeatureWhereUniqueInput {
  id: ID
}

enum AccommodationOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  code_ASC
  code_DESC
  slug_ASC
  slug_DESC
  livingArea_ASC
  livingArea_DESC
  outsideArea_ASC
  outsideArea_DESC
  contactPerson_ASC
  contactPerson_DESC
  contactPhone_ASC
  contactPhone_DESC
  minCapacity_ASC
  minCapacity_DESC
  maxCapacity_ASC
  maxCapacity_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type AccommodationPreviousValues {
  id: ID!
  name: String!
  code: Int!
  slug: String!
  livingArea: Int!
  outsideArea: Int!
  contactPerson: String!
  contactPhone: String!
  minCapacity: Int!
  maxCapacity: Int!
  createdAt: DateTime!
  updatedAt: DateTime!
}

input AccommodationScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  code: Int
  code_not: Int
  code_in: [Int!]
  code_not_in: [Int!]
  code_lt: Int
  code_lte: Int
  code_gt: Int
  code_gte: Int
  slug: String
  slug_not: String
  slug_in: [String!]
  slug_not_in: [String!]
  slug_lt: String
  slug_lte: String
  slug_gt: String
  slug_gte: String
  slug_contains: String
  slug_not_contains: String
  slug_starts_with: String
  slug_not_starts_with: String
  slug_ends_with: String
  slug_not_ends_with: String
  livingArea: Int
  livingArea_not: Int
  livingArea_in: [Int!]
  livingArea_not_in: [Int!]
  livingArea_lt: Int
  livingArea_lte: Int
  livingArea_gt: Int
  livingArea_gte: Int
  outsideArea: Int
  outsideArea_not: Int
  outsideArea_in: [Int!]
  outsideArea_not_in: [Int!]
  outsideArea_lt: Int
  outsideArea_lte: Int
  outsideArea_gt: Int
  outsideArea_gte: Int
  contactPerson: String
  contactPerson_not: String
  contactPerson_in: [String!]
  contactPerson_not_in: [String!]
  contactPerson_lt: String
  contactPerson_lte: String
  contactPerson_gt: String
  contactPerson_gte: String
  contactPerson_contains: String
  contactPerson_not_contains: String
  contactPerson_starts_with: String
  contactPerson_not_starts_with: String
  contactPerson_ends_with: String
  contactPerson_not_ends_with: String
  contactPhone: String
  contactPhone_not: String
  contactPhone_in: [String!]
  contactPhone_not_in: [String!]
  contactPhone_lt: String
  contactPhone_lte: String
  contactPhone_gt: String
  contactPhone_gte: String
  contactPhone_contains: String
  contactPhone_not_contains: String
  contactPhone_starts_with: String
  contactPhone_not_starts_with: String
  contactPhone_ends_with: String
  contactPhone_not_ends_with: String
  minCapacity: Int
  minCapacity_not: Int
  minCapacity_in: [Int!]
  minCapacity_not_in: [Int!]
  minCapacity_lt: Int
  minCapacity_lte: Int
  minCapacity_gt: Int
  minCapacity_gte: Int
  maxCapacity: Int
  maxCapacity_not: Int
  maxCapacity_in: [Int!]
  maxCapacity_not_in: [Int!]
  maxCapacity_lt: Int
  maxCapacity_lte: Int
  maxCapacity_gt: Int
  maxCapacity_gte: Int
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [AccommodationScalarWhereInput!]
  OR: [AccommodationScalarWhereInput!]
  NOT: [AccommodationScalarWhereInput!]
}

type AccommodationSubscriptionPayload {
  mutation: MutationType!
  node: Accommodation
  updatedFields: [String!]
  previousValues: AccommodationPreviousValues
}

input AccommodationSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: AccommodationWhereInput
  AND: [AccommodationSubscriptionWhereInput!]
  OR: [AccommodationSubscriptionWhereInput!]
  NOT: [AccommodationSubscriptionWhereInput!]
}

type AccommodationType {
  id: ID!
  name: String
}

type AccommodationTypeConnection {
  pageInfo: PageInfo!
  edges: [AccommodationTypeEdge]!
  aggregate: AggregateAccommodationType!
}

input AccommodationTypeCreateInput {
  name: String
}

input AccommodationTypeCreateOneInput {
  create: AccommodationTypeCreateInput
  connect: AccommodationTypeWhereUniqueInput
}

type AccommodationTypeEdge {
  node: AccommodationType!
  cursor: String!
}

enum AccommodationTypeOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type AccommodationTypePreviousValues {
  id: ID!
  name: String
}

type AccommodationTypeSubscriptionPayload {
  mutation: MutationType!
  node: AccommodationType
  updatedFields: [String!]
  previousValues: AccommodationTypePreviousValues
}

input AccommodationTypeSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: AccommodationTypeWhereInput
  AND: [AccommodationTypeSubscriptionWhereInput!]
  OR: [AccommodationTypeSubscriptionWhereInput!]
  NOT: [AccommodationTypeSubscriptionWhereInput!]
}

input AccommodationTypeUpdateDataInput {
  name: String
}

input AccommodationTypeUpdateInput {
  name: String
}

input AccommodationTypeUpdateManyMutationInput {
  name: String
}

input AccommodationTypeUpdateOneRequiredInput {
  create: AccommodationTypeCreateInput
  update: AccommodationTypeUpdateDataInput
  upsert: AccommodationTypeUpsertNestedInput
  connect: AccommodationTypeWhereUniqueInput
}

input AccommodationTypeUpsertNestedInput {
  update: AccommodationTypeUpdateDataInput!
  create: AccommodationTypeCreateInput!
}

input AccommodationTypeWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  AND: [AccommodationTypeWhereInput!]
  OR: [AccommodationTypeWhereInput!]
  NOT: [AccommodationTypeWhereInput!]
}

input AccommodationTypeWhereUniqueInput {
  id: ID
}

input AccommodationUpdateInput {
  name: String
  code: Int
  type: AccommodationTypeUpdateOneRequiredInput
  city: CityUpdateOneRequiredInput
  description: TranslatableStringUpdateOneRequiredInput
  longDescription: TranslatableStringUpdateOneInput
  slug: String
  livingArea: Int
  outsideArea: Int
  contactPerson: String
  contactPhone: String
  keyAddress: AddressUpdateOneRequiredInput
  address: AddressUpdateOneRequiredInput
  minCapacity: Int
  maxCapacity: Int
  photos: PhotoUpdateManyInput
  owner: UserUpdateOneWithoutAccommodationsInput
  bedrooms: BedroomUpdateManyInput
  bathrooms: BathroomUpdateManyInput
  sites: SiteUpdateManyInput
  features: AccommodationFeatureUpdateManyInput
}

input AccommodationUpdateManyDataInput {
  name: String
  code: Int
  slug: String
  livingArea: Int
  outsideArea: Int
  contactPerson: String
  contactPhone: String
  minCapacity: Int
  maxCapacity: Int
}

input AccommodationUpdateManyMutationInput {
  name: String
  code: Int
  slug: String
  livingArea: Int
  outsideArea: Int
  contactPerson: String
  contactPhone: String
  minCapacity: Int
  maxCapacity: Int
}

input AccommodationUpdateManyWithoutOwnerInput {
  create: [AccommodationCreateWithoutOwnerInput!]
  delete: [AccommodationWhereUniqueInput!]
  connect: [AccommodationWhereUniqueInput!]
  disconnect: [AccommodationWhereUniqueInput!]
  update: [AccommodationUpdateWithWhereUniqueWithoutOwnerInput!]
  upsert: [AccommodationUpsertWithWhereUniqueWithoutOwnerInput!]
  deleteMany: [AccommodationScalarWhereInput!]
  updateMany: [AccommodationUpdateManyWithWhereNestedInput!]
}

input AccommodationUpdateManyWithWhereNestedInput {
  where: AccommodationScalarWhereInput!
  data: AccommodationUpdateManyDataInput!
}

input AccommodationUpdateWithoutOwnerDataInput {
  name: String
  code: Int
  type: AccommodationTypeUpdateOneRequiredInput
  city: CityUpdateOneRequiredInput
  description: TranslatableStringUpdateOneRequiredInput
  longDescription: TranslatableStringUpdateOneInput
  slug: String
  livingArea: Int
  outsideArea: Int
  contactPerson: String
  contactPhone: String
  keyAddress: AddressUpdateOneRequiredInput
  address: AddressUpdateOneRequiredInput
  minCapacity: Int
  maxCapacity: Int
  photos: PhotoUpdateManyInput
  bedrooms: BedroomUpdateManyInput
  bathrooms: BathroomUpdateManyInput
  sites: SiteUpdateManyInput
  features: AccommodationFeatureUpdateManyInput
}

input AccommodationUpdateWithWhereUniqueWithoutOwnerInput {
  where: AccommodationWhereUniqueInput!
  data: AccommodationUpdateWithoutOwnerDataInput!
}

input AccommodationUpsertWithWhereUniqueWithoutOwnerInput {
  where: AccommodationWhereUniqueInput!
  update: AccommodationUpdateWithoutOwnerDataInput!
  create: AccommodationCreateWithoutOwnerInput!
}

input AccommodationWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  code: Int
  code_not: Int
  code_in: [Int!]
  code_not_in: [Int!]
  code_lt: Int
  code_lte: Int
  code_gt: Int
  code_gte: Int
  type: AccommodationTypeWhereInput
  city: CityWhereInput
  description: TranslatableStringWhereInput
  longDescription: TranslatableStringWhereInput
  slug: String
  slug_not: String
  slug_in: [String!]
  slug_not_in: [String!]
  slug_lt: String
  slug_lte: String
  slug_gt: String
  slug_gte: String
  slug_contains: String
  slug_not_contains: String
  slug_starts_with: String
  slug_not_starts_with: String
  slug_ends_with: String
  slug_not_ends_with: String
  livingArea: Int
  livingArea_not: Int
  livingArea_in: [Int!]
  livingArea_not_in: [Int!]
  livingArea_lt: Int
  livingArea_lte: Int
  livingArea_gt: Int
  livingArea_gte: Int
  outsideArea: Int
  outsideArea_not: Int
  outsideArea_in: [Int!]
  outsideArea_not_in: [Int!]
  outsideArea_lt: Int
  outsideArea_lte: Int
  outsideArea_gt: Int
  outsideArea_gte: Int
  contactPerson: String
  contactPerson_not: String
  contactPerson_in: [String!]
  contactPerson_not_in: [String!]
  contactPerson_lt: String
  contactPerson_lte: String
  contactPerson_gt: String
  contactPerson_gte: String
  contactPerson_contains: String
  contactPerson_not_contains: String
  contactPerson_starts_with: String
  contactPerson_not_starts_with: String
  contactPerson_ends_with: String
  contactPerson_not_ends_with: String
  contactPhone: String
  contactPhone_not: String
  contactPhone_in: [String!]
  contactPhone_not_in: [String!]
  contactPhone_lt: String
  contactPhone_lte: String
  contactPhone_gt: String
  contactPhone_gte: String
  contactPhone_contains: String
  contactPhone_not_contains: String
  contactPhone_starts_with: String
  contactPhone_not_starts_with: String
  contactPhone_ends_with: String
  contactPhone_not_ends_with: String
  keyAddress: AddressWhereInput
  address: AddressWhereInput
  minCapacity: Int
  minCapacity_not: Int
  minCapacity_in: [Int!]
  minCapacity_not_in: [Int!]
  minCapacity_lt: Int
  minCapacity_lte: Int
  minCapacity_gt: Int
  minCapacity_gte: Int
  maxCapacity: Int
  maxCapacity_not: Int
  maxCapacity_in: [Int!]
  maxCapacity_not_in: [Int!]
  maxCapacity_lt: Int
  maxCapacity_lte: Int
  maxCapacity_gt: Int
  maxCapacity_gte: Int
  photos_every: PhotoWhereInput
  photos_some: PhotoWhereInput
  photos_none: PhotoWhereInput
  owner: UserWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  bedrooms_every: BedroomWhereInput
  bedrooms_some: BedroomWhereInput
  bedrooms_none: BedroomWhereInput
  bathrooms_every: BathroomWhereInput
  bathrooms_some: BathroomWhereInput
  bathrooms_none: BathroomWhereInput
  sites_every: SiteWhereInput
  sites_some: SiteWhereInput
  sites_none: SiteWhereInput
  features_every: AccommodationFeatureWhereInput
  features_some: AccommodationFeatureWhereInput
  features_none: AccommodationFeatureWhereInput
  AND: [AccommodationWhereInput!]
  OR: [AccommodationWhereInput!]
  NOT: [AccommodationWhereInput!]
}

input AccommodationWhereUniqueInput {
  id: ID
}

type Address {
  id: ID!
  address: String!
  postcode: String!
  city: String!
}

type AddressConnection {
  pageInfo: PageInfo!
  edges: [AddressEdge]!
  aggregate: AggregateAddress!
}

input AddressCreateInput {
  address: String!
  postcode: String!
  city: String!
}

input AddressCreateOneInput {
  create: AddressCreateInput
  connect: AddressWhereUniqueInput
}

type AddressEdge {
  node: Address!
  cursor: String!
}

enum AddressOrderByInput {
  id_ASC
  id_DESC
  address_ASC
  address_DESC
  postcode_ASC
  postcode_DESC
  city_ASC
  city_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type AddressPreviousValues {
  id: ID!
  address: String!
  postcode: String!
  city: String!
}

type AddressSubscriptionPayload {
  mutation: MutationType!
  node: Address
  updatedFields: [String!]
  previousValues: AddressPreviousValues
}

input AddressSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: AddressWhereInput
  AND: [AddressSubscriptionWhereInput!]
  OR: [AddressSubscriptionWhereInput!]
  NOT: [AddressSubscriptionWhereInput!]
}

input AddressUpdateDataInput {
  address: String
  postcode: String
  city: String
}

input AddressUpdateInput {
  address: String
  postcode: String
  city: String
}

input AddressUpdateManyMutationInput {
  address: String
  postcode: String
  city: String
}

input AddressUpdateOneRequiredInput {
  create: AddressCreateInput
  update: AddressUpdateDataInput
  upsert: AddressUpsertNestedInput
  connect: AddressWhereUniqueInput
}

input AddressUpsertNestedInput {
  update: AddressUpdateDataInput!
  create: AddressCreateInput!
}

input AddressWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  address: String
  address_not: String
  address_in: [String!]
  address_not_in: [String!]
  address_lt: String
  address_lte: String
  address_gt: String
  address_gte: String
  address_contains: String
  address_not_contains: String
  address_starts_with: String
  address_not_starts_with: String
  address_ends_with: String
  address_not_ends_with: String
  postcode: String
  postcode_not: String
  postcode_in: [String!]
  postcode_not_in: [String!]
  postcode_lt: String
  postcode_lte: String
  postcode_gt: String
  postcode_gte: String
  postcode_contains: String
  postcode_not_contains: String
  postcode_starts_with: String
  postcode_not_starts_with: String
  postcode_ends_with: String
  postcode_not_ends_with: String
  city: String
  city_not: String
  city_in: [String!]
  city_not_in: [String!]
  city_lt: String
  city_lte: String
  city_gt: String
  city_gte: String
  city_contains: String
  city_not_contains: String
  city_starts_with: String
  city_not_starts_with: String
  city_ends_with: String
  city_not_ends_with: String
  AND: [AddressWhereInput!]
  OR: [AddressWhereInput!]
  NOT: [AddressWhereInput!]
}

input AddressWhereUniqueInput {
  id: ID
}

type AggregateAccommodation {
  count: Int!
}

type AggregateAccommodationFeature {
  count: Int!
}

type AggregateAccommodationType {
  count: Int!
}

type AggregateAddress {
  count: Int!
}

type AggregateBathroom {
  count: Int!
}

type AggregateBathroomType {
  count: Int!
}

type AggregateBedroom {
  count: Int!
}

type AggregateBedroomType {
  count: Int!
}

type AggregateCity {
  count: Int!
}

type AggregatePhoto {
  count: Int!
}

type AggregateSite {
  count: Int!
}

type AggregateTranslatableString {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Bathroom {
  id: ID!
  name: TranslatableString
  type: BathroomType
  toilet: Int!
  bath: Int!
  shower: Int!
}

type BathroomConnection {
  pageInfo: PageInfo!
  edges: [BathroomEdge]!
  aggregate: AggregateBathroom!
}

input BathroomCreateInput {
  name: TranslatableStringCreateOneInput
  type: BathroomTypeCreateOneInput
  toilet: Int!
  bath: Int!
  shower: Int!
}

input BathroomCreateManyInput {
  create: [BathroomCreateInput!]
  connect: [BathroomWhereUniqueInput!]
}

type BathroomEdge {
  node: Bathroom!
  cursor: String!
}

enum BathroomOrderByInput {
  id_ASC
  id_DESC
  toilet_ASC
  toilet_DESC
  bath_ASC
  bath_DESC
  shower_ASC
  shower_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type BathroomPreviousValues {
  id: ID!
  toilet: Int!
  bath: Int!
  shower: Int!
}

input BathroomScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  toilet: Int
  toilet_not: Int
  toilet_in: [Int!]
  toilet_not_in: [Int!]
  toilet_lt: Int
  toilet_lte: Int
  toilet_gt: Int
  toilet_gte: Int
  bath: Int
  bath_not: Int
  bath_in: [Int!]
  bath_not_in: [Int!]
  bath_lt: Int
  bath_lte: Int
  bath_gt: Int
  bath_gte: Int
  shower: Int
  shower_not: Int
  shower_in: [Int!]
  shower_not_in: [Int!]
  shower_lt: Int
  shower_lte: Int
  shower_gt: Int
  shower_gte: Int
  AND: [BathroomScalarWhereInput!]
  OR: [BathroomScalarWhereInput!]
  NOT: [BathroomScalarWhereInput!]
}

type BathroomSubscriptionPayload {
  mutation: MutationType!
  node: Bathroom
  updatedFields: [String!]
  previousValues: BathroomPreviousValues
}

input BathroomSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: BathroomWhereInput
  AND: [BathroomSubscriptionWhereInput!]
  OR: [BathroomSubscriptionWhereInput!]
  NOT: [BathroomSubscriptionWhereInput!]
}

type BathroomType {
  id: ID!
  name: String
}

type BathroomTypeConnection {
  pageInfo: PageInfo!
  edges: [BathroomTypeEdge]!
  aggregate: AggregateBathroomType!
}

input BathroomTypeCreateInput {
  name: String
}

input BathroomTypeCreateOneInput {
  create: BathroomTypeCreateInput
  connect: BathroomTypeWhereUniqueInput
}

type BathroomTypeEdge {
  node: BathroomType!
  cursor: String!
}

enum BathroomTypeOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type BathroomTypePreviousValues {
  id: ID!
  name: String
}

type BathroomTypeSubscriptionPayload {
  mutation: MutationType!
  node: BathroomType
  updatedFields: [String!]
  previousValues: BathroomTypePreviousValues
}

input BathroomTypeSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: BathroomTypeWhereInput
  AND: [BathroomTypeSubscriptionWhereInput!]
  OR: [BathroomTypeSubscriptionWhereInput!]
  NOT: [BathroomTypeSubscriptionWhereInput!]
}

input BathroomTypeUpdateDataInput {
  name: String
}

input BathroomTypeUpdateInput {
  name: String
}

input BathroomTypeUpdateManyMutationInput {
  name: String
}

input BathroomTypeUpdateOneInput {
  create: BathroomTypeCreateInput
  update: BathroomTypeUpdateDataInput
  upsert: BathroomTypeUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: BathroomTypeWhereUniqueInput
}

input BathroomTypeUpsertNestedInput {
  update: BathroomTypeUpdateDataInput!
  create: BathroomTypeCreateInput!
}

input BathroomTypeWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  AND: [BathroomTypeWhereInput!]
  OR: [BathroomTypeWhereInput!]
  NOT: [BathroomTypeWhereInput!]
}

input BathroomTypeWhereUniqueInput {
  id: ID
}

input BathroomUpdateDataInput {
  name: TranslatableStringUpdateOneInput
  type: BathroomTypeUpdateOneInput
  toilet: Int
  bath: Int
  shower: Int
}

input BathroomUpdateInput {
  name: TranslatableStringUpdateOneInput
  type: BathroomTypeUpdateOneInput
  toilet: Int
  bath: Int
  shower: Int
}

input BathroomUpdateManyDataInput {
  toilet: Int
  bath: Int
  shower: Int
}

input BathroomUpdateManyInput {
  create: [BathroomCreateInput!]
  update: [BathroomUpdateWithWhereUniqueNestedInput!]
  upsert: [BathroomUpsertWithWhereUniqueNestedInput!]
  delete: [BathroomWhereUniqueInput!]
  connect: [BathroomWhereUniqueInput!]
  disconnect: [BathroomWhereUniqueInput!]
  deleteMany: [BathroomScalarWhereInput!]
  updateMany: [BathroomUpdateManyWithWhereNestedInput!]
}

input BathroomUpdateManyMutationInput {
  toilet: Int
  bath: Int
  shower: Int
}

input BathroomUpdateManyWithWhereNestedInput {
  where: BathroomScalarWhereInput!
  data: BathroomUpdateManyDataInput!
}

input BathroomUpdateWithWhereUniqueNestedInput {
  where: BathroomWhereUniqueInput!
  data: BathroomUpdateDataInput!
}

input BathroomUpsertWithWhereUniqueNestedInput {
  where: BathroomWhereUniqueInput!
  update: BathroomUpdateDataInput!
  create: BathroomCreateInput!
}

input BathroomWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: TranslatableStringWhereInput
  type: BathroomTypeWhereInput
  toilet: Int
  toilet_not: Int
  toilet_in: [Int!]
  toilet_not_in: [Int!]
  toilet_lt: Int
  toilet_lte: Int
  toilet_gt: Int
  toilet_gte: Int
  bath: Int
  bath_not: Int
  bath_in: [Int!]
  bath_not_in: [Int!]
  bath_lt: Int
  bath_lte: Int
  bath_gt: Int
  bath_gte: Int
  shower: Int
  shower_not: Int
  shower_in: [Int!]
  shower_not_in: [Int!]
  shower_lt: Int
  shower_lte: Int
  shower_gt: Int
  shower_gte: Int
  AND: [BathroomWhereInput!]
  OR: [BathroomWhereInput!]
  NOT: [BathroomWhereInput!]
}

input BathroomWhereUniqueInput {
  id: ID
}

type Bedroom {
  id: ID!
  name: TranslatableString
  type: BedroomType
  singleBed: Int!
  doubleBed: Int!
}

type BedroomConnection {
  pageInfo: PageInfo!
  edges: [BedroomEdge]!
  aggregate: AggregateBedroom!
}

input BedroomCreateInput {
  name: TranslatableStringCreateOneInput
  type: BedroomTypeCreateOneInput
  singleBed: Int!
  doubleBed: Int!
}

input BedroomCreateManyInput {
  create: [BedroomCreateInput!]
  connect: [BedroomWhereUniqueInput!]
}

type BedroomEdge {
  node: Bedroom!
  cursor: String!
}

enum BedroomOrderByInput {
  id_ASC
  id_DESC
  singleBed_ASC
  singleBed_DESC
  doubleBed_ASC
  doubleBed_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type BedroomPreviousValues {
  id: ID!
  singleBed: Int!
  doubleBed: Int!
}

input BedroomScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  singleBed: Int
  singleBed_not: Int
  singleBed_in: [Int!]
  singleBed_not_in: [Int!]
  singleBed_lt: Int
  singleBed_lte: Int
  singleBed_gt: Int
  singleBed_gte: Int
  doubleBed: Int
  doubleBed_not: Int
  doubleBed_in: [Int!]
  doubleBed_not_in: [Int!]
  doubleBed_lt: Int
  doubleBed_lte: Int
  doubleBed_gt: Int
  doubleBed_gte: Int
  AND: [BedroomScalarWhereInput!]
  OR: [BedroomScalarWhereInput!]
  NOT: [BedroomScalarWhereInput!]
}

type BedroomSubscriptionPayload {
  mutation: MutationType!
  node: Bedroom
  updatedFields: [String!]
  previousValues: BedroomPreviousValues
}

input BedroomSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: BedroomWhereInput
  AND: [BedroomSubscriptionWhereInput!]
  OR: [BedroomSubscriptionWhereInput!]
  NOT: [BedroomSubscriptionWhereInput!]
}

type BedroomType {
  id: ID!
  name: String
}

type BedroomTypeConnection {
  pageInfo: PageInfo!
  edges: [BedroomTypeEdge]!
  aggregate: AggregateBedroomType!
}

input BedroomTypeCreateInput {
  name: String
}

input BedroomTypeCreateOneInput {
  create: BedroomTypeCreateInput
  connect: BedroomTypeWhereUniqueInput
}

type BedroomTypeEdge {
  node: BedroomType!
  cursor: String!
}

enum BedroomTypeOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type BedroomTypePreviousValues {
  id: ID!
  name: String
}

type BedroomTypeSubscriptionPayload {
  mutation: MutationType!
  node: BedroomType
  updatedFields: [String!]
  previousValues: BedroomTypePreviousValues
}

input BedroomTypeSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: BedroomTypeWhereInput
  AND: [BedroomTypeSubscriptionWhereInput!]
  OR: [BedroomTypeSubscriptionWhereInput!]
  NOT: [BedroomTypeSubscriptionWhereInput!]
}

input BedroomTypeUpdateDataInput {
  name: String
}

input BedroomTypeUpdateInput {
  name: String
}

input BedroomTypeUpdateManyMutationInput {
  name: String
}

input BedroomTypeUpdateOneInput {
  create: BedroomTypeCreateInput
  update: BedroomTypeUpdateDataInput
  upsert: BedroomTypeUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: BedroomTypeWhereUniqueInput
}

input BedroomTypeUpsertNestedInput {
  update: BedroomTypeUpdateDataInput!
  create: BedroomTypeCreateInput!
}

input BedroomTypeWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  AND: [BedroomTypeWhereInput!]
  OR: [BedroomTypeWhereInput!]
  NOT: [BedroomTypeWhereInput!]
}

input BedroomTypeWhereUniqueInput {
  id: ID
}

input BedroomUpdateDataInput {
  name: TranslatableStringUpdateOneInput
  type: BedroomTypeUpdateOneInput
  singleBed: Int
  doubleBed: Int
}

input BedroomUpdateInput {
  name: TranslatableStringUpdateOneInput
  type: BedroomTypeUpdateOneInput
  singleBed: Int
  doubleBed: Int
}

input BedroomUpdateManyDataInput {
  singleBed: Int
  doubleBed: Int
}

input BedroomUpdateManyInput {
  create: [BedroomCreateInput!]
  update: [BedroomUpdateWithWhereUniqueNestedInput!]
  upsert: [BedroomUpsertWithWhereUniqueNestedInput!]
  delete: [BedroomWhereUniqueInput!]
  connect: [BedroomWhereUniqueInput!]
  disconnect: [BedroomWhereUniqueInput!]
  deleteMany: [BedroomScalarWhereInput!]
  updateMany: [BedroomUpdateManyWithWhereNestedInput!]
}

input BedroomUpdateManyMutationInput {
  singleBed: Int
  doubleBed: Int
}

input BedroomUpdateManyWithWhereNestedInput {
  where: BedroomScalarWhereInput!
  data: BedroomUpdateManyDataInput!
}

input BedroomUpdateWithWhereUniqueNestedInput {
  where: BedroomWhereUniqueInput!
  data: BedroomUpdateDataInput!
}

input BedroomUpsertWithWhereUniqueNestedInput {
  where: BedroomWhereUniqueInput!
  update: BedroomUpdateDataInput!
  create: BedroomCreateInput!
}

input BedroomWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: TranslatableStringWhereInput
  type: BedroomTypeWhereInput
  singleBed: Int
  singleBed_not: Int
  singleBed_in: [Int!]
  singleBed_not_in: [Int!]
  singleBed_lt: Int
  singleBed_lte: Int
  singleBed_gt: Int
  singleBed_gte: Int
  doubleBed: Int
  doubleBed_not: Int
  doubleBed_in: [Int!]
  doubleBed_not_in: [Int!]
  doubleBed_lt: Int
  doubleBed_lte: Int
  doubleBed_gt: Int
  doubleBed_gte: Int
  AND: [BedroomWhereInput!]
  OR: [BedroomWhereInput!]
  NOT: [BedroomWhereInput!]
}

input BedroomWhereUniqueInput {
  id: ID
}

type City {
  id: ID!
  name: String
}

type CityConnection {
  pageInfo: PageInfo!
  edges: [CityEdge]!
  aggregate: AggregateCity!
}

input CityCreateInput {
  name: String
}

input CityCreateOneInput {
  create: CityCreateInput
  connect: CityWhereUniqueInput
}

type CityEdge {
  node: City!
  cursor: String!
}

enum CityOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CityPreviousValues {
  id: ID!
  name: String
}

type CitySubscriptionPayload {
  mutation: MutationType!
  node: City
  updatedFields: [String!]
  previousValues: CityPreviousValues
}

input CitySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CityWhereInput
  AND: [CitySubscriptionWhereInput!]
  OR: [CitySubscriptionWhereInput!]
  NOT: [CitySubscriptionWhereInput!]
}

input CityUpdateDataInput {
  name: String
}

input CityUpdateInput {
  name: String
}

input CityUpdateManyMutationInput {
  name: String
}

input CityUpdateOneRequiredInput {
  create: CityCreateInput
  update: CityUpdateDataInput
  upsert: CityUpsertNestedInput
  connect: CityWhereUniqueInput
}

input CityUpsertNestedInput {
  update: CityUpdateDataInput!
  create: CityCreateInput!
}

input CityWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  AND: [CityWhereInput!]
  OR: [CityWhereInput!]
  NOT: [CityWhereInput!]
}

input CityWhereUniqueInput {
  id: ID
}

scalar DateTime

scalar Long

type Mutation {
  createAccommodation(data: AccommodationCreateInput!): Accommodation!
  updateAccommodation(data: AccommodationUpdateInput!, where: AccommodationWhereUniqueInput!): Accommodation
  updateManyAccommodations(data: AccommodationUpdateManyMutationInput!, where: AccommodationWhereInput): BatchPayload!
  upsertAccommodation(where: AccommodationWhereUniqueInput!, create: AccommodationCreateInput!, update: AccommodationUpdateInput!): Accommodation!
  deleteAccommodation(where: AccommodationWhereUniqueInput!): Accommodation
  deleteManyAccommodations(where: AccommodationWhereInput): BatchPayload!
  createAccommodationFeature(data: AccommodationFeatureCreateInput!): AccommodationFeature!
  updateAccommodationFeature(data: AccommodationFeatureUpdateInput!, where: AccommodationFeatureWhereUniqueInput!): AccommodationFeature
  updateManyAccommodationFeatures(data: AccommodationFeatureUpdateManyMutationInput!, where: AccommodationFeatureWhereInput): BatchPayload!
  upsertAccommodationFeature(where: AccommodationFeatureWhereUniqueInput!, create: AccommodationFeatureCreateInput!, update: AccommodationFeatureUpdateInput!): AccommodationFeature!
  deleteAccommodationFeature(where: AccommodationFeatureWhereUniqueInput!): AccommodationFeature
  deleteManyAccommodationFeatures(where: AccommodationFeatureWhereInput): BatchPayload!
  createAccommodationType(data: AccommodationTypeCreateInput!): AccommodationType!
  updateAccommodationType(data: AccommodationTypeUpdateInput!, where: AccommodationTypeWhereUniqueInput!): AccommodationType
  updateManyAccommodationTypes(data: AccommodationTypeUpdateManyMutationInput!, where: AccommodationTypeWhereInput): BatchPayload!
  upsertAccommodationType(where: AccommodationTypeWhereUniqueInput!, create: AccommodationTypeCreateInput!, update: AccommodationTypeUpdateInput!): AccommodationType!
  deleteAccommodationType(where: AccommodationTypeWhereUniqueInput!): AccommodationType
  deleteManyAccommodationTypes(where: AccommodationTypeWhereInput): BatchPayload!
  createAddress(data: AddressCreateInput!): Address!
  updateAddress(data: AddressUpdateInput!, where: AddressWhereUniqueInput!): Address
  updateManyAddresses(data: AddressUpdateManyMutationInput!, where: AddressWhereInput): BatchPayload!
  upsertAddress(where: AddressWhereUniqueInput!, create: AddressCreateInput!, update: AddressUpdateInput!): Address!
  deleteAddress(where: AddressWhereUniqueInput!): Address
  deleteManyAddresses(where: AddressWhereInput): BatchPayload!
  createBathroom(data: BathroomCreateInput!): Bathroom!
  updateBathroom(data: BathroomUpdateInput!, where: BathroomWhereUniqueInput!): Bathroom
  updateManyBathrooms(data: BathroomUpdateManyMutationInput!, where: BathroomWhereInput): BatchPayload!
  upsertBathroom(where: BathroomWhereUniqueInput!, create: BathroomCreateInput!, update: BathroomUpdateInput!): Bathroom!
  deleteBathroom(where: BathroomWhereUniqueInput!): Bathroom
  deleteManyBathrooms(where: BathroomWhereInput): BatchPayload!
  createBathroomType(data: BathroomTypeCreateInput!): BathroomType!
  updateBathroomType(data: BathroomTypeUpdateInput!, where: BathroomTypeWhereUniqueInput!): BathroomType
  updateManyBathroomTypes(data: BathroomTypeUpdateManyMutationInput!, where: BathroomTypeWhereInput): BatchPayload!
  upsertBathroomType(where: BathroomTypeWhereUniqueInput!, create: BathroomTypeCreateInput!, update: BathroomTypeUpdateInput!): BathroomType!
  deleteBathroomType(where: BathroomTypeWhereUniqueInput!): BathroomType
  deleteManyBathroomTypes(where: BathroomTypeWhereInput): BatchPayload!
  createBedroom(data: BedroomCreateInput!): Bedroom!
  updateBedroom(data: BedroomUpdateInput!, where: BedroomWhereUniqueInput!): Bedroom
  updateManyBedrooms(data: BedroomUpdateManyMutationInput!, where: BedroomWhereInput): BatchPayload!
  upsertBedroom(where: BedroomWhereUniqueInput!, create: BedroomCreateInput!, update: BedroomUpdateInput!): Bedroom!
  deleteBedroom(where: BedroomWhereUniqueInput!): Bedroom
  deleteManyBedrooms(where: BedroomWhereInput): BatchPayload!
  createBedroomType(data: BedroomTypeCreateInput!): BedroomType!
  updateBedroomType(data: BedroomTypeUpdateInput!, where: BedroomTypeWhereUniqueInput!): BedroomType
  updateManyBedroomTypes(data: BedroomTypeUpdateManyMutationInput!, where: BedroomTypeWhereInput): BatchPayload!
  upsertBedroomType(where: BedroomTypeWhereUniqueInput!, create: BedroomTypeCreateInput!, update: BedroomTypeUpdateInput!): BedroomType!
  deleteBedroomType(where: BedroomTypeWhereUniqueInput!): BedroomType
  deleteManyBedroomTypes(where: BedroomTypeWhereInput): BatchPayload!
  createCity(data: CityCreateInput!): City!
  updateCity(data: CityUpdateInput!, where: CityWhereUniqueInput!): City
  updateManyCities(data: CityUpdateManyMutationInput!, where: CityWhereInput): BatchPayload!
  upsertCity(where: CityWhereUniqueInput!, create: CityCreateInput!, update: CityUpdateInput!): City!
  deleteCity(where: CityWhereUniqueInput!): City
  deleteManyCities(where: CityWhereInput): BatchPayload!
  createPhoto(data: PhotoCreateInput!): Photo!
  updatePhoto(data: PhotoUpdateInput!, where: PhotoWhereUniqueInput!): Photo
  updateManyPhotos(data: PhotoUpdateManyMutationInput!, where: PhotoWhereInput): BatchPayload!
  upsertPhoto(where: PhotoWhereUniqueInput!, create: PhotoCreateInput!, update: PhotoUpdateInput!): Photo!
  deletePhoto(where: PhotoWhereUniqueInput!): Photo
  deleteManyPhotos(where: PhotoWhereInput): BatchPayload!
  createSite(data: SiteCreateInput!): Site!
  updateSite(data: SiteUpdateInput!, where: SiteWhereUniqueInput!): Site
  updateManySites(data: SiteUpdateManyMutationInput!, where: SiteWhereInput): BatchPayload!
  upsertSite(where: SiteWhereUniqueInput!, create: SiteCreateInput!, update: SiteUpdateInput!): Site!
  deleteSite(where: SiteWhereUniqueInput!): Site
  deleteManySites(where: SiteWhereInput): BatchPayload!
  createTranslatableString(data: TranslatableStringCreateInput!): TranslatableString!
  updateTranslatableString(data: TranslatableStringUpdateInput!, where: TranslatableStringWhereUniqueInput!): TranslatableString
  updateManyTranslatableStrings(data: TranslatableStringUpdateManyMutationInput!, where: TranslatableStringWhereInput): BatchPayload!
  upsertTranslatableString(where: TranslatableStringWhereUniqueInput!, create: TranslatableStringCreateInput!, update: TranslatableStringUpdateInput!): TranslatableString!
  deleteTranslatableString(where: TranslatableStringWhereUniqueInput!): TranslatableString
  deleteManyTranslatableStrings(where: TranslatableStringWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Photo {
  id: ID!
  url: String!
  name: TranslatableString!
}

type PhotoConnection {
  pageInfo: PageInfo!
  edges: [PhotoEdge]!
  aggregate: AggregatePhoto!
}

input PhotoCreateInput {
  url: String!
  name: TranslatableStringCreateOneInput!
}

input PhotoCreateManyInput {
  create: [PhotoCreateInput!]
  connect: [PhotoWhereUniqueInput!]
}

type PhotoEdge {
  node: Photo!
  cursor: String!
}

enum PhotoOrderByInput {
  id_ASC
  id_DESC
  url_ASC
  url_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type PhotoPreviousValues {
  id: ID!
  url: String!
}

input PhotoScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  url: String
  url_not: String
  url_in: [String!]
  url_not_in: [String!]
  url_lt: String
  url_lte: String
  url_gt: String
  url_gte: String
  url_contains: String
  url_not_contains: String
  url_starts_with: String
  url_not_starts_with: String
  url_ends_with: String
  url_not_ends_with: String
  AND: [PhotoScalarWhereInput!]
  OR: [PhotoScalarWhereInput!]
  NOT: [PhotoScalarWhereInput!]
}

type PhotoSubscriptionPayload {
  mutation: MutationType!
  node: Photo
  updatedFields: [String!]
  previousValues: PhotoPreviousValues
}

input PhotoSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PhotoWhereInput
  AND: [PhotoSubscriptionWhereInput!]
  OR: [PhotoSubscriptionWhereInput!]
  NOT: [PhotoSubscriptionWhereInput!]
}

input PhotoUpdateDataInput {
  url: String
  name: TranslatableStringUpdateOneRequiredInput
}

input PhotoUpdateInput {
  url: String
  name: TranslatableStringUpdateOneRequiredInput
}

input PhotoUpdateManyDataInput {
  url: String
}

input PhotoUpdateManyInput {
  create: [PhotoCreateInput!]
  update: [PhotoUpdateWithWhereUniqueNestedInput!]
  upsert: [PhotoUpsertWithWhereUniqueNestedInput!]
  delete: [PhotoWhereUniqueInput!]
  connect: [PhotoWhereUniqueInput!]
  disconnect: [PhotoWhereUniqueInput!]
  deleteMany: [PhotoScalarWhereInput!]
  updateMany: [PhotoUpdateManyWithWhereNestedInput!]
}

input PhotoUpdateManyMutationInput {
  url: String
}

input PhotoUpdateManyWithWhereNestedInput {
  where: PhotoScalarWhereInput!
  data: PhotoUpdateManyDataInput!
}

input PhotoUpdateWithWhereUniqueNestedInput {
  where: PhotoWhereUniqueInput!
  data: PhotoUpdateDataInput!
}

input PhotoUpsertWithWhereUniqueNestedInput {
  where: PhotoWhereUniqueInput!
  update: PhotoUpdateDataInput!
  create: PhotoCreateInput!
}

input PhotoWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  url: String
  url_not: String
  url_in: [String!]
  url_not_in: [String!]
  url_lt: String
  url_lte: String
  url_gt: String
  url_gte: String
  url_contains: String
  url_not_contains: String
  url_starts_with: String
  url_not_starts_with: String
  url_ends_with: String
  url_not_ends_with: String
  name: TranslatableStringWhereInput
  AND: [PhotoWhereInput!]
  OR: [PhotoWhereInput!]
  NOT: [PhotoWhereInput!]
}

input PhotoWhereUniqueInput {
  id: ID
}

type Query {
  accommodation(where: AccommodationWhereUniqueInput!): Accommodation
  accommodations(where: AccommodationWhereInput, orderBy: AccommodationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Accommodation]!
  accommodationsConnection(where: AccommodationWhereInput, orderBy: AccommodationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AccommodationConnection!
  accommodationFeature(where: AccommodationFeatureWhereUniqueInput!): AccommodationFeature
  accommodationFeatures(where: AccommodationFeatureWhereInput, orderBy: AccommodationFeatureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [AccommodationFeature]!
  accommodationFeaturesConnection(where: AccommodationFeatureWhereInput, orderBy: AccommodationFeatureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AccommodationFeatureConnection!
  accommodationType(where: AccommodationTypeWhereUniqueInput!): AccommodationType
  accommodationTypes(where: AccommodationTypeWhereInput, orderBy: AccommodationTypeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [AccommodationType]!
  accommodationTypesConnection(where: AccommodationTypeWhereInput, orderBy: AccommodationTypeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AccommodationTypeConnection!
  address(where: AddressWhereUniqueInput!): Address
  addresses(where: AddressWhereInput, orderBy: AddressOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Address]!
  addressesConnection(where: AddressWhereInput, orderBy: AddressOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AddressConnection!
  bathroom(where: BathroomWhereUniqueInput!): Bathroom
  bathrooms(where: BathroomWhereInput, orderBy: BathroomOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Bathroom]!
  bathroomsConnection(where: BathroomWhereInput, orderBy: BathroomOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): BathroomConnection!
  bathroomType(where: BathroomTypeWhereUniqueInput!): BathroomType
  bathroomTypes(where: BathroomTypeWhereInput, orderBy: BathroomTypeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [BathroomType]!
  bathroomTypesConnection(where: BathroomTypeWhereInput, orderBy: BathroomTypeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): BathroomTypeConnection!
  bedroom(where: BedroomWhereUniqueInput!): Bedroom
  bedrooms(where: BedroomWhereInput, orderBy: BedroomOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Bedroom]!
  bedroomsConnection(where: BedroomWhereInput, orderBy: BedroomOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): BedroomConnection!
  bedroomType(where: BedroomTypeWhereUniqueInput!): BedroomType
  bedroomTypes(where: BedroomTypeWhereInput, orderBy: BedroomTypeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [BedroomType]!
  bedroomTypesConnection(where: BedroomTypeWhereInput, orderBy: BedroomTypeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): BedroomTypeConnection!
  city(where: CityWhereUniqueInput!): City
  cities(where: CityWhereInput, orderBy: CityOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [City]!
  citiesConnection(where: CityWhereInput, orderBy: CityOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CityConnection!
  photo(where: PhotoWhereUniqueInput!): Photo
  photos(where: PhotoWhereInput, orderBy: PhotoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Photo]!
  photosConnection(where: PhotoWhereInput, orderBy: PhotoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PhotoConnection!
  site(where: SiteWhereUniqueInput!): Site
  sites(where: SiteWhereInput, orderBy: SiteOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Site]!
  sitesConnection(where: SiteWhereInput, orderBy: SiteOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SiteConnection!
  translatableString(where: TranslatableStringWhereUniqueInput!): TranslatableString
  translatableStrings(where: TranslatableStringWhereInput, orderBy: TranslatableStringOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TranslatableString]!
  translatableStringsConnection(where: TranslatableStringWhereInput, orderBy: TranslatableStringOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TranslatableStringConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Site {
  id: ID!
  name: String!
}

type SiteConnection {
  pageInfo: PageInfo!
  edges: [SiteEdge]!
  aggregate: AggregateSite!
}

input SiteCreateInput {
  name: String!
}

input SiteCreateManyInput {
  create: [SiteCreateInput!]
  connect: [SiteWhereUniqueInput!]
}

type SiteEdge {
  node: Site!
  cursor: String!
}

enum SiteOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type SitePreviousValues {
  id: ID!
  name: String!
}

input SiteScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  AND: [SiteScalarWhereInput!]
  OR: [SiteScalarWhereInput!]
  NOT: [SiteScalarWhereInput!]
}

type SiteSubscriptionPayload {
  mutation: MutationType!
  node: Site
  updatedFields: [String!]
  previousValues: SitePreviousValues
}

input SiteSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: SiteWhereInput
  AND: [SiteSubscriptionWhereInput!]
  OR: [SiteSubscriptionWhereInput!]
  NOT: [SiteSubscriptionWhereInput!]
}

input SiteUpdateDataInput {
  name: String
}

input SiteUpdateInput {
  name: String
}

input SiteUpdateManyDataInput {
  name: String
}

input SiteUpdateManyInput {
  create: [SiteCreateInput!]
  update: [SiteUpdateWithWhereUniqueNestedInput!]
  upsert: [SiteUpsertWithWhereUniqueNestedInput!]
  delete: [SiteWhereUniqueInput!]
  connect: [SiteWhereUniqueInput!]
  disconnect: [SiteWhereUniqueInput!]
  deleteMany: [SiteScalarWhereInput!]
  updateMany: [SiteUpdateManyWithWhereNestedInput!]
}

input SiteUpdateManyMutationInput {
  name: String
}

input SiteUpdateManyWithWhereNestedInput {
  where: SiteScalarWhereInput!
  data: SiteUpdateManyDataInput!
}

input SiteUpdateWithWhereUniqueNestedInput {
  where: SiteWhereUniqueInput!
  data: SiteUpdateDataInput!
}

input SiteUpsertWithWhereUniqueNestedInput {
  where: SiteWhereUniqueInput!
  update: SiteUpdateDataInput!
  create: SiteCreateInput!
}

input SiteWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  AND: [SiteWhereInput!]
  OR: [SiteWhereInput!]
  NOT: [SiteWhereInput!]
}

input SiteWhereUniqueInput {
  id: ID
}

type Subscription {
  accommodation(where: AccommodationSubscriptionWhereInput): AccommodationSubscriptionPayload
  accommodationFeature(where: AccommodationFeatureSubscriptionWhereInput): AccommodationFeatureSubscriptionPayload
  accommodationType(where: AccommodationTypeSubscriptionWhereInput): AccommodationTypeSubscriptionPayload
  address(where: AddressSubscriptionWhereInput): AddressSubscriptionPayload
  bathroom(where: BathroomSubscriptionWhereInput): BathroomSubscriptionPayload
  bathroomType(where: BathroomTypeSubscriptionWhereInput): BathroomTypeSubscriptionPayload
  bedroom(where: BedroomSubscriptionWhereInput): BedroomSubscriptionPayload
  bedroomType(where: BedroomTypeSubscriptionWhereInput): BedroomTypeSubscriptionPayload
  city(where: CitySubscriptionWhereInput): CitySubscriptionPayload
  photo(where: PhotoSubscriptionWhereInput): PhotoSubscriptionPayload
  site(where: SiteSubscriptionWhereInput): SiteSubscriptionPayload
  translatableString(where: TranslatableStringSubscriptionWhereInput): TranslatableStringSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type TranslatableString {
  id: ID!
  en: String
  nl: String
  de: String
}

type TranslatableStringConnection {
  pageInfo: PageInfo!
  edges: [TranslatableStringEdge]!
  aggregate: AggregateTranslatableString!
}

input TranslatableStringCreateInput {
  en: String
  nl: String
  de: String
}

input TranslatableStringCreateOneInput {
  create: TranslatableStringCreateInput
  connect: TranslatableStringWhereUniqueInput
}

type TranslatableStringEdge {
  node: TranslatableString!
  cursor: String!
}

enum TranslatableStringOrderByInput {
  id_ASC
  id_DESC
  en_ASC
  en_DESC
  nl_ASC
  nl_DESC
  de_ASC
  de_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type TranslatableStringPreviousValues {
  id: ID!
  en: String
  nl: String
  de: String
}

type TranslatableStringSubscriptionPayload {
  mutation: MutationType!
  node: TranslatableString
  updatedFields: [String!]
  previousValues: TranslatableStringPreviousValues
}

input TranslatableStringSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TranslatableStringWhereInput
  AND: [TranslatableStringSubscriptionWhereInput!]
  OR: [TranslatableStringSubscriptionWhereInput!]
  NOT: [TranslatableStringSubscriptionWhereInput!]
}

input TranslatableStringUpdateDataInput {
  en: String
  nl: String
  de: String
}

input TranslatableStringUpdateInput {
  en: String
  nl: String
  de: String
}

input TranslatableStringUpdateManyMutationInput {
  en: String
  nl: String
  de: String
}

input TranslatableStringUpdateOneInput {
  create: TranslatableStringCreateInput
  update: TranslatableStringUpdateDataInput
  upsert: TranslatableStringUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: TranslatableStringWhereUniqueInput
}

input TranslatableStringUpdateOneRequiredInput {
  create: TranslatableStringCreateInput
  update: TranslatableStringUpdateDataInput
  upsert: TranslatableStringUpsertNestedInput
  connect: TranslatableStringWhereUniqueInput
}

input TranslatableStringUpsertNestedInput {
  update: TranslatableStringUpdateDataInput!
  create: TranslatableStringCreateInput!
}

input TranslatableStringWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  en: String
  en_not: String
  en_in: [String!]
  en_not_in: [String!]
  en_lt: String
  en_lte: String
  en_gt: String
  en_gte: String
  en_contains: String
  en_not_contains: String
  en_starts_with: String
  en_not_starts_with: String
  en_ends_with: String
  en_not_ends_with: String
  nl: String
  nl_not: String
  nl_in: [String!]
  nl_not_in: [String!]
  nl_lt: String
  nl_lte: String
  nl_gt: String
  nl_gte: String
  nl_contains: String
  nl_not_contains: String
  nl_starts_with: String
  nl_not_starts_with: String
  nl_ends_with: String
  nl_not_ends_with: String
  de: String
  de_not: String
  de_in: [String!]
  de_not_in: [String!]
  de_lt: String
  de_lte: String
  de_gt: String
  de_gte: String
  de_contains: String
  de_not_contains: String
  de_starts_with: String
  de_not_starts_with: String
  de_ends_with: String
  de_not_ends_with: String
  AND: [TranslatableStringWhereInput!]
  OR: [TranslatableStringWhereInput!]
  NOT: [TranslatableStringWhereInput!]
}

input TranslatableStringWhereUniqueInput {
  id: ID
}

type User {
  id: ID!
  email: String!
  password: String
  firstName: String!
  lastName: String!
  address: Address!
  phone: String!
  accommodations(where: AccommodationWhereInput, orderBy: AccommodationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Accommodation!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  email: String!
  password: String
  firstName: String!
  lastName: String!
  address: AddressCreateOneInput!
  phone: String!
  accommodations: AccommodationCreateManyWithoutOwnerInput
}

input UserCreateOneWithoutAccommodationsInput {
  create: UserCreateWithoutAccommodationsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutAccommodationsInput {
  email: String!
  password: String
  firstName: String!
  lastName: String!
  address: AddressCreateOneInput!
  phone: String!
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  firstName_ASC
  firstName_DESC
  lastName_ASC
  lastName_DESC
  phone_ASC
  phone_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  email: String!
  password: String
  firstName: String!
  lastName: String!
  phone: String!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  email: String
  password: String
  firstName: String
  lastName: String
  address: AddressUpdateOneRequiredInput
  phone: String
  accommodations: AccommodationUpdateManyWithoutOwnerInput
}

input UserUpdateManyMutationInput {
  email: String
  password: String
  firstName: String
  lastName: String
  phone: String
}

input UserUpdateOneWithoutAccommodationsInput {
  create: UserCreateWithoutAccommodationsInput
  update: UserUpdateWithoutAccommodationsDataInput
  upsert: UserUpsertWithoutAccommodationsInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutAccommodationsDataInput {
  email: String
  password: String
  firstName: String
  lastName: String
  address: AddressUpdateOneRequiredInput
  phone: String
}

input UserUpsertWithoutAccommodationsInput {
  update: UserUpdateWithoutAccommodationsDataInput!
  create: UserCreateWithoutAccommodationsInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  firstName: String
  firstName_not: String
  firstName_in: [String!]
  firstName_not_in: [String!]
  firstName_lt: String
  firstName_lte: String
  firstName_gt: String
  firstName_gte: String
  firstName_contains: String
  firstName_not_contains: String
  firstName_starts_with: String
  firstName_not_starts_with: String
  firstName_ends_with: String
  firstName_not_ends_with: String
  lastName: String
  lastName_not: String
  lastName_in: [String!]
  lastName_not_in: [String!]
  lastName_lt: String
  lastName_lte: String
  lastName_gt: String
  lastName_gte: String
  lastName_contains: String
  lastName_not_contains: String
  lastName_starts_with: String
  lastName_not_starts_with: String
  lastName_ends_with: String
  lastName_not_ends_with: String
  address: AddressWhereInput
  phone: String
  phone_not: String
  phone_in: [String!]
  phone_not_in: [String!]
  phone_lt: String
  phone_lte: String
  phone_gt: String
  phone_gte: String
  phone_contains: String
  phone_not_contains: String
  phone_starts_with: String
  phone_not_starts_with: String
  phone_ends_with: String
  phone_not_ends_with: String
  accommodations_every: AccommodationWhereInput
  accommodations_some: AccommodationWhereInput
  accommodations_none: AccommodationWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`