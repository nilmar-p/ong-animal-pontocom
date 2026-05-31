export const REPORT_SELECT = {
    BASIC: {
        id: true,
        phone: true,
        subject: true,
        solved: true,
    },
    FULL: {
        id: true,
        phone: true,
        address: true,
        subject: true,
        description: true,
        solved: true,
        createdAt: true,
        updatedAt: true,
    }
} as const;