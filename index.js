import * as contsctsService from "./contacts.js";
import { Command } from 'commander';

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
          const contactsList = await contsctsService.listContacts();
          console.table(contactsList);
      break;

    case 'get':
          const contact = await contsctsService.getContactById(id);
          console.log(contact);
      break;

      case 'add':
          const newContact = await contsctsService.addContact(name , email, phone );
          console.log(newContact);
        break;
      
      case 'remove':
          const deletedContact = await contsctsService.removeContact(id);
          console.log(deletedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);

