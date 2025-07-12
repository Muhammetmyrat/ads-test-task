import React from 'react'
import { ScrollRestoration, Outlet } from 'react-router-dom'
import { NavProvider } from '@/context/NavContext'
import { ToggleProvider } from '@/context/ToggleContext'
import '@/assets/styles/index.scss'

export const Root = () => {
	return (
		<NavProvider>
			<ToggleProvider>
				<Outlet />
				<ScrollRestoration />
			</ToggleProvider>
		</NavProvider>
	)
}
