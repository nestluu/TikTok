import { Header } from './components/header/Header'
import { AppRoutes } from './components/Routes/AppRoutes'

function App() {
	return (
		<>
			<div className='bg-neutral-950 h-full'>
				<Header />
				<div className='mx-auto my-0 bg-neutral-950'>
					<AppRoutes />
				</div>
			</div>
		</>
	)
}

export default App
