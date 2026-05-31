import { title } from "process";

export const ARTICLE_SELECT = {
    BASIC: {
        id: true,
        author: true,
        title: true,
    },
    FULL: {
        id: true,
        author: true,
        title: true,
        subtitle: true,
        content: true,
        createdAt: true,
        updatedAt: true,
    }
} as const;