import React from 'react'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import styles from './nav.module.scss'
import { useNav } from '@/context/NavContext'
import { useToggle } from '@/context/ToggleContext'

const Nav: React.FC = () => {
	const { navItems } = useNav()
	const { isOpen, handleToggle, handleClose } = useToggle()
	const navOpen = isOpen('nav')

	return (
		<nav className={styles.nav}>
			<button
				className={classNames(styles.nav__burger, {
					[styles['nav__burger--open']]: navOpen
				})}
				aria-label="Toggle navigation menu"
				onClick={() => handleToggle('nav')}
			>
				<span></span>
			</button>

			<div
				className={classNames(styles.nav__menu, {
					[styles['nav__menu--open']]: navOpen
				})}
			>
				<ul className={styles.nav__list}>
					{navItems.map(({ name, to }) => (
						<li key={to} className={styles.nav__item}>
							<NavLink
								to={to}
								onClick={() => navOpen && handleClose('nav')}
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
