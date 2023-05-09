import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import  routerConfig  from './config'
// import ScrollToTop from './scrollToTop'

export default function RouterList() {
	return (
			<Suspense fallback={null}>
				<Routes>{routerConfig.map(renderRoute)}</Routes>
			</Suspense>
	)
}

function renderRoute({ path, Element, Component, exact, noAuth, children, reqComing }, index) {
	return children ? (
		children.map(renderRoute)
	) : (
		<Route key={index} exact={exact} path={path}>
		<Element />
		</Route>
	)
}