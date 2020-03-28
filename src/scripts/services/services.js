class Services {
	async saveTasksSVC(tasks) {
		try {
			localStorage.setItem('JSONTasks', JSON.stringify(tasks));
		} catch (error) {
			console.error(error);
		}
	}
	async getTasksSVC() {
		let result = [];
		let data = [];
		try {
			result = await localStorage.getItem('JSONTasks');
			data = JSON.parse(result);
			return data;
		} catch (error) {
			console.error(error);
		}
	}
}

export default Services;
