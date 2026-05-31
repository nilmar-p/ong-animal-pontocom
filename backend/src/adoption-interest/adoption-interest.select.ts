export const ADOPTION_SELECT = {
    BASIC: {
        id: true,
        interested: true,
        phone: true,
        animal: {
            name: true,
            breed: {
                id: true,
                name: true,
            }
        },
        adopted: true,
    },

    FULL: {
        id: true,
        interested: true,
        phone: true,
        email: true,
        animal: {
            id: true,
            name: true,
            breed: {
                id: true,
                name: true,
            },
            description: true,
            photoUrl: true,
        },
        adopted: true,
        createdAt: true,
        updatedAt: true,
    }
} as const;