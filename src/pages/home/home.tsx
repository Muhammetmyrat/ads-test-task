import React from 'react'
import CampaignForm from '@/components/campaign-form/campaign-form'
import Banner from '@/components/banner/banner'
import Button from '@/components/base/button/button'
import classNames from 'classnames'
import { CampaignTable } from '@/components/table'
import { useToggle } from '@/context/ToggleContext'

import styles from './home.module.scss'

const Home: React.FC = () => {
	const { isOpen, handleToggle } = useToggle()
	const campaignFormOpen = isOpen('campaignForm')

	return (
		<div className={styles.home}>
			<section>
				<Banner />
			</section>

			<section className={classNames(styles.campaigns, '__container')}>
				<div className={styles.campaigns__header}>
					<h2 className={styles.campaigns__title}>Campaigns</h2>
					<Button
						title="Create New Campaign"
						prependIcon="plus"
						outline
						onClick={() => handleToggle('campaignForm')}
					/>
				</div>
				<CampaignTable />
			</section>

			<CampaignForm show={campaignFormOpen} onClose={() => handleToggle('campaignForm')} />
		</div>
	)
}

export default Home
