export const ANIMAL_SELECT = {
    BASIC: {
        id: true,
        name: true,
        photoUrl: true,
        breed: {
            id: true,
            name: true,
        },
    },

    FULL: {
        id: true,
        name: true,
        breed: {
            id: true,
            name: true,
        },
        description: true,
        photoUrl: true,
        createdAt: true,
        updatedAt: true,
    }
} as const;