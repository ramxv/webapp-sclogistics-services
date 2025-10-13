import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

// Simple in-memory rate limiting (5 minutes)
const submissionTracker = new Map<string, number>();
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes

export const server = {
  send: defineAction({
    accept: 'form',

    input: z.object({
      completeName: z.string().min(1, "El nombre es requerido"),
      gmail: z.string().email("Correo electrónico inválido").min(1, "El correo es requerido"),
      subjectDescription: z.string().min(1, "El asunto es requerido"),
      description: z.string().min(1, "El mensaje es requerido"),
    }),

    handler: async ({ completeName, gmail, subjectDescription, description }, context) => {
      // Rate limiting by email
      const now = Date.now();
      const lastSubmission = submissionTracker.get(gmail);

      if (lastSubmission && (now - lastSubmission) < RATE_LIMIT_WINDOW) {
        throw new ActionError({
          code: 'TOO_MANY_REQUESTS',
          message: 'Por favor espera unos minutos antes de enviar otro mensaje.',
        });
      }

      submissionTracker.set(gmail, now);

      // Clean up old entries
      for (const [email, timestamp] of submissionTracker.entries()) {
        if (now - timestamp > RATE_LIMIT_WINDOW) {
          submissionTracker.delete(email);
        }
      }
      console.log(completeName, gmail, subjectDescription, description);
      const { data, error } = await resend.emails.send({
        from: 'SCL <contacto@sclogisticservices.org>',
        replyTo: gmail,
        to: ['soporte@sclogisticservices.org'],
        subject: subjectDescription,
        html: `<strong>${completeName}</strong> <br> <p>${description}</p>`,
      });

      if (error) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: error.message,
        });
      }

      return data;
    },
  }),
};
