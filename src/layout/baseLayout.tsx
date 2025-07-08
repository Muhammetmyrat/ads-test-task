import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from './base-layout.module.scss'
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'

const BaseLayout: React.FC = () => {
	return (
		<div className={styles['base-layout']}>
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}

export default BaseLayout
