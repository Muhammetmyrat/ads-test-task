import React, { createContext, useContext, useEffect, useState } from 'react'

interface ToggleState {
	[key: string]: boolean
}

interface ToggleContextType {
	isOpen: (key: string) => boolean
	handleOpen: (key: string) => void
	handleClose: (key: string) => void
	handleToggle: (key: string) => void
}

const ToggleContext = createContext<ToggleContextType | undefined>(undefined)

export const ToggleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [toggles, setToggles] = useState<ToggleState>({})

	const handleOpen = (key: string) => setToggles(prev => ({ ...prev, [key]: true }))
	const handleClose = (key: string) => setToggles(prev => ({ ...prev, [key]: false }))
	const handleToggle = (key: string) => setToggles(prev => ({ ...prev, [key]: !prev[key] }))
	const isOpen = (key: string) => !!toggles[key]

	useEffect(() => {
		const anyOpen = Object.values(toggles).some(v => v)
		document.body.classList.toggle('_lock', anyOpen)
	}, [toggles])

	return (
		<ToggleContext.Provider value={{ isOpen, handleOpen, handleClose, handleToggle }}>
			{children}
		</ToggleContext.Provider>
	)
}

export const useToggle = (): ToggleContextType => {
	const ctx = useContext(ToggleContext)
	if (!ctx) throw new Error('useToggle must be used within ToggleProvider')
	return ctx
}
