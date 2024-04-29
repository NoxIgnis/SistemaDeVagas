  export interface user {
    nome: string; 
    email:string;
    tipo: string;
    descricao?: string;
    competencias?: {
        id: number;
        nome: string;
    }[];
    experiencia?: {
        id: number;
        nome_empresa: string;
        inicio: string;
        fim: string;
        cargo: string;
    }[];
    ramo?: string;
 }

 export interface mensagem {
  mensagem?:string ;
 }
 
//  export interface comp {
//     id:number;
//     nome: string
//   }[];
 