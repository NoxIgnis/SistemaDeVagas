export type RequestDB = {
  requisicao_id?: string;
  endpoint: string;
  usuario_id: number;
  documento: string;
  retorno: JSON | null;
};

export type User = {
  usuario_id: number;
  nome: string;
  email: string;
  senha: string;
  status: boolean;
  data_adicionado: Date;
};
