import $ from 'jquery';

import Task from '../models/task.js';
import Templates from '../templates/templates.js';

const tmp = new Templates();
const tsk = new Task();

let arrayVM = [];

class ViewModel {
	constructor(item) {
		this.title_Observable = item != null ? item.title_Observable : '';
		this.description_Observable = item != null ? item.description_Observable : '';
		this.isFinished_Observable = item != null ? item.isFinished_Observable : false;
		this.dateLimit_Observable = item != null ? item.dateLimit_Observable : new Date();
	}

	init() {
		try {
			this.bindElements();
			this.showTasks();
		} catch (error) {
			console.error(error);
		}
	}

	bindElements() {
		try {
			$('#app').on('change paste keyup', '.title_Observable', e => {
				this.title_Observable = $(e.target).val();
			});
			$('#app').on('change paste keyup', '.description_Observable', e => {
				this.description_Observable = $(e.target).val();
			});
			$('#app').on('change paste keyup', '.dateLimit_Observable', e => {
				this.dateLimit_Observable = $(e.target).val();
			});
			$('#app').on('change', '.isFinished_Observable', e => {
				this.isFinished_Observable = e.target.checked;
			});
			$('#add').on('click', e => {
				this.pushItems(this);
				e.preventDefault();
			});
			$('#submit').on('click', e => {
				this.saveItems();
			});
			$('.list').on('click', '.item-buttons-edit', e => {
				this.showEditForm(+e.target.parentElement.parentElement.attributes.key.value);
			});
			$('.list').on('click', '.item-buttons-delete', e => {
				this.deleteItem(+e.target.parentElement.parentElement.attributes.key.value);
			});
			$('#app').on('click', '#updateItem', e => {
				this.editItem(+e.target.parentElement.parentElement.attributes.key.value, this);
				e.preventDefault();
			});
			$('#app').on('click', '#cancelUpdateItem', e => {
				this.removeHtml('.modalForm');
				e.preventDefault();
			});
		} catch (error) {
			console.error(error);
		}
	}

	async showTasks() {
		try {
			this.removeHtml('.item');
			arrayVM = await tsk.fromDBToView();
			arrayVM.forEach((itemVM, index) => {
				const listItem = tmp.createListItemVM(index, itemVM);
				this.renderItem('.list', listItem);
			});
		} catch (error) {
			console.error(error);
		}
	}

	renderItem(fatherId, childItemHtmlString) {
		try {
			$(fatherId).append(childItemHtmlString);
		} catch (error) {
			console.error(error);
		}
	}

	removeHtml(idTag) {
		try {
			$(idTag).remove();
		} catch (error) {
			console.error(error);
		}
	}

	pushItems(obj) {
		try {
			const item = new ViewModel(obj);
			arrayVM.push(item);
		} catch (error) {
			console.error(error);
		}
	}

	saveItems() {
		try {
			tsk.formViewToDB(arrayVM);
			this.showTasks();
			arrayVM = [];
		} catch (error) {
			console.error(error);
		}
	}

	async deleteItem(idItem) {
		try {
			await tsk.deleteTask(idItem);
			this.showTasks();
		} catch (error) {
			console.error(error);
		}
	}

	async editItem(idItem, obj) {
		try {
			const item = new ViewModel(obj);
			await tsk.editTask(idItem, item);
			this.removeHtml('.modalForm');
			this.showTasks();
		} catch (error) {
			console.error(error);
		}
	}

	async showEditForm(idItem) {
		try {
			arrayVM = [];
			arrayVM = await tsk.fromDBToView();
			const itemVM = arrayVM[idItem];
			const htmlEditForm = tmp.createEditFormVM(idItem, itemVM);
			this.renderItem('#app', htmlEditForm);
		} catch (error) {
			console.error(error);
		}
	}
}

export default ViewModel;
