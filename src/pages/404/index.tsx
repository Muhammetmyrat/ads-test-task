import React from 'react'
import { Link } from 'react-router-dom'
import styles from './page404.module.scss'

const Page404: React.FC = () => {
  return (
    <div className={styles.page404}>
      <div className={styles.page404__code}>404</div>
      <div className={styles.page404__message}>Страница не найдена</div>
      <div className={styles.page404__description}>
        Извините, страница, которую вы ищете, не существует.
      </div>
      <Link to="/" className={styles.page404__link}>
        На главную
      </Link>
    </div>
  )
}

export default Page404
