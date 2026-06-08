import { ApiErrorResponse, ApiSuccessResponse } from './api-response.type.js';

export function successResponse<T>(
  message: string,
  data?: T,
): ApiSuccessResponse<T> {
  return {
    success: true,
    message,
    ...(data !== undefined ? { data } : {}),
  };
}

export function errorResponse(
  message: string,
  error?: unknown,
): ApiErrorResponse {
  return {
    success: false,
    message,
    ...(error !== undefined ? { error } : {}),
  };
}
