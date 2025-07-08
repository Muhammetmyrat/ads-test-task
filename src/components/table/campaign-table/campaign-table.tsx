import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import CampaignTableDesktop from './campaign-table-desktop/campaign-table-desktop'
import CampaignTableMobile from './campaign-table-mobile/campaign-table-mobile'
import CampaignTableEmpty from './campaign-table-empty/campaign-table-empty'
import styles from './campaign-table.module.scss'

const CampaignTable: React.FC = () => {
	const campaigns = useSelector((state: RootState) => state.campaigns.list)

	return (
		<div className={styles['campaign-table']}>
			{campaigns.length ? (
				<>
					<CampaignTableDesktop campaigns={campaigns} />
					<CampaignTableMobile campaigns={campaigns} />
				</>
			) : (
				<CampaignTableEmpty />
			)}
		</div>
	)
}

export default CampaignTable
