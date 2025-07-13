import React, { lazy, Suspense } from 'react'
import { RouteObject, createBrowserRouter } from 'react-router-dom'
import { Root } from './root'
import Loader from '@/components/loader/loader'

const BaseLayout = lazy(() => import('@/layout/baseLayout'))
const Home = lazy(() => import('@/pages/home/home'))
const Page404 = lazy(() => import('@/pages/404'))

const withSuspense = (element: React.ReactNode) => (
	<Suspense fallback={<Loader />}>{element}</Suspense>
)

const appRoutes: RouteObject[] = [
	{
		path: '/',
		element: <Root />,
		children: [
			{
				path: '',
				element: withSuspense(<BaseLayout />),
				children: [
					{
						index: true,
						element: withSuspense(<Home />)
					}
				]
			},
			{
				path: '*',
				element: withSuspense(<Page404 />)
			}
		]
	}
]

const appRouter = createBrowserRouter(appRoutes)

export default appRouter
