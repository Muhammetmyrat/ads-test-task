import { useEffect, useRef, useState } from 'react'

export function useDropdown() {
	const dropdownRef = useRef<HTMLDivElement | null>(null)
	const dropdownMenuRef = useRef<HTMLDivElement | null>(null)
	const [showDropdown, setShowDropdown] = useState(false)
	const [showTop, setShowTop] = useState(false)

	const toggleDropdown = () => {
		const rect = dropdownRef.current?.getBoundingClientRect()
		const height = dropdownMenuRef.current?.scrollHeight || 300
		const bottomSpace = window.innerHeight - (rect?.bottom || 0)
		setShowTop(bottomSpace < height + 100)
		setShowDropdown(prev => !prev)
	}

	const openDropdown = () => {
		setShowDropdown(true)
	}

	const closeDropdown = () => {
		setShowDropdown(false)
	}

	useEffect(() => {
		const onClickOutside = (e: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
				closeDropdown()
			}
		}
		document.addEventListener('click', onClickOutside)
		return () => document.removeEventListener('click', onClickOutside)
	}, [])

	return {
		dropdownRef,
		dropdownMenuRef,
		showDropdown,
		showTop,
		toggleDropdown,
		openDropdown,
		closeDropdown
	}
}
