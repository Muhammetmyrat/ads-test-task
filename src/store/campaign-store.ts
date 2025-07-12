import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Campaign {
	id: number
	name: string
	status: 'Active' | 'Paused' | 'Warning'
	cpd: string
	spendings: string
	impressions: string
	clicks: string
	ctr: string
}

export type SortField = 'name' | 'status' | 'cpd' | 'spendings' | 'impressions' | 'clicks' | 'ctr'
export type SortDirection = 'asc' | 'desc'

interface SortState {
	field: SortField | null
	direction: SortDirection
}

interface CampaignState {
	list: Campaign[]
	sort: SortState
}

const defaultCampaigns: Campaign[] = [
	{
		id: 109973,
		name: 'Кампания #109973',
		status: 'Active',
		cpd: '0.00067627',
		spendings: '43.12',
		impressions: '123 456',
		clicks: '9 456',
		ctr: '0.5%'
	},
	{
		id: 109974,
		name: 'Длинное название кампании #109974',
		status: 'Warning',
		cpd: '0.00067627',
		spendings: '43.12',
		impressions: '123 456',
		clicks: '9 456',
		ctr: '0.5%'
	},
	{
		id: 109975,
		name: 'Кампания #109975',
		status: 'Paused',
		cpd: '0.00067627',
		spendings: '43.12',
		impressions: '123 456',
		clicks: '9 456',
		ctr: '0.5%'
	},
	{
		id: 109976,
		name: 'Кампания #109976',
		status: 'Active',
		cpd: '0.00067627',
		spendings: '43.12',
		impressions: '123 456',
		clicks: '9 456',
		ctr: '0.5%'
	},
	{
		id: 109977,
		name: 'Кампания #109977',
		status: 'Active',
		cpd: '0.00067627',
		spendings: '43.12',
		impressions: '123 456',
		clicks: '9 456',
		ctr: '0.5%'
	},
	{
		id: 109978,
		name: 'Кампания #109978',
		status: 'Active',
		cpd: '0.00067627',
		spendings: '43.12',
		impressions: '123 456',
		clicks: '9 456',
		ctr: '0.5%'
	},
	{
		id: 109979,
		name: 'Кампания #109979',
		status: 'Active',
		cpd: '0.00067627',
		spendings: '43.12',
		impressions: '123 456',
		clicks: '9 456',
		ctr: '0.5%'
	},
	{
		id: 109980,
		name: 'Кампания #109980',
		status: 'Active',
		cpd: '0.00067627',
		spendings: '43.12',
		impressions: '123 456',
		clicks: '9 456',
		ctr: '0.5%'
	}
]

const initialState: CampaignState = {
	list: defaultCampaigns,
	sort: {
		field: null,
		direction: 'asc'
	}
}

const parseNumericValue = (value: string): number => {
	const cleaned = value.replace(/[\s,]/g, '').replace('%', '')
	return parseFloat(cleaned) || 0
}

const sortCampaigns = (
	campaigns: Campaign[],
	field: SortField,
	direction: SortDirection
): Campaign[] => {
	if (!field) return campaigns

	return [...campaigns].sort((a, b) => {
		let aValue: string | number = a[field]
		let bValue: string | number = b[field]

		if (['cpd', 'spendings', 'impressions', 'clicks', 'ctr'].includes(field)) {
			aValue = parseNumericValue(aValue as string)
			bValue = parseNumericValue(bValue as string)
		}

		if (field === 'status') {
			const statusOrder = { Active: 1, Warning: 2, Paused: 3 }
			aValue = statusOrder[aValue as keyof typeof statusOrder]
			bValue = statusOrder[bValue as keyof typeof statusOrder]
		}

		if (aValue < bValue) return direction === 'asc' ? -1 : 1
		if (aValue > bValue) return direction === 'asc' ? 1 : -1
		return 0
	})
}

export const campaignSlice = createSlice({
	name: 'campaigns',
	initialState,
	reducers: {
		addCampaign: (state, action: PayloadAction<Campaign>) => {
			state.list.unshift(action.payload)
			if (state.sort.field) {
				state.list = sortCampaigns(state.list, state.sort.field, state.sort.direction)
			}
		},
		removeCampaign: (state, action: PayloadAction<number>) => {
			state.list = state.list.filter(c => c.id !== action.payload)
		},
		setSortField: (state, action: PayloadAction<SortField>) => {
			const field = action.payload

			if (state.sort.field === field) {
				state.sort.direction = state.sort.direction === 'asc' ? 'desc' : 'asc'
			} else {
				state.sort.field = field
				state.sort.direction = 'asc'
			}

			state.list = sortCampaigns(state.list, state.sort.field, state.sort.direction)
		},
		clearSort: state => {
			state.sort.field = null
			state.sort.direction = 'asc'
			state.list = [...defaultCampaigns]
		}
	}
})

export const { addCampaign, removeCampaign, setSortField, clearSort } = campaignSlice.actions
export default campaignSlice.reducer
