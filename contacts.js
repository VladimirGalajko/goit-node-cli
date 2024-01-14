const fs = require('fs/promises')
const path = require('path')
const { randomUUID } = require('crypto');

const contactsPath = path.join(__dirname, 'db/contacts.json')

async function listContacts() {
  const data = await fs.readFile(contactsPath)
  return JSON.parse(data)
}

async function getContactById(contactId) {
  const contacts = await listContacts()
  const contact = contacts.find((el) => el.id === contactId) || null
  return contact
}

async function removeContact(contactId) {
    const contacts = await listContacts()
    const contact = await getContactById(contactId)
    if (contacts && contact){
        const updatedContacts = contacts.filter(el => el.id !== contactId);
        await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2))
        return contact
    }
    else return null
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {id: randomUUID(), name, email, phone}

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
 
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}
