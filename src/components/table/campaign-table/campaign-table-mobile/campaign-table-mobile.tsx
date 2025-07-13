import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeCampaign } from '@/store/campaign-store'
import type { Campaign } from '@/store/campaign-store'
import Button from '@/components/base/button/button'
import Icon from '@/components/base/icon'
import styles from './campaign-table-mobile.module.scss'
import classNames from 'classnames'

interface CampaignTableMobileProps {
	campaigns: Campaign[]
}

const CampaignTableMobile: React.FC<CampaignTableMobileProps> = ({ campaigns }) => {
	const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({})
	const dispatch = useDispatch()

	const toggleCard = (id: number) => {
		setExpandedCards(prev => ({
			...prev,
			[id]: !prev[id]
		}))
	}

	const handleRemoveCampaign = (id: number) => {
		dispatch(removeCampaign(id))
	}

	return (
		<div className={styles['campaign-table__mobile']}>
			{campaigns.map(campaign => (
				<CampaignCard
					key={campaign.id}
					campaign={campaign}
					isExpanded={!!expandedCards[campaign.id]}
					onToggle={toggleCard}
					onRemove={handleRemoveCampaign}
				/>
			))}
		</div>
	)
}

interface CampaignCardProps {
	campaign: Campaign
	isExpanded: boolean
	onToggle: (id: number) => void
	onRemove: (id: number) => void
}

const CampaignCard: React.FC<CampaignCardProps> = ({
	campaign,
	isExpanded,
	onToggle,
	onRemove
}) => {
	const getStatusClass = (status: Campaign['status']) => {
		switch (status) {
			case 'Active':
				return styles['campaign-table__status--active']
			case 'Paused':
				return styles['campaign-table__status--paused']
			case 'Warning':
				return styles['campaign-table__status--warning']
			default:
				return ''
		}
	}

	const formatCPD = (cpd: string) => `${cpd} ₽`

	return (
		<div className={styles['campaign-table__card']}>
			<div className={styles['campaign-table__card-header']}>
				<div className={styles['campaign-table__card-title']}>
					<h3 className={styles['campaign-table__card-name']}>{campaign.name}</h3>
					<div className={styles['campaign-table__card-status']}>
						<span className={`${styles['campaign-table__status']} ${getStatusClass(campaign.status)}`}>
							{campaign.status}
						</span>
					</div>
				</div>
				<button
					className={styles['campaign-table__card-toggle']}
					aria-label="Toggle campaign details"
					aria-expanded={isExpanded}
					onClick={() => onToggle(campaign.id)}
				>
					<Icon name="chevron" />
				</button>
			</div>

			<div
				className={classNames(styles['campaign-table__card-body'], {
					[styles['campaign-table__card-body--active']]: isExpanded
				})}
			>
				<div className={styles['campaign-table__card-list']}>
					<div className={styles['campaign-table__card-content']}>
						<CardRow label="Payment model" value={formatCPD(campaign.cpd)} />
						<CardRow label="Spendings" value={`$${campaign.spendings}`} />
						<CardRow label="Impressions" value={campaign.impressions} />
						<CardRow label="Clicks" value={campaign.clicks} />
						<CardRow label="CTR" value={campaign.ctr} />
					</div>

					<div className={styles['campaign-table__card-actions']}>
						<Button title="Go to Campaign Page" bordered />
						<button
							className={styles['campaign-table__delete-btn']}
							onClick={() => onRemove(campaign.id)}
							aria-label="Delete campaign"
						>
							<Icon name="trash" />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

interface CardRowProps {
	label: string
	value: string | number
}

const CardRow: React.FC<CardRowProps> = ({ label, value }) => (
	<div className={styles['campaign-table__card-row']}>
		<span className={styles['campaign-table__card-label']}>{label}</span>
		<span className={styles['campaign-table__card-value']}>{value}</span>
	</div>
)

export default CampaignTableMobile
