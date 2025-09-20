import { httpClient } from '@/core/api/http-client';
import type { PaginationResponse } from '../../../../../core/interfaces/pagination-response';
import type { Article } from '../interfaces/article';

export const articlesService = {
  getByPage: async (
    page: number,
    limit = 50
  ): Promise<PaginationResponse<Article>> => {
    const response = await httpClient.get(
      `/articles?page=${page}&limit=${limit}`
    );
    return response.data;
  },
};
