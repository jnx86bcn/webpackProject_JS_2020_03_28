export class Templates {
	createListItemVM(index, itemVM) {
		/*html*/
		const htmlString = `<div class="item" key=${index}>
			<div class="item-info">
				<div class="item-info-title">${itemVM.title_Observable}</div>
				<div class="item-info-description">${itemVM.description_Observable}</div>
				<div class="item-info-dateLimit">${itemVM.dateLimit_Observable}</div>
				<input type="checkbox" class="item-info-isFinish"  disabled ${
					itemVM.isFinished_Observable ? 'checked' : ''
				}/>
			</div>
			<div class="item-buttons">
				<button class="item-buttons-edit">Edit</button>
            	<button class="item-buttons-delete">Delete</button>
			</div>
        </div>
        `;
		return htmlString;
	}
	createEditFormVM(idItem, itemVM) {
		/*html*/
		const htmlString = `
		<div key=${idItem} class="modalForm">
			<p>Edit item</p>
			<form id="editForm">
				<input type="text" name="titleTask" id="title_Observable_edit" class="title_Observable" value = "${
					itemVM.title_Observable
				}">
				<textarea
					name="decriptionTask"
					id="description_Observable_edit"
					cols="30"
					rows="10"
					class="description_Observable"
				>${itemVM.description_Observable}</textarea>
				<input type="checkbox" name="isFinishTask" id="isFinished_Observable_edit" class="isFinished_Observable" ${
					itemVM.isFinished_Observable ? 'checked' : ''
				} />
				<input type="date" name="dateLimitTask" id="dateLimit_Observable_edit" class="dateLimit_Observable" value = "${
					itemVM.dateLimit_Observable
				}" />
				<button id="updateItem">Save</button>
				<button id="cancelUpdateItem">Cancel</button>
			</form>
		</div>`;
		return htmlString;
	}
}

export default Templates;