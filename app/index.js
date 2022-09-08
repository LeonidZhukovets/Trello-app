import { Desks } from './Desks.js';
import { clock } from './utils/clock.util.js';


clock();
setInterval(clock, 1000);

new Desks(1).initialRender();

// const user =  {
// 	name: 'Brenda Myrze',
// 	avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1054.jpg',
// 	desks: {
// 	  create: [
// 		 {
// 			id: 3,
// 			tittle: 'JS+',
// 			desk: 'Learn JS',
// 			date:'' 
// 		 },
// 		 {
// 			id: 4,
// 			tittle: 'CSS+',
// 			desk: 'Learn CSS',
// 			date: ''
// 		 }
// 	  ],
// 	  progresse: [
// 		 {
// 			id: 2,
// 			tittle: 'HTML+',
// 			desk: 'Learn HTML',
// 			date: ''
// 		 }
// 	  ],
// 	  done: [
// 		 {
// 			id: 0,
// 			tittle: 'HTML',
// 			desk: 'Learn HTML',
// 			date: ''
// 		 }
// 	  ]
// 	},
// 	id: 1
//  }

// API.putUser(1, user)