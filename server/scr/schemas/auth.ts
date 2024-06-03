import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Insira um email' })
    .email('Email inválido'),
    senha: z.string({ required_error: 'Insira uma senha' }),
});

// export const putSchema = z.object({
//   email: z
//     .string({ required_error: 'Insira um email' })
//     .email('Email inválido'),
//   nome: z.string({ required_error: 'Insira um nome' }),
//   competencias: z.nullable(z.array(z.object({
//     id: z
//     .number(),
//     nome: z
//     .string(),    
//   }))),
//   experiencia: z.nullable(z.array(z.object({
//     id: z.number(),
//     nome_empresa: z
//     .string(),
//     inicio: z
//     .string(),
//     fim: z
//     .string(),
//     cargo: z
//     .string(),
//   }))),
//   ramo: z.nullable(z.string()),
//   });
