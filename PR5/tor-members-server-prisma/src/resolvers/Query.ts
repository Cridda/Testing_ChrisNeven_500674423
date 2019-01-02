import { QueryResolvers } from '../generated/graphqlgen';
import { getUserId } from '../utils';

export const Query: QueryResolvers.Type = {
    ...QueryResolvers.defaultResolvers,
    me: (parent, args, ctx) => {
        const userId = getUserId(ctx);
        return ctx.prisma.user({ id: userId });
    },
    accommodations: (parent, args, ctx) => {
        const userId = getUserId(ctx);
        return ctx.prisma.user({ id: userId }).accommodations();
    },
    accommodation: (parent, { id: accommodationid }, ctx) => {
        return ctx.prisma.accommodation({ id: accommodationid });
    },
    users: (parent, args, ctx) => {
        return ctx.prisma.users();
    },
    sites: (_, __, ctx) => {
        return ctx.prisma.sites();
    },
    features: (_, __, ctx) => {
        return ctx.prisma.accommodationFeatures();
    },
    bedroomTypes: (_, __, ctx) => {
        return ctx.prisma.bedroomTypes();
    },
    bathroomTypes: (_, __, ctx) => {
        return ctx.prisma.bathroomTypes();
    }
};
