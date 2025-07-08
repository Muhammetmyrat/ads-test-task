import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import Close from '../close/close'
import styles from './nav.module.scss'
import { useNav } from '@/context/NavContext'

const Nav: React.FC = () => {
	const { navItems } = useNav()

	const [isOpen, setIsOpen] = useState(false)

	const toggleMenu = () => setIsOpen(prev => !prev)
	const closeMenu = () => setIsOpen(false)

	return (
		<nav className={styles.nav}>
			<button
				className={classNames(styles.nav__burger, {
					[styles['nav__burger--open']]: isOpen
				})}
				aria-label="Toggle navigation menu"
				onClick={toggleMenu}
			>
				<span />
			</button>

			<div
				className={classNames(styles.nav__menu, {
					[styles['nav__menu--open']]: isOpen
				})}
			>
				<div className={styles.nav__close} onClick={closeMenu}>
					<Close />
				</div>

				<ul className={styles.nav__list}>
					{navItems.map(({ name, to }) => (
						<li key={to} className={styles.nav__item}>
							<NavLink
								to={to}
								onClick={closeMenu}
								className={({ isActive }) =>
									classNames(styles.nav__link, {
										[styles['nav__link--active']]: isActive
									})
								}
							>
								{name}
							</NavLink>
						</li>
					))}
				</ul>
			</div>
		</nav>
	)
}

export default Nav
