import React from 'react'
import { ScrollRestoration, Outlet } from 'react-router-dom'
import { NavProvider } from '@/context/NavContext'
import '@/assets/styles/index.scss'

export const Root = () => {
	return (
		<NavProvider>
			<Outlet />
			<ScrollRestoration />
		</NavProvider>
	)
}
