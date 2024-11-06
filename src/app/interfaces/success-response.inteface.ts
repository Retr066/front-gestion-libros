export interface SuccessResponse<T> {
    status: number;        // Código de estado HTTP, por ejemplo, 400, 404, 500
    statusText: string;    // Texto representando el error, por ejemplo, 'INTERNAL_ERROR
    data: T;            // Los datos específicos de la respuesta
    message: string;    // Mensaje informativo sobre la operación
  }
  