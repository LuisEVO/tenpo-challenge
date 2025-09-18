import { httpClient } from '../../../core/api/http-client';
import type { LoginDto } from '../interfaces/login-dto';
import type { LoginResponse } from '../interfaces/login-response';

export const authService = {
  login: async (dto: LoginDto): Promise<LoginResponse> => {
    const response = await httpClient.post<LoginResponse>('/auth/login', dto);
    return response.data;
  },
};
