import React, { createContext, useContext } from 'react'

export interface NavItem {
	name: string
	to: string
}

interface NavContextType {
	navItems: NavItem[]
}

const NavContext = createContext<NavContextType | undefined>(undefined)

const navItems: NavItem[] = [
	{ name: 'Advertise', to: '/advertise' },
	{ name: 'Earn', to: '/earn' },
	{ name: 'Marketplace', to: '/marketplace' },
	{ name: 'Stats', to: '/stats' }
]

export const NavProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <NavContext.Provider value={{ navItems }}>{children}</NavContext.Provider>
}

export const useNav = (): NavContextType => {
	const context = useContext(NavContext)
	if (!context) {
		throw new Error('useNav must be used within a NavProvider')
	}
	return context
}
