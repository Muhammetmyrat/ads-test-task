import React from 'react'
import styles from './loader.module.scss'

const Loader: React.FC = () => {
	return (
		<div className={styles['loader-wrapper']}>
			<span className={styles['loader']}></span>
		</div>
	)
}

export default Loader
