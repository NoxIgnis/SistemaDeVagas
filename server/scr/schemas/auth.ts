import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Insira um email' })
    .email('Email inválido'),
  senha: z.string({ required_error: 'Insira uma senha' }),
});

export const updateSchema = z.object({
  email: z
    .string({ required_error: 'Insira um email' })
    .email('Email inválido'),
  nome: z.string({ required_error: 'Insira um nome' }),
  competencias: z.array(
    z.object({
      id: z.number(),
      nome: z.string(),
    })
  ).optional(),
  experiencia: z.array(
    z.object({
      id: z.number(),
      nome_empresa: z.string(),
      inicio: z.date(), // Você pode usar z.date() se quiser validar como data
      fim: z.date(), // Você pode usar z.date() se quiser validar como data
      cargo: z.string(),
    })
  ).optional(),
  descricao: z.string().optional(),
  ramo: z.string().optional(),
});
