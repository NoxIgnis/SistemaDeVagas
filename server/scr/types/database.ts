export type RequestDB = {
  requisicao_id?: string;
  endpoint: string;
  usuario_id: number;
  documento: string;
  retorno: JSON | null;
};

export type User = {
  id: number;
  nome: string;
  email: string;
  senha: string;
  competencias: string;
  experiencias: string;
};

export type comp = {
  id: number;
  nome: string;
}[];

export type empresa = {
  id: number;
  nome: string;
  email: string;
  descricao?: string;
  ramo?: string;
}