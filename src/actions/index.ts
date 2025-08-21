import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
  send: defineAction({
    accept: 'form',

    input: z.object({
      completeName: z.string(),
      gmail: z.string().email(),
      description: z.string(),
    }),

    handler: async ({ completeName, gmail, description }) => {
      const { data, error } = await resend.emails.send({
        from: 'SCL <contacto@sclogisticservices.org>',
        replyTo: gmail,
        to: ['sclogisticservices@gmail.com'],
        subject: 'Correo de prueba',
        html: `${completeName} <strong>Funciona!!</strong>`,
        text: `${description}`
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
