export type servicesResponseType<T> = {
  statusCode?: number;
  data?: T;
  error?: string[];
};
