import { DBResponse, ResponseDataType } from "../types/res.types.js";

// functions for reusable code
export function createErrorResponse(code: number, message: string): DBResponse {
  return {
    status: code,
    data: {
      error: message,
    },
  };
}

export function createSuccessResponse(data: ResponseDataType): DBResponse {
  return {
    status: 200,
    data,
  };
}
