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
    nome: z.string().optional(),
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

export const vagaSchema = z.object({
  ramo_id: z.number(),
  titulo: z.string(),
  descricao: z.string(),
  competencias: z.union([competencias, z.string()]),
  experiencia: z.number(),
  salario_min: z.number(),
  salario_max: z.number(),
  ativo: z.boolean(),
});

export const buscarSchema = z.object({
  nome: z.string().optional(),
  descricao: z.string().optional(),
  competencias: competencias.optional(),
  experiencia: z.number().optional(),
  tipo: z.boolean().optional(),
});

export const mensagemSchema = z.object({
  candidatos: z.array(z.string()),
  mensagem: z.string().optional(),
  empresa: z.string().optional(),
});