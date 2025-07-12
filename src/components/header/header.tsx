import React, { useEffect, useState, useRef } from 'react'
import classNames from 'classnames'
import Logo from '@/components/logo/logo'
import Nav from '../nav/nav'
import styles from './header.module.scss'

const Header: React.FC = () => {
	const [isSticky, setIsSticky] = useState(false)
	const headerHeight = 90

	useEffect(() => {
		const root = document.getElementById('root')
		if (!root) return

		const handleScroll = () => {
			const scrollTop = root.scrollTop

			if (scrollTop > headerHeight) {
				setIsSticky(true)
			} else if (scrollTop === 0) {
				setIsSticky(false)
			}
		}

		root.addEventListener('scroll', handleScroll)
		return () => {
			root.removeEventListener('scroll', handleScroll)
		}
	}, [])

	const spacerHeight = isSticky ? headerHeight : 0

	return (
		<header className={styles.header}>
			<div className={styles.header__spacer} style={{ height: `${spacerHeight}px` }} />
			<div
				className={classNames(styles.header__wrapper, {
					[styles['header__wrapper--sticky']]: isSticky
				})}
			>
				<div className={classNames(styles.header__body, '__container')}>
					<Logo />
					<Nav />
				</div>
			</div>
		</header>
	)
}

export default Header
