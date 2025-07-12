import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { addCampaign } from '@/store/campaign-store'
import Input from '@/components/base/input/input'
import Dropdown, { type DropdownItem } from '@/components/base/dropdown/dropdown'
import Checkbox from '@/components/base/checkbox/checkbox'
import Modal from '@/components/modal/modal'
import styles from './campaign-form.module.scss'

interface CampaignFormProps {
	show: boolean
	onClose: () => void
}

interface FormData {
	name: string
	language: string
	ratings: string[]
}

interface ValidationErrors {
	name: boolean
	language: boolean
}

const LANGUAGE_OPTIONS: DropdownItem[] = [
	{ value: 'en', label: 'English' },
	{ value: 'ru', label: 'Russian' },
	{ value: 'es', label: 'Spanish' },
	{ value: 'fr', label: 'French' },
	{ value: 'de', label: 'German' },
	{ value: 'it', label: 'Italian' },
	{ value: 'pt', label: 'Portuguese' },
	{ value: 'zh', label: 'Chinese' }
]

const RATING_OPTIONS = [
	{ id: 'gambling', label: 'Gambling' },
	{ id: 'adults', label: 'Adults (18+)' },
	{ id: 'investments', label: 'Investments' },
	{ id: 'risky', label: 'Risky Project' }
] as const

const INITIAL_FORM_DATA: FormData = {
	name: '',
	language: '',
	ratings: []
}

const INITIAL_ERRORS: ValidationErrors = {
	name: false,
	language: false
}

const CampaignForm: React.FC<CampaignFormProps> = ({ show, onClose }) => {
	const dispatch = useDispatch()
	const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
	const [errors, setErrors] = useState<ValidationErrors>(INITIAL_ERRORS)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const resetForm = useCallback(() => {
		setFormData(INITIAL_FORM_DATA)
		setErrors(INITIAL_ERRORS)
		setIsSubmitting(false)
	}, [])

	useEffect(() => {
		if (!show) {
			resetForm()
		}
	}, [show, resetForm])

	const validate = useCallback((): boolean => {
		const validationErrors: ValidationErrors = {
			name: !formData.name.trim(),
			language: !formData.language
		}
		setErrors(validationErrors)
		return !Object.values(validationErrors).some(Boolean)
	}, [formData])

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = e.target
			setFormData(prev => ({ ...prev, [name]: value }))
			if (errors[name as keyof ValidationErrors]) {
				setErrors(prev => ({ ...prev, [name]: false }))
			}
		},
		[errors]
	)

	const handleLanguageSelect = useCallback((language: DropdownItem) => {
		setFormData(prev => ({ ...prev, language: language.value as string }))
		setErrors(prev => ({ ...prev, language: false }))
	}, [])

	const toggleRating = useCallback((id: string) => {
		setFormData(prev => {
			const ratings = prev.ratings.includes(id)
				? prev.ratings.filter(r => r !== id)
				: [...prev.ratings, id]
			return { ...prev, ratings }
		})
	}, [])

	const handleSubmit = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault()

			if (!validate() || isSubmitting) return

			setIsSubmitting(true)

			try {
				const campaignId = Date.now() + Math.floor(Math.random() * 1000)

				dispatch(
					addCampaign({
						id: campaignId,
						name: formData.name.trim(),
						status: 'Active',
						cpd: '0.00067627',
						spendings: '0.00',
						impressions: '0',
						clicks: '0',
						ctr: '0%'
					})
				)

				onClose()
				resetForm()
			} catch (error) {
				console.error('Error creating campaign:', error)
			} finally {
				setIsSubmitting(false)
			}
		},
		[formData, validate, isSubmitting, dispatch, onClose, resetForm]
	)

	const selectedLanguage = LANGUAGE_OPTIONS.find(lang => lang.value === formData.language) || null

	return (
		<Modal show={show} onClose={onClose} onConfirm={handleSubmit} title="Create New Campaign">
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.form__group}>
					<Input
						label="Campaign name"
						name="name"
						value={formData.name}
						onChange={handleInputChange}
						placeholder="Enter campaign name"
						error={errors.name}
						disabled={isSubmitting}
						required
					/>
				</div>

				<div className={styles.form__group}>
					<Dropdown
						label="Language"
						placeholder="Choose language"
						items={LANGUAGE_OPTIONS}
						selectedItem={selectedLanguage}
						onSelectItem={handleLanguageSelect}
						error={errors.language}
						disabled={isSubmitting}
					/>
				</div>

				<div className={styles.form__group}>
					<label className={styles.form__label}>
						Ratings
						<span className={styles.form__label_optional}>(Optional)</span>
					</label>
					<div className={styles.form__ratings}>
						{RATING_OPTIONS.map(option => (
							<Checkbox
								key={option.id}
								modelValue={formData.ratings.includes(option.id)}
								onChange={() => toggleRating(option.id)}
								title={option.label}
								className={styles.form__checkbox}
								disabled={isSubmitting}
							/>
						))}
					</div>
				</div>
			</form>
		</Modal>
	)
}

export default CampaignForm
