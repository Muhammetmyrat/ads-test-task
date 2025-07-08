import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { addCampaign } from '@/store/campaign-store'
import Input from '@/components/base/input/input'
import Dropdown from '@/components/base/dropdown/dropdown'
import Checkbox from '@/components/base/checkbox/checkbox'
import Modal from '@/components/modal/modal'
import styles from './campaign-form.module.scss'

interface CampaignFormProps {
	show: boolean
	onClose: () => void
}

const initialFormState = {
	name: '',
	language: '',
	ratings: [] as string[]
}

const CampaignForm: React.FC<CampaignFormProps> = ({ show, onClose }) => {
	const dispatch = useDispatch()

	const [formData, setFormData] = useState(initialFormState)
	const [errors, setErrors] = useState({ name: false, language: false })

	const languages = useMemo(
		() => [
			{ value: 'en', label: 'English' },
			{ value: 'ru', label: 'Russian' },
			{ value: 'es', label: 'Spanish' },
			{ value: 'fr', label: 'French' }
		],
		[]
	)

	const ratingOptions = useMemo(
		() => [
			{ id: 'gambling', label: 'Gambling' },
			{ id: 'adults', label: 'Adults (18+)' },
			{ id: 'investments', label: 'Investments' },
			{ id: 'risky', label: 'Risky Project' }
		],
		[]
	)

	const resetForm = useCallback(() => {
		setFormData(initialFormState)
		setErrors({ name: false, language: false })
	}, [])

	const validateForm = () => {
		const newErrors = {
			name: !formData.name.trim(),
			language: !formData.language
		}
		setErrors(newErrors)
		return !Object.values(newErrors).some(Boolean)
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
		setErrors(prev => ({ ...prev, [name]: false }))
	}

	const handleLanguageSelect = (value: string) => {
		setFormData(prev => ({ ...prev, language: value }))
		setErrors(prev => ({ ...prev, language: false }))
	}

	const handleRatingToggle = (id: string) => {
		setFormData(prev => {
			const list = prev.ratings.includes(id)
				? prev.ratings.filter(r => r !== id)
				: [...prev.ratings, id]
			return { ...prev, ratings: list }
		})
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!validateForm()) return

		dispatch(
			addCampaign({
				id: Math.floor(Math.random() * 1_000_000),
				name: formData.name,
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
	}

	useEffect(() => {
		if (!show) resetForm()
	}, [show, resetForm])

	return (
		<Modal show={show} onClose={onClose} onConfirm={handleSubmit} title="Create New Campaign">
			<form className={styles.form}>
				<div className={styles.form__group}>
					<Input
						label="Campaign name"
						name="name"
						value={formData.name}
						onChange={handleInputChange}
						placeholder="Enter campaign name"
						error={errors.name}
					/>
				</div>

				<div className={styles.form__group}>
					<Dropdown
						label="Language"
						placeholder="Choose language"
						items={languages}
						selectedValue={formData.language}
						onSelect={handleLanguageSelect}
						error={errors.language}
					/>
				</div>

				<div className={styles.form__group}>
					<label className={styles.form__label}>Ratings</label>
					<div className={styles.form__ratings}>
						{ratingOptions.map(o => (
							<Checkbox
								key={o.id}
								modelValue={formData.ratings.includes(o.id)}
								onChange={() => handleRatingToggle(o.id)}
								title={o.label}
								className={styles.form__checkbox}
							/>
						))}
					</div>
				</div>
			</form>
		</Modal>
	)
}

export default CampaignForm
