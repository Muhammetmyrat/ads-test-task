import React, { useState, useMemo, useCallback } from 'react'
import { useDropdown } from './useDropdown'
import Icon from '@/components/base/icon'
import styles from './dropdown.module.scss'
import classNames from 'classnames'

export interface DropdownItem {
	value: string | number
	label: string
	checked?: boolean
	disabled?: boolean
}

export interface DropdownProps {
	items: DropdownItem[]
	placeholder?: string
	label?: string
	selectedItem?: DropdownItem | string | null
	disabled?: boolean
	menuWidth?: string
	checkable?: boolean
	error?: boolean
	success?: boolean
	searchable?: boolean
	searchableSelf?: boolean
	countable?: boolean
	activeId?: number
	readonly?: boolean
	leftPosition?: boolean
	empty?: boolean
	onSelectItem: (item: DropdownItem) => void
	onSearch?: (text: string) => void
}

const Dropdown: React.FC<DropdownProps> = ({
	items,
	placeholder = '',
	label,
	selectedItem,
	disabled = false,
	menuWidth = '100%',
	checkable = false,
	error = false,
	success = false,
	searchable = false,
	searchableSelf = false,
	countable = false,
	activeId,
	readonly = false,
	leftPosition = false,
	empty = false,
	onSelectItem,
	onSearch
}) => {
	const {
		dropdownRef,
		dropdownMenuRef,
		showDropdown,
		showTop,
		toggleDropdown,
		openDropdown,
		closeDropdown
	} = useDropdown()

	const [search, setSearch] = useState('')

	const displayValue = useMemo(() => {
		if (searchableSelf) return search
		if (placeholder && !selectedItem) return placeholder
		return typeof selectedItem === 'string' ? selectedItem : selectedItem?.label || ''
	}, [searchableSelf, search, selectedItem, placeholder])

	const filteredItems = useMemo(() => {
		if ((!searchable && !searchableSelf) || !search.length) return items
		return items.filter(item => item.label.toLowerCase().includes(search.toLowerCase()))
	}, [items, search, searchable, searchableSelf])

	const checkedCount = useMemo(() => items.filter(item => item.checked).length, [items])

	const dropdownClasses = useMemo(
		() =>
			classNames(styles.dropdown, {
				[styles['dropdown--disabled']]: disabled,
				[styles['dropdown--active']]: showDropdown,
				[styles['dropdown--error']]: error && !success,
				[styles['dropdown--success']]: success,
				[styles['dropdown--empty']]: empty,
				[styles['dropdown--top']]: showTop,
				[styles['dropdown--readonly']]: readonly,
				[styles['dropdown__menu_left']]: leftPosition
			}),
		[disabled, showDropdown, error, success, empty, showTop, readonly, leftPosition]
	)

	const handleSearchChange = useCallback(
		(value: string) => {
			setSearch(value)
			onSearch?.(value)
		},
		[onSearch]
	)

	const handleDropdownClick = useCallback(() => {
		if (!readonly && !disabled) {
			toggleDropdown()
		}
	}, [readonly, disabled, toggleDropdown])

	const handleItemSelect = useCallback(
		(e: React.MouseEvent, item: DropdownItem) => {
			e.stopPropagation()
			if (item.disabled) return

			if (searchableSelf) {
				setSearch(item.label)
			} else {
				setSearch('')
			}

			if (!checkable) {
				closeDropdown()
			}

			onSelectItem(item)
		},
		[checkable, searchableSelf, closeDropdown, onSelectItem]
	)

	const handleCheckboxClick = useCallback(
		(e: React.MouseEvent, item: DropdownItem) => {
			e.stopPropagation()
			e.preventDefault()
			if (item.disabled) return
			onSelectItem(item)
		},
		[onSelectItem]
	)

	const handleSearchableSelfChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value
			openDropdown()
			handleSearchChange(value)
		},
		[openDropdown, handleSearchChange]
	)

	const handleRegularSearchChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			handleSearchChange(e.target.value)
		},
		[handleSearchChange]
	)

	const handleSearchableSelfClick = useCallback(
		(e: React.MouseEvent) => {
			e.stopPropagation()
			openDropdown()
		},
		[openDropdown]
	)

	const handleChevronClick = useCallback(
		(e: React.MouseEvent) => {
			e.stopPropagation()
			handleDropdownClick()
		},
		[handleDropdownClick]
	)

	const isItemActive = useCallback(
		(item: DropdownItem) => {
			if (activeId !== undefined) {
				return activeId === item.value
			}
			if (typeof selectedItem === 'object' && selectedItem) {
				return item.value === selectedItem.value
			}
			return false
		},
		[activeId, selectedItem]
	)

	const getItemClasses = useCallback(
		(item: DropdownItem) =>
			classNames(styles.dropdown__item, {
				[styles['dropdown__item--active']]: isItemActive(item),
				[styles['dropdown__item--disabled']]: item.disabled
			}),
		[isItemActive]
	)

	const shouldShowPlaceholder = placeholder && !selectedItem
	const canInteract = !disabled && !readonly
	const hasResults = filteredItems.length > 0

	return (
		<div className={dropdownClasses} ref={dropdownRef}>
			{label && <div className={styles.dropdown__label}>{label}</div>}

			<div className={styles.dropdown__body}>
				<div
					className={classNames(styles.dropdown__button, {
						[styles.dropdown__button_self]: searchableSelf
					})}
					onClick={handleDropdownClick}
					role="button"
					tabIndex={canInteract ? 0 : -1}
					aria-expanded={showDropdown}
					aria-haspopup="listbox"
				>
					{searchableSelf ? (
						<input
							className={styles.dropdown__search_self}
							value={displayValue}
							autoFocus
							onChange={handleSearchableSelfChange}
							placeholder={placeholder}
							disabled={disabled}
							readOnly={readonly}
							onClick={handleSearchableSelfClick}
						/>
					) : (
						<p className={shouldShowPlaceholder ? styles.dropdown__placeholder : ''}>{displayValue}</p>
					)}

					{countable && checkedCount > 0 && <div className={styles.dropdown__count}>{checkedCount}</div>}

					{!disabled && <Icon onClick={handleChevronClick} name="chevron" />}
				</div>

				{showDropdown && (
					<div
						className={styles.dropdown__menu}
						ref={dropdownMenuRef}
						style={{ width: menuWidth }}
						role="listbox"
					>
						<div className={styles.dropdown__list}>
							{searchable && !searchableSelf && (
								<div className={styles.dropdown__search}>
									<input
										type="text"
										value={search}
										placeholder="Search..."
										onChange={handleRegularSearchChange}
										autoFocus
									/>
								</div>
							)}

							<div className={styles.dropdown__items}>
								{hasResults ? (
									filteredItems.map((item, index) => (
										<div
											key={`${item.value}-${index}`}
											className={getItemClasses(item)}
											onClick={e => handleItemSelect(e, item)}
											role="option"
											aria-selected={isItemActive(item)}
											tabIndex={item.disabled ? -1 : 0}
										>
											<p>{item.label}</p>

											{checkable && (
												<div
													className={styles.dropdown__item_append_icon}
													onClick={e => handleCheckboxClick(e, item)}
												>
													<Icon name={item.checked ? 'checkBox' : 'checkBoxOutline'} />
												</div>
											)}
										</div>
									))
								) : (
									<div className={styles.dropdown__no_results}>
										<p>No results found</p>
									</div>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Dropdown
