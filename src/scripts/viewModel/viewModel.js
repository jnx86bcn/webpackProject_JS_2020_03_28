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
			this.bindElementsVanilla();
			this.showTasks();
		} catch (error) {
			console.error(error);
		}
	}

	bindElementsVanilla() {
		document.querySelector('#app').addEventListener('input', e => {
			this.handleInputChange(e);
		});
		document.querySelector('#app').addEventListener('click', e => {
			this.handleInputClick(e);
		});
	}

	handleInputChange(e) {
		switch (e.target.attributes.id.value) {
			case 'title_Observable_create':
				this.title_Observable = e.target.value;
				break;
			case 'description_Observable_create':
				this.description_Observable = e.target.value;
				break;
			case 'isFinished_Observable_create':
				this.isFinished_Observable = e.target.checked;
				break;
			case 'dateLimit_Observable_create':
				this.dateLimit_Observable = e.target.value;
				break;
			default:
				break;
		}
	}

	handleInputClick(e) {
		switch (e.target.id) {
			case 'isFinished_Observable_create':
				this.handleInputChange(e);
				break;
			case 'dateLimit_Observable_create':
				this.handleInputChange(e);
				break;
			case 'btn_add':
				this.pushItems(this);
				e.preventDefault();
				break;
			case 'btn_submit':
				this.saveItems();
				e.preventDefault();
				break;
			case 'btn_item-buttons-edit':
				this.showEditForm(+e.target.parentElement.parentElement.attributes.key.value);
				break;
			case 'btn_item-buttons-delete':
				this.deleteItem(+e.target.parentElement.parentElement.attributes.key.value);
				break;
			case 'btn_updateItem':
				this.editItem(+e.target.parentElement.parentElement.attributes.key.value, this);
				break;
			case 'btn_cancelUpdateItem':
				this.removeHtml('modalForm');
				break;
		}
	}

	async showTasks() {
		try {
			this.removeHtml('item');
			arrayVM = await tsk.fromDBToView();
			arrayVM.forEach((itemVM, index) => {
				const listItem = tmp.createListItemVM(index, itemVM);
				this.renderItem('list_show', listItem);
			});
		} catch (error) {
			console.error(error);
		}
	}

	renderItem(fatherId, childItemHtmlString) {
		try {
			document.getElementById(fatherId).innerHTML += childItemHtmlString;
		} catch (error) {
			console.error(error);
		}
	}

	removeHtml(idTag) {
		try {
			if (document.getElementById(idTag) != null) {
				document.getElementById(idTag).remove();
			} else {
				let items = document.getElementsByClassName(idTag);
				while (items.length > 0) {
					items[0].parentNode.removeChild(items[0]);
				}
			}
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
			this.removeHtml('modalForm');
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
			this.renderItem('app', htmlEditForm);
		} catch (error) {
			console.error(error);
		}
	}
}

export default ViewModel;
