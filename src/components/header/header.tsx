import React, { useEffect, useState, useRef } from 'react'
import classNames from 'classnames'
import Logo from '@/components/logo/logo'
import Nav from '../nav/nav'
import styles from './header.module.scss'

const Header: React.FC = () => {
	const [isSticky, setIsSticky] = useState(false)
	const headerHeight = 90
	const spacerRef = useRef<HTMLDivElement>(null)

	const handleScroll = () => {
		const scrollY = window.scrollY || window.pageYOffset
		const threshold = headerHeight
		console.log(threshold)

		if (scrollY > threshold) {
			setIsSticky(true)
		} else if (scrollY === 0) {
			setIsSticky(false)
		}
	}

	const throttledScroll = () => {
		requestAnimationFrame(handleScroll)
	}

	useEffect(() => {
		window.addEventListener('scroll', throttledScroll)
		return () => window.removeEventListener('scroll', throttledScroll)
	}, [])

	const spacerHeight = isSticky ? headerHeight : 0

	return (
		<header className={styles.header}>
			<div ref={spacerRef} className={styles.header__spacer} style={{ height: `${spacerHeight}px` }} />
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
