import { z } from 'zod';

export const enquirySchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters.' })
    .max(100, { message: 'Full name is too long.' }),
  companyName: z
    .string()
    .max(120, { message: 'Company name is too long.' })
    .optional()
    .or(z.literal('')),
  businessEmail: z
    .string()
    .email({ message: 'Please provide a valid business email address.' }),
  phoneNumber: z
    .string()
    .max(30, { message: 'Phone number is too long.' })
    .optional()
    .or(z.literal('')),
  serviceRequired: z
    .string()
    .min(1, { message: 'Please select the service required for your project.' }),
  projectDescription: z
    .string()
    .min(20, { message: 'Please tell us more about your project challenge (minimum 20 characters).' })
    .max(3000, { message: 'Description exceeds maximum allowed characters.' }),
  budgetRange: z
    .string()
    .min(1, { message: 'Please select an approximate budget range.' }),
  expectedTimeline: z
    .string()
    .min(1, { message: 'Please specify your expected timeline.' }),
  referralSource: z
    .string()
    .max(100)
    .optional()
    .or(z.literal('')),
  privacyConsent: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must consent to the privacy policy to submit an enquiry.'
    }),
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;
