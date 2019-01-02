import { AccommodationResolvers } from '../generated/graphqlgen';

export const Accommodation: AccommodationResolvers.Type = {
    ...AccommodationResolvers.defaultResolvers,

    type: ({ id }, args, ctx) => {
        return ctx.prisma.accommodation({ id }).type();
    },
    city: ({ id }, args, ctx) => {
        return ctx.prisma.accommodation({ id }).city();
    },
    description: ({ id }, args, ctx) => {
        return ctx.prisma.accommodation({ id }).description();
    },
    keyAddress: ({ id }, args, ctx) => {
        return ctx.prisma.accommodation({ id }).keyAddress();
    },
    address: ({ id }, args, ctx) => {
        return ctx.prisma.accommodation({ id }).address();
    },
    photos: ({ id }, args, ctx) => {
        return ctx.prisma.accommodation({ id }).photos();
    },
    sites: ({ id }, args, ctx) => {
        return ctx.prisma.accommodation({ id }).sites();
    },
    bedrooms: ({ id }, args, ctx) => {
        return ctx.prisma.accommodation({ id }).bedrooms();
    },
    bathrooms: ({ id }, args, ctx) => {
        return ctx.prisma.accommodation({ id }).bathrooms();
    },
    features: ({ id }, args, ctx) => {
        return ctx.prisma.accommodation({ id }).features();
    }
};
