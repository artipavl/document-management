function sortArrByKey<T>(arr: T[], key: keyof T, filter: boolean): T[] {
	return arr.slice().sort((a, b) => {
		if (filter) {
			if (a[key] < b[key]) {
				return -1;
			}
			if (a[key] > b[key]) {
				return 1;
			}
		} else {
			if (a[key] < b[key]) {
				return 1;
			}
			if (a[key] > b[key]) {
				return -1;
			}
		}

		return 0;
	});
}

export default sortArrByKey;
