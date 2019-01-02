import { MutationResolvers } from '../generated/graphqlgen';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { APP_SECRET, getUserId, generateCode } from '../utils';

export const Mutation: MutationResolvers.Type = {
    ...MutationResolvers.defaultResolvers,
    signup: async (_, { firstName, lastName, email, password, address, phone }, context) => {
        const hashedPassword = await hash(password, 10);
        const user = await context.prisma.createUser({
            firstName,
            lastName,
            address: { create: address },
            phone,
            email,
            password: hashedPassword
        });
        return {
            token: sign({ userId: user.id }, APP_SECRET),
            user
        };
    },
    login: async (_, { email, password }, context) => {
        const user = await context.prisma.user({ email });
        if (!user) {
            throw new Error(`No user found for email: ${email}`);
        }
        const passwordValid = await compare(password, user.password);
        if (!passwordValid) {
            throw new Error('Invalid password');
        }
        return {
            token: sign({ userId: user.id }, APP_SECRET),
            user
        };
    },
    createAccommodation: (_, { type, city, description, address, keyAddress, photos, code, ...args }, ctx) => {
        const userId = getUserId(ctx);
        return ctx.prisma.createAccommodation({
            type: { create: type },
            city: { create: city },
            description: { create: description },
            address: { create: address },
            keyAddress: { create: keyAddress },
            photos: {},
            code: generateCode(),
            ...args,
            owner: { connect: { id: userId } }
        });
    },
    createBedroom: (_, { accommodationId, bedroom: { name, type, ...rest } }, ctx) => {
        const { id } = type;
        return ctx.prisma
            .updateAccommodation({
                where: { id: accommodationId },
                data: { bedrooms: { create: { name: { create: name }, type: { connect: { id } }, ...rest } } }
            })
            .bedrooms();
    },
    createBathroom: (_, { accommodationId, bathroom: { name, type, ...rest } }, ctx) => {
        const { id } = type;
        return ctx.prisma
            .updateAccommodation({
                where: { id: accommodationId },
                data: { bathrooms: { create: { name: { create: name }, type: { connect: { id } }, ...rest } } }
            })
            .bathrooms();
    },
    updateAccommodation: (
        _,
        {
            accommodationId,
            input: {
                type,
                city,
                description,
                keyAddress,
                address,
                photos,
                sites,
                features,
                bathrooms,
                bedrooms,
                ...rest
            }
        },
        ctx
    ) => {
        return ctx.prisma.updateAccommodation({
            data: {
                city: { update: city },
                description: { update: description },
                address: { update: address },
                keyAddress: { update: keyAddress },
                type: { update: type },
                sites: {},
                features: {},
                bathrooms: {},
                bedrooms: {},
                ...rest
            },
            where: { id: accommodationId }
        });
    }
};
