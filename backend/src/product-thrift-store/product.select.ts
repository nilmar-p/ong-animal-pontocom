export const PRODUCT_SELECT = {
    BASIC: {
        id: true,
        name: true,
        price: true,
        photoUrl: true,
        sold: true,
    },
    FULL: {
        id: true,
        name: true,
        description: true,
        price: true,
        photoUrl: true,
        sold: true,
        createdAt: true,
        updatedAt: true,
    }
} as const;