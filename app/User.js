import { Modal } from "./Modal.JS";

export class User {
	#user = {};
	#desks = {};
	#userID;

	constructor(userID) {
		this.#userID = userID;
	}

	get userID() {
		return this.#userID;
	}

	get user() {
		return this.#user;
	}

	set user(user) {
		if (typeof user !== "undefined") {
			this.#user = user;
		}
	}

	get desks() {
		return this.#desks;
	}

	set desks(desks) {
		if (typeof desks !== "undefined") {
			this.#desks = desks;
		}
	}

	async fetcher(callback, appendDesks, message = '') {
		try {
			const user = await callback();
			this.user = user;
			this.desks = user.desks;
			appendDesks();
		} catch (e) {
			Modal.addErrorLayout(`${message}: ${e.message}`);
		}
	}
}
