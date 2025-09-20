import { useCallback } from 'react';
import { List } from 'react-window';
import { useInfiniteLoader } from 'react-window-infinite-loader';
import { ArticleRow } from '../components/ArticleRow/ArticleRow';
import { useArticles } from '../hooks/useArticles';
import styles from './ArticlesPage.module.scss';
/**
 * Virtualized article list with infinite scroll using react-window and react-window-infinite-loader
 * Only renders visible items for performance with large datasets
 */
export const ArticlesPage: React.FC = () => {
  const { articles, loading, hasMore, error, total, loadMore, refresh } =
    useArticles();

  const isRowLoaded = useCallback(
    (index: number) => articles[index] !== undefined,
    [articles]
  );

  /**
   * Loads more rows for virtualized list - integrates with useArticles hook
   * Called by react-window-infinite-loader when scrolling near the end
   */
  const loadMoreRows = useCallback(async () => {
    if (loading || !hasMore) return;

    loadMore();
  }, [loading, hasMore, loadMore]);

  // react-window-infinite-loader configuration for automatic loading
  const onRowsRendered = useInfiniteLoader({
    isRowLoaded,
    loadMoreRows,
    rowCount: total, // Estimated count for infinite scroll
  });

  if (error) {
    return (
      <div className={styles['article-list__error']}>
        <p>{error}</p>
        <button onClick={refresh}>Intentar nuevamente</button>
      </div>
    );
  }

  return (
    <div className={styles['article-list']}>
      <div className={styles['article-list__header']}>
        <h2>Artículos</h2>
        <span className={styles['article-list__count']}>{total} artículos</span>
      </div>

      {/* react-window List component with infinite loading */}
      <div className={styles['article-list__virtualized-container']}>
        <List
          className={styles['article-list__virtual-list']}
          onRowsRendered={onRowsRendered}
          rowComponent={ArticleRow}
          rowCount={total}
          rowHeight={200}
          rowProps={{ articles }}
        />
      </div>

      {!hasMore && articles.length > 0 && (
        <div className={styles['article-list__end-message']}>
          Todos los artículos se han cargado
        </div>
      )}
    </div>
  );
};
