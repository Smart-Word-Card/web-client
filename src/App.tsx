import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "./pages/Landing"
import StudentCollectionsPage from "./pages/Student/Collections"
import CollectionsPlayPage from "./pages/Student/Collections/Play"
import TeacherCollectionsPage from "./pages/Teacher/Collections"
import CollectionsEditPage from "./pages/Teacher/Collections/Edit"
import CollectionsNewPage from "./pages/Teacher/Collections/New"

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<LandingPage />} />
				<Route path="teacher">
					<Route path="collections">
						<Route index element={<TeacherCollectionsPage />} />
						<Route path="new" element={<CollectionsNewPage />} />
						<Route
							path="edit/:collectionId"
							element={<CollectionsEditPage />}
						/>
					</Route>
				</Route>
				<Route path="student">
					<Route path="collections">
						<Route index element={<StudentCollectionsPage />} />
						<Route
							path="play/:collectionId"
							element={<CollectionsPlayPage />}
						/>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
