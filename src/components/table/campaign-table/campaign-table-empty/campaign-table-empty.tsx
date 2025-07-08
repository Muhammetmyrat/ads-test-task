import React from 'react'
import styles from './campaign-table-empty.module.scss'

const CampaignTableEmpty: React.FC = () => {
	return <div className={styles['campaign-table__empty']}>No campaigns available</div>
}

export default CampaignTableEmpty
