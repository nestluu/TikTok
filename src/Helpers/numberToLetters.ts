export const numberToLetters = (num: number) => {
	const formatter = Intl.NumberFormat('en', {
		notation: 'compact',
	})
	return formatter.format(num)
}
