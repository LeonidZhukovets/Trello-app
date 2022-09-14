import { API } from "./API.js"
import { $ } from "./DOM.js"
import { createContentDesk, createDeskCount, createDeskTemplate, progressContentDesk, progressDeskCount, progressDeskTemplate } from "./elements.js"
import { User } from "./User.js"
import { getDate } from "./utils/date.utils.js";

export class Desks extends User {
	constructor(userID) {
		super(userID);
	}

	appendDesks() {
		createContentDesk.clear();

		const { create, progress, done } = this.desks;

			if (create.length) {
			createDeskCount.text(create.length);

			create.forEach(el => {
				const createTemplate = $(document.importNode(createDeskTemplate.$el.content, true))
				const title = createTemplate.find('[data-todo-title]');
				title.text(el.title);

				const desc = createTemplate.find('[data-todo-desc-content]');
				desc.text(el.desc);

				const userName = createTemplate.find('[data-todo-user]');
				userName.text(this.user.name);

				const todoDate = createTemplate.find('[data-todo-date]');
				todoDate.text(el.date);

				createContentDesk.append(createTemplate);
			})
		} else {
			createContentDesk.insertHTML('afterbegin', ` <p>No todos yet...</p>`)
		}

		if (progress.length) {
			progressDeskCount.text(progress.length);

			create.forEach(el => {
				const progressTemplate = $(document.importNode(progressDeskTemplate.$el.content, true))
				const title = progressTemplate.find('[data-todo-title]');
				title.text(el.title);

				const desc = progressTemplate.find('[data-todo-desc-content]');
				desc.text(el.desc);

				const userName = progressTemplate.find('[data-todo-user]');
				userName.text(this.user.name);

				const todoDate = progressTemplate.find('[data-todo-date]');
				todoDate.text(el.date);

				progressContentDesk.append(progressTemplate);
			})
		} else {
			progressContentDesk.insertHTML('afterbegin', ` <p>No todos yet...</p>`)
		}
	}

	initialRender() {
		this.fetcher (() => API.getUser(this.userID),
		this.appendDesks.bind(this)
		)
		
	}
}   