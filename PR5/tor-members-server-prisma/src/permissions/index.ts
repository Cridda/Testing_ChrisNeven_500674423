import { rule, shield } from 'graphql-shield';
import { getUserId } from '../utils';

const rules = {
    isAuthenticatedUser: rule()((parent, { id }, context) => {
        const userId = getUserId(context);

        return Boolean(userId);
    })
    // isAccommodationOwner: rule()(async (parent, { userId }, context) => {
    //     const userIdd = getUserId(context);
    //     const owner = await context.prisma
    //         .user({
    //             userId
    //         })
    //         .owner();
    //     console.log(owner);
    //     return userId === owner.id;
    // })
};

export const permissions = shield({
    Query: {
        me: rules.isAuthenticatedUser,
        accommodations: rules.isAuthenticatedUser,
        users: rules.isAuthenticatedUser
    },
    Mutation: {
        createAccommodation: rules.isAuthenticatedUser
    }
});
