import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title must not exceed 100 characters"),
  body: z.string().min(10, "Post content must be at least 10 characters long"),
  author: z
    .string()
    .min(2, "Author name must be at least 2 characters long")
    .max(50, "Author name must not exceed 50 characters"),
  tags: z.array(z.string().min(1).max(30)).max(10, "Maximum of 10 tags"),
});

export const commentSchema = z.object({
  author: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must not exceed 50 characters"),
  text: z
    .string()
    .min(3, "Comment must be at least 3 characters long")
    .max(500, "Comment must not exceed 500 characters"),
});

export type PostFormValues = z.infer<typeof postSchema>;
export type CommentSchemaInput = z.infer<typeof commentSchema>;
export type PostSchemaInput = PostFormValues;
export type PostSchemaOutput = PostFormValues;
