import { Desks } from './Desks.js';
import { Modal } from './Modal.JS';
import { clock } from './utils/clock.util.js';


clock();
setInterval(clock, 1000);

Modal.addUserListLayout(Desks);
