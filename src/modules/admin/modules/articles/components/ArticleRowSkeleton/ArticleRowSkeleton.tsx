import styles from './ArticleRowSkeleton.module.scss';

export const ArticleRowSkeleton: React.FC<{
  style: React.CSSProperties;
}> = ({ style }) => (
  <div style={style} className={styles['loading-item']}>
    <div className={styles['loading-item__skeleton']}>
      <div className={styles['loading-item__skeleton-image']}></div>
      <div className={styles['loading-item__skeleton-content']}>
        <div className={styles['loading-item__skeleton-title']}></div>
        <div className={styles['loading-item__skeleton-text']}></div>
        <div className={styles['loading-item__skeleton-tags']}></div>
      </div>
    </div>
  </div>
);
