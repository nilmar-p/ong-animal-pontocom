export const DONATION_SELECT = {
    BASIC: {
        id: true,
        name: true,
        phone: true,
        amount: true,
        method: true,
    },

    FULL: {
        id: true,
        name: true,
        phone: true,
        email: true,
        amount: true,
        message: true,
        method: true,
        createdAt: true,
        updatedAt: true,
    },
} as const;