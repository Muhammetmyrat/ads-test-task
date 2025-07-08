import React from 'react'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import { useNav } from '@/context/NavContext'
import styles from './footer-nav.module.scss'

const FooterNav: React.FC = () => {
	const { navItems } = useNav()

	return (
		<div className={styles.footerNav}>
			<ul className={styles.footerNav__list}>
				{navItems.map(({ name, to }) => (
					<li key={to} className={styles.footerNav__item}>
						<NavLink
							to={to}
							className={({ isActive }) =>
								classNames(styles.footerNav__link, {
									[styles['footerNav__link--active']]: isActive
								})
							}
						>
							{name}
						</NavLink>
					</li>
				))}
			</ul>
		</div>
	)
}

export default FooterNav
