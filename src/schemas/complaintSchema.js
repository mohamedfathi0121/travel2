// src/schemas/complaintSchema.js
import { z } from "zod";

export const complaintSchema = z.object({
  selectedEmail: z
    .string()
    .min(1, "Please select a company.")
    .email("Invalid company email."),
  complaintType: z.enum(["Technical", "Billing", "Service"], {
    required_error: "Please select a complaint type.",
  }),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters.")
    .max(100, "Subject must be less than 100 characters."),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters.")
    .max(500, "Message must be less than 500 characters."),
});
