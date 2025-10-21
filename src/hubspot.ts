import axios from 'axios';

interface Contact {
  email: string;
  firstname?: string;
  lastname?: string;
  gender?: string;
}

export async function sendContactToHubspot(contact: Contact) {
  const token = process.env.HUBSPOT_TOKEN;
  if (!token) throw new Error('HUBSPOT_TOKEN env required');

  const url = 'https://api.hubapi.com/crm/v3/objects/contacts';
  const properties: any = {
    email: contact.email,
    firstname: contact.firstname,
    lastname: contact.lastname,
  };
  if (contact.gender) properties['gender'] = contact.gender;

  const resp = await axios.post(url, { properties }, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return resp.data;
}
