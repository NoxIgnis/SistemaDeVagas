import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Insira um email' })
    .email('Email inválido'),
  senha: z.string({ required_error: 'Insira uma senha' }),
});

const experiencia = z.array(
  z.object({
    id: z.number(),
    nome_empresa: z.string(),
    inicio: z.string(), // Você pode usar z.date() se quiser validar como data
    fim: z.string(), // Você pode usar z.date() se quiser validar como data
    cargo: z.string(),
  })
).optional()
const competencias = z.array(
  z.object({
    id: z.number(),
    nome: z.string(),
  })
).optional()

export const bodySchema = z.object({
  email: z
    .string({ required_error: 'Insira um email' })
    .email('Email inválido'),
  nome: z.string({ required_error: 'Insira um nome' }),
  senha: z.string().optional(),
  competencias: z.union([competencias, z.string()]),
  experiencia: z.union([experiencia, z.string()]),
  descricao: z.string().optional(),
  ramo: z.string().optional(),
  tipo: z.boolean().optional(),
});
