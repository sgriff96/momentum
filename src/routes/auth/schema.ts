import { z } from 'zod';

export const formSchema = z.object({
	email: z.string().email('Please enter a valid email'),
	password: z.string().min(8).max(32),
});

export type FormSchema = typeof formSchema;
