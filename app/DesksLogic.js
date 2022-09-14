
import { API } from "./API.js";
import { ERROR_WHILE_MOVING } from "./constants.js";
import { $ } from "./DOM.js";
import {
	createContentDesk,
	createDeskCount,
	createDeskTemplate,
	doneContentDesk,
	doneDeskCount,
	doneDeskTemplate,
	progressContentDesk,
	progressDeskCount,
	progressDeskTemplate,
} from "./elements.js";

export class DesksLogic {
	constructor(user, fetcher, appendDesks) {
		this.user = user;
		this.desks = user.desks;
		this.ID = user.id;
		this.fetcher = fetcher;
		this.appendDesks = appendDesks
	}

	applyContent(el, template) {
		const title = template.find("[data-todo-title]");
		title.text(el.title);

		const desc = template.find("[data-todo-desc-content]");
		desc.text(el.desc);

		const userName = template.find("[data-todo-user]");
		userName.text(this.user.name);

		const todoDate = template.find("[data-todo-date]");
		todoDate.text(el.date);
	}

	appendCreateTodos() {
		const { create } = this.desks;

		createDeskCount.text(create.length);

		create.forEach((el) => {
			const createTemplate = $(document.importNode(createDeskTemplate.$el.content, true));
			this.applyContent(el, createTemplate);

			const btnMove = createTemplate.find('[data-todo-btn-move]');
			btnMove.addEvent('click', () => {
				const create = this.desks.create
					.filter(todo => todo.id !== el.id)
				const progress = [...this.desks.progress, el];
				const newDesks = { ...this.desks, create, progress };

				this.fetcher(
					() => API.putUser(this.ID, { desks: newDesks }),
					this.appendDesks,
					ERROR_WHILE_MOVING
				)
			})

			createContentDesk.append(createTemplate);
		});
	}

	appendProgressTodos() {
		const { progress } = this.desks;

		progressDeskCount.text(progress.length);

		progress.forEach((el) => {
			const progressTemplate = $(
				document.importNode(progressDeskTemplate.$el.content, true)
			);

			this.applyContent(el, progressTemplate);

			progressContentDesk.append(progressTemplate);
		});
	}

	appendDoneTodos() {
		const { done } = this.desks;

		doneDeskCount.text(done.length);

		done.forEach((el) => {
			const doneTemplate = $(
				document.importNode(doneDeskTemplate.$el.content, true)
			);

			this.applyContent(el, doneTemplate);

			doneContentDesk.append(doneTemplate);
		});
	}
}
