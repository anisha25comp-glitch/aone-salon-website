import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { createAppointment, getAppointments, getPublicAppointmentCount, getPublicAppointments, markAppointmentWhatsappSent } from "./db";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  appointments: router({
    create: publicProcedure
      .input(z.object({
        service: z.string().trim().min(1).max(255),
        appointmentDate: z.string().regex(/^\\d{4}-\\d{2}-\\d{2}$/),
        timeSlot: z.string().trim().min(1).max(32),
        provider: z.string().trim().min(1).max(120),
        customerName: z.string().trim().min(2).max(160),
        customerPhone: z.string().regex(/^\\d{10}$/),
      }))
      .mutation(async ({ input }) => {
        const appointment = await createAppointment({
          ...input,
          appointmentDate: new Date(`${input.appointmentDate}T00:00:00.000Z`),
          status: "requested",
        });
        return { success: true as const, appointmentId: appointment.id };
      }),
    markWhatsappSent: publicProcedure
      .input(z.object({ id: z.number().int().positive() }))
      .mutation(async ({ input }) => {
        await markAppointmentWhatsappSent(input.id);
        return { success: true as const };
      }),
    publicSummary: publicProcedure.query(() => getPublicAppointments()),
    publicCount: publicProcedure.query(() => getPublicAppointmentCount()),
    list: adminProcedure.query(() => getAppointments()),
  }),
});

export type AppRouter = typeof appRouter;
