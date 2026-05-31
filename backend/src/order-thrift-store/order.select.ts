export const ORDER_SELECT = {
    BASIC: {
        id: true,
        interested: true,
        product: {
            id: true,
            name: true,
            sold: true,
        },
        orderCompleted: true,
    },
    FULL: {
        id: true,
        interested: true,
        phone: true,
        product: {
            id: true,
            name: true,
            description: true,
            photoUrl: true,
            sold: true,
            createdAt: true,
            updatedAt: true,
        },
        price: true,
        orderCompleted: true,
        createdAt: true,
        updatedAt: true,
    }
} as const;