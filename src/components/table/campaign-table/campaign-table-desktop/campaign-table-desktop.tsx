import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { removeCampaign, setSortField, SortField } from '@/store/campaign-store'
import type { Campaign } from '@/store/campaign-store'
import Icon from '@/components/base/icon'
import styles from './campaign-table-desktop.module.scss'

interface CampaignTableDesktopProps {
	campaigns: Campaign[]
}

interface RootState {
	campaigns: {
		sort: {
			field: SortField | null
			direction: 'asc' | 'desc'
		}
	}
}

const CampaignTableDesktop: React.FC<CampaignTableDesktopProps> = ({ campaigns }) => {
	const dispatch = useDispatch()
	const sortState = useSelector((state: RootState) => state.campaigns.sort)

	const handleRemoveCampaign = (id: number) => {
		dispatch(removeCampaign(id))
	}

	const handleSort = (field: SortField) => {
		dispatch(setSortField(field))
	}

	return (
		<div className={styles['campaign-table__desktop']}>
			<table className={styles['campaign-table__table']}>
				<thead className={styles['campaign-table__header']}>
					<tr>
						<SortableHeader field="name" onClick={handleSort} sortState={sortState}>
							Campaign
						</SortableHeader>
						<SortableHeader field="status" onClick={handleSort} sortState={sortState}>
							Status
						</SortableHeader>
						<th className={styles['campaign-table__header-cell']}>
							<div className={styles['campaign-table__header-content']}>Payment model</div>
						</th>
						<SortableHeader field="spendings" onClick={handleSort} sortState={sortState} hasInfo>
							Spendings
						</SortableHeader>
						<SortableHeader field="impressions" onClick={handleSort} sortState={sortState} hasInfo>
							Impressions
						</SortableHeader>
						<SortableHeader field="clicks" onClick={handleSort} sortState={sortState} hasInfo>
							Clicks
						</SortableHeader>
						<SortableHeader field="ctr" onClick={handleSort} sortState={sortState} hasInfo>
							CTR
						</SortableHeader>
						<th className={styles['campaign-table__header-cell']}></th>
					</tr>
				</thead>
				<tbody className={styles['campaign-table__body']}>
					{campaigns.map(campaign => (
						<CampaignRow key={campaign.id} campaign={campaign} onRemove={handleRemoveCampaign} />
					))}
				</tbody>
			</table>
		</div>
	)
}

interface SortableHeaderProps {
	field: SortField
	onClick: (field: SortField) => void
	sortState: { field: SortField | null; direction: 'asc' | 'desc' }
	children: React.ReactNode
	hasInfo?: boolean
}

const SortableHeader: React.FC<SortableHeaderProps> = ({
	field,
	onClick,
	sortState,
	children,
	hasInfo = false
}) => {
	const isActive = sortState.field === field
	const isDescending = isActive && sortState.direction === 'asc'

	return (
		<th
			className={`${styles['campaign-table__header-cell']} ${styles['campaign-table__header-cell--sortable']}`}
			onClick={() => onClick(field)}
		>
			<div className={styles['campaign-table__header-content']}>
				{children}
				{hasInfo && <span className={styles['campaign-table__info']}>?</span>}
				<span
					className={`${styles['campaign-table__sort-icon']} ${
						isActive ? styles['campaign-table__sort-icon--active'] : ''
					} ${isDescending ? styles['campaign-table__sort-icon--desc'] : ''}`}
				>
					<Icon name="chevron" />
				</span>
			</div>
		</th>
	)
}

interface CampaignRowProps {
	campaign: Campaign
	onRemove: (id: number) => void
}

const CampaignRow: React.FC<CampaignRowProps> = ({ campaign, onRemove }) => {
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
		<tr className={styles['campaign-table__row']}>
			<td className={styles['campaign-table__cell']}>
				<NavLink to="" className={styles['campaign-table__campaign-name']}>
					{campaign.name}
				</NavLink>
			</td>
			<td className={styles['campaign-table__cell']}>
				<span className={`${styles['campaign-table__status']} ${getStatusClass(campaign.status)}`}>
					{campaign.status}
				</span>
			</td>
			<td className={styles['campaign-table__cell']}>
				<div className={styles['campaign-table__cpd']}>
					CPD: <span>{formatCPD(campaign.cpd)}</span>
				</div>
			</td>
			<td className={styles['campaign-table__cell']}>${campaign.spendings}</td>
			<td className={styles['campaign-table__cell']}>{campaign.impressions}</td>
			<td className={styles['campaign-table__cell']}>{campaign.clicks}</td>
			<td className={styles['campaign-table__cell']}>{campaign.ctr}</td>
			<td className={styles['campaign-table__cell']}>
				<button
					className={styles['campaign-table__delete-btn']}
					onClick={() => onRemove(campaign.id)}
					aria-label="Delete campaign"
				>
					<Icon name="trash" />
				</button>
			</td>
		</tr>
	)
}

export default CampaignTableDesktop
