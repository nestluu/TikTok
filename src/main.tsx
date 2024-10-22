// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App.js'
import './index.css'
import { store } from './store'

// const client = new QueryClient({
// 	defaultOptions: {
// 		queries: {
// 			staleTime: Infinity,
// 			refetchOnMount: false,
// 			refetchOnReconnect: false,
// 			refetchOnWindowFocus: false,
// 		},
// 	},
// })

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			{/* <QueryClientProvider client={client}> */}
			<Provider store={store}>
				<App />
			</Provider>
			{/* </QueryClientProvider> */}
		</BrowserRouter>
	</React.StrictMode>
)
