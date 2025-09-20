import { useCallback, useEffect, useState } from 'react';
import type { Article } from '../interfaces/article';
import { articlesService } from '../services/articles-service';

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const loadArticles = useCallback(async (pageNum: number) => {
    try {
      setLoading(true);
      setError(null);

      const response = await articlesService.getByPage(pageNum);

      if (pageNum === 1) {
        setArticles(response.data);
      } else {
        setArticles((prev) => [...prev, ...response.data]);
      }

      setTotal(response.pagination.total);
      setHasMore(response.pagination.hasNextPage);
      setPage(pageNum);
    } catch (err) {
      setError('Error al cargar artículos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadArticles(page + 1);
    }
  }, [loading, hasMore, page, loadArticles]);

  const refresh = useCallback(() => {
    setArticles([]);
    setLoading(false);
    setHasMore(true);
    setPage(1);
    setError(null);
    setTotal(0);
    loadArticles(1);
  }, [loadArticles]);

  useEffect(() => {
    loadArticles(1);
  }, [loadArticles]);

  return {
    articles,
    loading,
    hasMore,
    error,
    total,
    loadMore,
    refresh,
  };
};
