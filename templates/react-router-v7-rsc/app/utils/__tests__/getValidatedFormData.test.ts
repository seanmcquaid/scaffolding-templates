import { z } from 'zod';
import getValidatedFormData from '@/utils/getValidatedFormData';

describe('getValidatedFormData', () => {
  describe('Zod Refine + Super Refine', () => {
    describe('refine', () => {
      it('returns an object with errors and defaultValues from the raw formData when the form data is invalid', () => {
        const formData = new FormData();

        formData.append('name', 'Hello there John Doe');

        const result = getValidatedFormData({
          formData,
          schema: z
            .object({ name: z.string().min(10) })
            .refine(data => data.name === 'Hello John Doe', {
              message: 'Name must be Hello John Doe',
              path: ['name'],
            }),
        });

        expect(result).toEqual({
          defaultValues: { name: 'Hello there John Doe' },
          errors: { name: 'Name must be Hello John Doe' },
        });
      });
      it('returns an object with data and defaultValues from the validated formData when the form data is valid', () => {
        const formData = new FormData();

        formData.append('name', 'John Doe');

        const result = getValidatedFormData({
          formData,
          schema: z
            .object({ name: z.string() })
            .refine(data => data.name === 'John Doe', {
              message: 'Name must be John Doe',
            }),
        });

        expect(result).toEqual({
          data: { name: 'John Doe' },
          defaultValues: { name: 'John Doe' },
        });
      });
    });
    describe('superRefine', () => {
      it('returns an object with errors and defaultValues from the raw formData when the form data is invalid', () => {
        const formData = new FormData();

        formData.append('name', 'Hello John');

        const result = getValidatedFormData({
          formData,
          schema: z
            .object({ name: z.string().min(10) })
            .superRefine((data, ctx) => {
              if (data.name !== 'Hello John Doe') {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: 'Name must be Hello John Doe',
                  path: ['name'],
                });
              }
            }),
        });

        expect(result).toEqual({
          defaultValues: { name: 'Hello John' },
          errors: { name: 'Name must be Hello John Doe' },
        });
      });
      it('returns an object with data and defaultValues from the validated formData when the form data is valid', () => {
        const formData = new FormData();

        formData.append('name', 'John Doe');

        const result = getValidatedFormData({
          formData,
          schema: z.object({ name: z.string() }).superRefine((data, ctx) => {
            if (data.name !== 'John Doe') {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Name must be John Doe',
              });
            }
          }),
        });

        expect(result).toEqual({
          data: { name: 'John Doe' },
          defaultValues: { name: 'John Doe' },
        });
      });
    });
  });
  describe('Zod Schemas', () => {
    it('returns an object with errors and defaultValues from the raw formData when the form data is invalid', () => {
      const formData = new FormData();

      formData.append('name', 'John Doe');

      const result = getValidatedFormData({
        formData,
        schema: z.object({ name: z.string().min(10) }),
      });

      expect(result).toEqual({
        defaultValues: { name: 'John Doe' },
        errors: { name: 'String must contain at least 10 character(s)' },
      });
    });
    it('returns an object with data and defaultValues from the validated formData when the form data is valid', () => {
      const formData = new FormData();

      formData.append('name', 'John Doe');

      const result = getValidatedFormData({
        formData,
        schema: z.object({ name: z.string() }),
      });

      expect(result).toEqual({
        data: { name: 'John Doe' },
        defaultValues: { name: 'John Doe' },
      });
    });
  });
});
