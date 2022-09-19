import { DOM } from "./DOM.js";
import { root } from "./elements.js";
import { getDate } from "./utils/date.utils.js";
import { Desks } from './Desks.js';

export class Modal {
	static #errorLayout;
	static #loader;
	static #warningModal;
	static #newTodoLayout;
	static #usersForm;

	static addLoaderLayout() {
		const loaderLayout = DOM.create("div", "modal", "modal--toggle");
		loaderLayout.insertHTML("afterbegin", `<div class="lds-hourglass"></div>`);
		Modal.#loader = loaderLayout;

		root.insertElement("afterend", loaderLayout);
	}

	static removeLoaderLayout() {
		if (Modal.#loader) {
			Modal.#loader.remove();
		}
	}

	static addErrorLayout(message) {
		this.removeLoaderLayout();

		const errorElement = DOM.create("div", "modal", "error", "modal--toggle");
		errorElement.insertHTML("afterbegin", `<p data-error-message>${message}</p>`);
		Modal.#errorLayout = errorElement;

		root.insertElement("afterend", errorElement);

		errorElement.addEvent("click", (e) => {
			if ('errorMessage' in e.target.dataset) return;
			Modal.#errorLayout.remove();
		})
	}

	static addWarningRemoveLayout(callback) {
		const warningElement = DOM.create("div", "modal", "modal--toggle");
		warningElement.insertHTML("afterbegin", `
			<div class="modal__warning">
				<h2>Are you sure?</h2>
				<div>
					<button class="warning-buttons__cancel" data-btn-cancel>Cancel</button>
					<button class="warning-buttons__confirm" data-btn-confirm>Confirm</button>
				</div>
			</div>
		`);
		Modal.#warningModal = warningElement;

		warningElement.addEvent('click', (e) => {
			const $el = e.target;
			if ('btnCancel' in $el.dataset) {
				this.removeWarningLayout();
				return;
			}
			if ('btnConfirm' in $el.dataset) {
				callback();
				this.removeWarningLayout();
			}
		})

		root.insertElement("afterend", warningElement);
	}

	static removeWarningLayout() {
		if (Modal.#warningModal) {
			Modal.#warningModal.remove();
		}
	}


	static addWarningLimitLayout(limit = '') {
		const warningElement = DOM.create("div", "modal", "modal--toggle");
		warningElement.insertHTML("afterbegin", `
			<div class="modal__warning">
				<h2>You can add only ${limit} todos to Progress desk</h2>
				<button class="warning-buttons__confirm" data-btn-confirm>Confirm</button>
			</div>
		`);
		Modal.#warningModal = warningElement;

		warningElement.addEvent('click', (e) => {
			const $el = e.target;

			if ('btnConfirm' in $el.dataset) {
				this.removeWarningLayout();
			}
		})

		root.insertElement("afterend", warningElement);
	}

	static addNewTodoLayout(callback) {
		const newTodoElement = DOM.create("div", "modal", "modal--toggle");
		const formNewTodo = DOM.create("form", "modal__new-todo");

		formNewTodo.insertHTML('afterbegin', `
			<h3 class="new-todo__header">New ToDo</h3>

			<input 
			type="text" 
			class="new-todo__title" 
			placeholder="Enter ToDo title" 
			required>
			
			<textarea 
			minlength="3" 
			maxlength="50" 
			placeholder="Enter ToDo description" 
			class="new-todo__description"
			required
			></textarea>

			<div class="new-todo__buttons">
				<button type="button" class="new-todo__cancel" data-btn-cancel>Cancel</button>
				<button type="submit" class="new-todo__add" data-btn-add>Add ToDo</button>
			</div>
		`)

		formNewTodo.addEvent('click', (e) => {
			if ('btnCancel' in e.target.dataset) {
				this.removeNewTodoLayout();
			}
		})

		formNewTodo.addEvent('submit', (e) => {
			e.preventDefault();
			const form = e.currentTarget;
			const title = form.elements[0].value;
			const desc = form.elements[1].value;
			const date = getDate();

			callback({ id: Date.now(), title, desc, date });
			this.removeNewTodoLayout();

		})

		newTodoElement.append(formNewTodo);

		Modal.#newTodoLayout = newTodoElement;

		root.insertElement("afterend", newTodoElement);
	}

	static removeNewTodoLayout() {
		if (Modal.#newTodoLayout) {
			Modal.#newTodoLayout.remove();
		}
	}

	static addEditTodoLayout(el, callback) {
		const editTodoElement = DOM.create("div", "modal", "modal--toggle");
		const formEditTodo = DOM.create("form", "modal__new-todo");

		formEditTodo.insertHTML('afterbegin', `
			<h3 class="new-todo__header">Edit ToDo</h3>

			<input 
			type="text" 
			class="new-todo__title" 
			placeholder="Enter ToDo title" 
			value="${el.title}" 
			required>
			
			<textarea 
			minlength="3" 
			maxlength="50" 
			placeholder="Enter ToDo description" 
			class="new-todo__description" 
			required
			>${el.desc}</textarea>

			<div class="new-todo__buttons">
				<button type="button" class="new-todo__cancel" data-btn-cancel>Cancel</button>
				<button type="submit" class="new-todo__add" data-btn-edit>Edit ToDo</button>
			</div>
		`)

		formEditTodo.addEvent('click', (e) => {
			if ('btnCancel' in e.target.dataset) {
				this.removeNewTodoLayout();
			}
		})


		formEditTodo.addEvent('submit', (e) => {
			e.preventDefault();
			const form = e.currentTarget;
			const title = form.elements[0].value;
			const desc = form.elements[1].value;
			const date = getDate();

			callback({ id: el.id, title, desc, date });
			this.removeNewTodoLayout();

		})

		editTodoElement.append(formEditTodo);

		Modal.#newTodoLayout = editTodoElement;

		root.insertElement("afterend", editTodoElement);
	}

	static addUserListLayout(desksInstance) {
		const list = DOM.create("div", "modal", "modal--toggle");
		const usersForm = DOM.create("form", "user-selection");
		usersForm.insertHTML('afterbegin', `
			<label for="user-select">Choose a user:</label>

			<select name="users" id="user-select">
				<option value="">--Please choose an option--</option>
				<option value="1">Brenda Murphy</option>
				<option value="2">Luke McDermott</option>
				<option value="3">Hazel Feeney</option>
			</select>
		`)

		usersForm.addEvent('change', (e) => {
			const value = e.target.value.trim()
			if (value) {
				new desksInstance(value).initialRender();
				this.removeUserListLayout();
			}
		})

		Modal.#usersForm = list;

		list.append(usersForm);

		root.insertElement("afterend", list);
	}
	static removeUserListLayout() {
		if (Modal.#usersForm) {
			Modal.#usersForm.remove();
		}
	}
}