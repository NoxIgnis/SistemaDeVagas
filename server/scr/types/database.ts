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
  competencias?: string;
  experiencias?: string;
};

export type comp = {
  id: number;
  nome: string;
}[];

export type empresa = {
  id: number;
  nome: string;
  email: string;
  senha: string;
  descricao?: string;
  ramo?: string;
}

export type vaga = {
  id: number;
  ramo_id: number;
  titulo: string;
  descricao: string;
  competencias: [
    {
      id:number;
      nome:string;
    }
  ];
  experiencia: number;
  salario_min: number;
  salario_max: number;
  ativo: boolean;
  empresa_email?: string;
}

export type Allvagas = {
  id: number;
  ramo_id: number;
  titulo: string;
  descricao: string;
  competencias: [
    {
      id:number;
      nome:string;
    }
  ];
  experiencia: number;
  salario_min: number;
  salario_max: number;
  ativo: boolean;
  empresa_email: string;
}[]