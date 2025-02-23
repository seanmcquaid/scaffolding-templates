import { z } from 'zod';
import getValidatedFormData from '@/utils/getValidatedFormData';

describe('getValidatedFormData', () => {
  describe('Zod Refine + Super Refine', () => {
    describe('refine', () => {
      it('returns an object with errors and defaultValues from the raw formData when the form data is invalid', () => {
        const formData = new FormData();

        formData.append('name', 'Hello there John Doe');

        const result = getValidatedFormData({
          schema: z
            .object({ name: z.string().min(10) })
            .refine(data => data.name === 'Hello John Doe', {
              message: 'Name must be Hello John Doe',
              path: ['name'],
            }),
          formData,
        });

        expect(result).toEqual({
          errors: { name: 'Name must be Hello John Doe' },
          defaultValues: { name: 'Hello there John Doe' },
        });
      });
      it('returns an object with data and defaultValues from the validated formData when the form data is valid', () => {
        const formData = new FormData();

        formData.append('name', 'John Doe');

        const result = getValidatedFormData({
          schema: z
            .object({ name: z.string() })
            .refine(data => data.name === 'John Doe', {
              message: 'Name must be John Doe',
            }),
          formData,
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
          formData,
        });

        expect(result).toEqual({
          errors: { name: 'Name must be Hello John Doe' },
          defaultValues: { name: 'Hello John' },
        });
      });
      it('returns an object with data and defaultValues from the validated formData when the form data is valid', () => {
        const formData = new FormData();

        formData.append('name', 'John Doe');

        const result = getValidatedFormData({
          schema: z.object({ name: z.string() }).superRefine((data, ctx) => {
            if (data.name !== 'John Doe') {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Name must be John Doe',
              });
            }
          }),
          formData,
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
        schema: z.object({ name: z.string().min(10) }),
        formData,
      });

      expect(result).toEqual({
        errors: { name: 'String must contain at least 10 character(s)' },
        defaultValues: { name: 'John Doe' },
      });
    });
    it('returns an object with data and defaultValues from the validated formData when the form data is valid', () => {
      const formData = new FormData();

      formData.append('name', 'John Doe');

      const result = getValidatedFormData({
        schema: z.object({ name: z.string() }),
        formData,
      });

      expect(result).toEqual({
        data: { name: 'John Doe' },
        defaultValues: { name: 'John Doe' },
      });
    });
  });
});
