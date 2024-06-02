import { z } from 'zod';

export const habitFormSchema = z.object({
	habitName: z.string().min(2).max(50),
	habitDescription: z.string().optional(),
});

export type HabitFormSchema = typeof habitFormSchema;
