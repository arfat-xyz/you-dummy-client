import { z } from "zod";
import { booleanValidation, stringValidation } from "./const-validation";

// Define form schema using zod
export const lessionZodValidation = z.object({
  title: stringValidation("Title").min(
    3,
    "Title must be at least 3 characters"
  ),
  content: stringValidation("Content").min(
    10,
    "Content must be at least 10 characters"
  ),
  video: stringValidation("View").url(
    "Must be a valid video URL (e.g., https://example.com/video.mp4)"
  ),
  free_preview: booleanValidation("Free preview"),
});

export type CreateLessionFormData = z.infer<typeof lessionZodValidation>;
