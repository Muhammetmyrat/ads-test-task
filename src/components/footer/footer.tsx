import React from 'react'
import { NavLink } from 'react-router-dom'
import FooterNav from './footer-nav/footerNav'
import classNames from 'classnames'
import styles from './footer.module.scss'

const Footer: React.FC = () => {
	const currentYear = new Date().getFullYear()

	return (
		<footer className={styles.footer}>
			<FooterNav />
			<div className={styles.footer__wrapper}>
				<div className={classNames(styles.footer__body, '__container')}>
					<p className={styles.footer__copyright}>© A-ADS 2011–{currentYear}</p>
					<div className={styles.footer__terms}>
						<NavLink to="/terms-of-service" target="_blank" className={styles.footer__term}>
							Terms of Service
						</NavLink>
						<NavLink to="/privacy-policy" target="_blank" className={styles.footer__term}>
							Privacy Policy
						</NavLink>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
