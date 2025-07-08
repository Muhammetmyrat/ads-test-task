import React, { useState } from 'react'
import CampaignForm from '@/components/campaign-form/campaign-form'
import Banner from '@/components/banner/banner'
import Button from '@/components/base/button/button'
import classNames from 'classnames'
import { CampaignTable } from '@/components/table'

import styles from './home.module.scss'

const Home: React.FC = () => {
	const [showForm, setShowForm] = useState(false)

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
						onClick={() => setShowForm(true)}
					/>
				</div>
				<CampaignTable />
			</section>

			<CampaignForm show={showForm} onClose={() => setShowForm(false)} />
		</div>
	)
}

export default Home
