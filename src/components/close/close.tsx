import React from 'react'
import Icon from '@/components/base/icon'
import styles from './close.module.scss'

const Close: React.FC = () => {
	return (
		<button className={styles.close} aria-label="Close menu">
			<Icon name="close" />
		</button>
	)
}

export default Close
