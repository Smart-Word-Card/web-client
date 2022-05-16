import { ConfigProvider } from "antd"
import "antd/dist/antd.css"
import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SWRConfig } from "swr"
import AppLayout from "./components/AppLayout"
import LandingPage from "./pages/Landing"
import StudentCollectionsPage from "./pages/Student/Collections"
import CollectionsPlayPage from "./pages/Student/Collections/Play"
import TeacherCollectionsPage from "./pages/Teacher/Collections"
import CollectionsEditPage from "./pages/Teacher/Collections/Edit"
import CollectionsNewPage from "./pages/Teacher/Collections/New"
import axiosFetcher from "./utils/axios/axiosFetcher"

const validateMessages = {
	required: "This field is required",
}

function App() {
	return (
		<SWRConfig value={{ fetcher: axiosFetcher, revalidateOnMount: true }}>
			<ConfigProvider form={{ validateMessages }}>
				<AppLayout>
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
				</AppLayout>
			</ConfigProvider>
		</SWRConfig>
	)
}

export default App
