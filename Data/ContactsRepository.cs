using Contact_App.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Contact_App.Data
{
    public class ContactsRepository : IContactsRepository
    {
        private readonly ContactAppContext _ctx;

        public ContactsRepository(ContactAppContext ctx)
        {
            _ctx = ctx;
        }
        public void AddEntity(Contact contact)
        {
            _ctx.Add(contact);
        }

        public void DeleteContactById(Guid id)
        {
            var contact = _ctx.Contacts.FirstOrDefault(c => c.Id == id);
            if (contact!=null)
            {
                _ctx.Contacts.Remove(contact);
            }
        }

        public IEnumerable<Contact> GetAllContacts()
        {
            try
            {
                return _ctx.Contacts.ToList();
            }
            catch (Exception ex)
            {

                return null;
            }
        }

        public Contact GetContactById(Guid id)
        {
            return _ctx.Contacts.FirstOrDefault(c => c.Id == id);
        }

        public bool SaveAll()
        {
            return _ctx.SaveChanges() > 0;
        }
    }
}
