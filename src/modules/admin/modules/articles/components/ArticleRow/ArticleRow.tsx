import { type RowComponentProps } from 'react-window';
import type { Article } from '../../interfaces/article';
import { ArticleRowSkeleton } from '../ArticleRowSkeleton/ArticleRowSkeleton';
import styles from './ArticleRow.module.scss';

export const ArticleRow = ({
  index,
  articles,
  style,
}: RowComponentProps<{
  articles: (Article | undefined)[];
}>) => {
  const article = articles[index];

  if (!article) {
    return <ArticleRowSkeleton style={style} />;
  }

  return (
    <div style={style} className={styles['article-item']}>
      <div className={styles['article-item__card']}>
        <div className={styles['article-item__image']}>
          <img src={article.image} alt={article.title} />
        </div>
        <div className={styles['article-item__content']}>
          <h3 className={styles['article-item__title']}>{article.title}</h3>
          <p className={styles['article-item__summary']}>{article.summary}</p>
          <div className={styles['article-item__tags']}>
            {article.tags.map((tag, tagIndex) => (
              <span key={tagIndex} className={styles['article-item__tag']}>
                #{tag}
              </span>
            ))}
          </div>
          <div className={styles['article-item__footer']}>
            <div className={styles['article-item__author-info']}>
              <span className={styles['article-item__author']}>
                Por {article.author}
              </span>
              <span className={styles['article-item__publish-date']}>
                {new Date(article.publishedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
