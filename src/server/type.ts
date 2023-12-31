import type { inferRouterOutputs } from "@trpc/server";
import { z } from "zod";
import type { AppRouter } from "./api/root";

type RouterOutput = inferRouterOutputs<AppRouter>;
type allTodosOutput = RouterOutput["todo"]["all"];
export type Todo = allTodosOutput[number];

export const createInput = z
  .string()
  .min(1, "todo must be at least 1 letter")
  .max(50, "todo must be 50 letters ore less");

export const updateInput = z.object({
  id: z.string(),
  text: z
    .string()
    .min(1, "todo must be at least 1 letter")
    .max(50, "todo must be 50 letters or less"),
});

export const toggleInput = z.object({
  id: z.string(),
  is_completed: z.boolean(),
});
