import * as z from 'zod';

export const threadValidation = z.object({
    thread : z.string().min(3,"minimum 3 characters needed"),
    accountId : z.string(),
})