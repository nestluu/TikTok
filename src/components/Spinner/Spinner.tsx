import { CircularProgress } from '@mui/material'

export const Spinner = () => {
	return (
		<div className='flex items-center justify-center mt-5'>
			<CircularProgress size={30} />
		</div>
	)
}
