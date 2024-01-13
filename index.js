

const program = require("commander");
const { listContacts, getContactById, removeContact, addContact } = require('./contacts');
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      return console.table(allContacts);
      break;

    case "get":
         const getContactById = await getContactById(id);
      return console.table(getContactById);
      break;

    case "add":
     const newContact = await addContact(name, email, phone)
      return console.table(newContact);
      break;

    case "remove":
      const removeContact = await removeContact(id);
      return console.table(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
