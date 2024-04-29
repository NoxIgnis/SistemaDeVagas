export type servicesResponseType<T> = {
  statusCode?: number;
  data?: T;
  token?:string;
  error?: string[];
  mensagem?: string;
  response?: any;
};
