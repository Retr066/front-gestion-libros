// Interface para respuestas de error
export interface ErrorResponse {
    status: number;        // Código de estado HTTP, por ejemplo, 400, 404, 500
    statusText: string;    // Texto representando el error, por ejemplo, 'INTERNAL_ERROR'
    message: string;       // Mensaje de error descriptivo
    errorDetails?: string; // Detalles adicionales sobre el error, si los hay
  }
