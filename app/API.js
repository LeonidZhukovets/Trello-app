import { Modal } from "./Modal.JS";

export class API {
	static #route = 'https://6318d3f2f6b281877c77be1d.mockapi.io/users/'

	static async getUsers() {
		const response = await fetch(API.#route);
		if (response.ok) {
			const todos = await response.json();
			return todos;
		} else {
			throw new Error(response.statusText)
		}
	}

	static async getUser(id) {
		Modal.addLoaderLayout();

		const response = await fetch(API.#route + id);
		if (response.ok) {
			const user = await response.json();
			setTimeout(Modal.removeLoaderLayout, 1000);
			return user;
		} else {
			throw new Error(response.statusText)
		}
	}

	static async putUser(id, body) {
		const bodeContent = JSON.stringify(body)

		const headersList = {
			"Content-Type": "application/json"
		}

		const options = {
			method: 'PUT',
			body: bodeContent,
			headers: headersList
		}

		const response = await fetch(API.#route + id, options);

		if (response.ok) {
			const user = await response.json();
			return user;
		} else {
			throw new Error(response.statusText)
		}
	}
}