import { API } from "./API.js"
import { $ } from "./DOM.js"
import { createContentDesk, createDeskTemplate } from "./elements.js"
import { User } from "./User.js"

export class Desks extends User {
	constructor(userID) {
		super(userID);
	}

	appendDesks() {
			if (this.desks.create.length) {
			this.desks.create.forEach(el => {
				const createTemplate = $(document.importNode(createDeskTemplate.$el.content, true))
				const title = createTemplate.find('[data-todo-title]');
				title.text(el.title);
				createContentDesk.append(createTemplate.$el)
			})
		}
	}

	initialRender() {
		this.fetcher (() => API.getUser(this.userID),
		this.appendDesks.bind(this)
		)
		
	}
}   