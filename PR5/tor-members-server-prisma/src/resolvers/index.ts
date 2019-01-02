import { Resolvers } from '../generated/graphqlgen';
import { Query } from './Query';
import { Accommodation } from './Accommodation';
import { AccommodationType } from './AccommodationType';
import { City } from './City';
import { TranslatableString } from './TranslatableString';
import { Address } from './Address';
import { Photo } from './Photo';
import { Mutation } from './Mutation';
import { User } from './User';
import { AuthPayload } from './AuthPayload';
import { Bedroom } from './Bedroom';
import { Site } from './Site';
import { Bathroom } from './Bathroom';
import { AccommodationFeature } from './AccommodationFeature';
import { BathroomType } from './BathroomType';
import { BedroomType } from './BedroomType';

export const resolvers: Resolvers = {
    Query,
    Accommodation,
    AccommodationType,
    City,
    TranslatableString,
    Address,
    Photo,
    Mutation,
    User,
    AuthPayload,
    Site,
    Bedroom,
    BedroomType,
    Bathroom,
    BathroomType,
    AccommodationFeature
};
