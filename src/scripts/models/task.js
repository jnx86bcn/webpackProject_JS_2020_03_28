import Services from '../services/services.js';

const svc = new Services();

let dataDB = [];

class Task {
	constructor() {
		this.nameTask = '';
		this.descriptionTask = '';
		this.isFinished = '';
		this.dateLimit = new Date();
	}

	formViewToDB(arrayVM) {
		try {
			let tasks = [];
			arrayVM.forEach(itemVM => {
				let task = new Task();
				task.nameTask = itemVM.title_Observable;
				task.descriptionTask = itemVM.description_Observable;
				task.dateLimit = itemVM.dateLimit_Observable;
				task.isFinished = itemVM.isFinished_Observable;
				tasks.push(task);
			});
			svc.saveTasksSVC(tasks);
		} catch (error) {
			console.error(error);
		}
	}

	async fromDBToView() {
		try {
			let vmArray = [];
			dataDB = [];
			dataDB = await svc.getTasksSVC();
			dataDB = dataDB === null ? [] : dataDB;
			dataDB.forEach(itemTask => {
				let vmItem = {
					title_Observable: itemTask.nameTask,
					description_Observable: itemTask.descriptionTask,
					dateLimit_Observable: itemTask.dateLimit,
					isFinished_Observable: itemTask.isFinished
				};
				vmArray.push(vmItem);
			});
			return vmArray;
		} catch (error) {
			console.error(error);
		}
	}

	async deleteTask(idItem) {
		dataDB.splice(idItem, 1);
		svc.saveTasksSVC(dataDB);
	}

	async editTask(idItem, item) {
		dataDB[idItem].nameTask = item.title_Observable;
		dataDB[idItem].descriptionTask = item.description_Observable;
		dataDB[idItem].dateLimit = item.dateLimit_Observable;
		dataDB[idItem].isFinished = item.isFinished_Observable;
		svc.saveTasksSVC(dataDB);
	}
}
export default Task;
