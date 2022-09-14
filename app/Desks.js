import { API } from "./API.js";
import { DesksLogic } from "./DesksLogic.js";
import { $ } from "./DOM.js";
import {
  createContentDesk,
  createDeskCount,
  createDeskTemplate,
  doneContentDesk,
  doneDeskCount,
  progressContentDesk,
  progressDeskCount,
  progressDeskTemplate,
} from "./elements.js";
import { User } from "./User.js";

export class Desks extends User {
  constructor(userID) {
    super(userID);
  }

  deskLogic() {
    return new DesksLogic(this.user);
  }

  appendDesks() {
    createContentDesk.clear();

    const $logic = this.deskLogic();

    const { create, progress, done } = this.desks;

    if (create.length) {
      $logic.appendCreateTodos();
    } else {
      createContentDesk.insertHTML("afterbegin", ` <p>No todos yet...</p>`);
    }

    if (progress.length) {
      $logic.appendProgressTodos();
    } else {
      progressContentDesk.insertHTML("afterbegin", ` <p>No todos yet...</p>`);
    }

    if (done.length) {
      $logic.appendDoneTodos();
    } else {
      doneContentDesk.insertHTML("afterbegin", ` <p>No todos yet...</p>`);
    }
  }

  initialRender() {
    this.fetcher(() => API.getUser(this.userID), this.appendDesks.bind(this));
  }
}
