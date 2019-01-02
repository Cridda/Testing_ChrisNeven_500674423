import { PhotoResolvers } from '../generated/graphqlgen';

export const Photo: PhotoResolvers.Type = {
    ...PhotoResolvers.defaultResolvers,

    name: ({ id }, args, ctx) => {
        return ctx.prisma.photo({ id }).name();
    }
};
