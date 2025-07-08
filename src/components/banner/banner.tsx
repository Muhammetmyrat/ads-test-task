import React from 'react'
import Icon from '../base/icon'
import styles from './banner.module.scss'

const Banner: React.FC = () => {
	const bannerContent = {
		title: 'The first crypto & bitcoin advertising network in the market',
		subtitle:
			'Skytocket your publisher earnings with our game-changing traffic monetization solution',
		stats: [
			{
				title: 'Impressions/day',
				value: '229 M',
				change: '1.78%',
				changeDirection: 'up',
				description: '8.3M unique IPs'
			},
			{
				title: 'Active ad units',
				value: '8796 K',
				change: '1.78%',
				changeDirection: 'down',
				description: 'over 6K publishers'
			},
			{
				title: 'Publishers earn/month',
				value: '$1000',
				change: '3.17%',
				changeDirection: 'up',
				description: 'from 408 ad campaigns'
			}
		]
	}

	return (
		<div className={styles.banner}>
			<div className={'__container'}>
				<div className={styles.banner__wrapper}>
					<div className={styles.banner__content}>
						<h1 className={styles.banner__title}>{bannerContent.title}</h1>
						<p className={styles.banner__subtitle}>{bannerContent.subtitle}</p>
					</div>
					<div className={styles.banner__stats}>
						{bannerContent.stats.map((stat, index) => (
							<div className={styles.banner__statItems} key={index}>
								<div className={styles.banner__statItem}>
									<div className={styles.banner__statTitle}>{stat.title}</div>
									<div className={styles.banner__statValue}>
										<span>{stat.value}</span>
										<div
											className={`${styles.banner__statChange} ${
												styles[`banner__statChange--${stat.changeDirection}`]
											}`}
										>
											<Icon name="arrow" />
											{stat.change}
										</div>
									</div>
								</div>
								<div className={styles.banner__statDescription}>{stat.description}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Banner
