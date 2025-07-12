import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import Button from '../base/button/button'
import Close from '../close/close'
import styles from './modal.module.scss'

interface ModalProps {
	show: boolean
	onClose: () => void
	onConfirm?: (e: React.FormEvent) => void
	children: React.ReactNode
	footer?: React.ReactNode
	title?: string
	className?: string
}

const Modal: React.FC<ModalProps> = ({
	show,
	onClose,
	onConfirm,
	children,
	title,
	footer,
	className = ''
}) => {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && show) {
				onClose()
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [show, onClose])

	if (!show) return null

	return createPortal(
		<div className={styles.modal}>
			<div className={styles.modal__overlay} onClick={onClose} />

			<div className={`${styles.modal__container} ${className}`}>
				<div className={styles.modal__header}>
					<h3>{title}</h3>
					<div className={styles.modal__close} onClick={onClose}>
						<Close />
					</div>
				</div>

				<div className={styles.modal__body}>{children}</div>

				{footer ? (
					footer
				) : (
					<div className={styles.modal__footer}>
						<Button onClick={onClose} title="Cancel" outline />
						<Button
							type="submit"
							onClick={
								onConfirm ? () => onConfirm!(new Event('submit') as unknown as React.FormEvent) : undefined
							}
							title="Create Campaign"
							primary
						/>
					</div>
				)}
			</div>
		</div>,
		document.getElementById('root')!
	)
}

export default Modal
