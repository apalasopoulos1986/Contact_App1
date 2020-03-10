using Contact_App.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Contact_App.Data
{
    public interface IContactsRepository
    {
        #region CRUD Interface  
        IEnumerable<Contact> GetAllContacts();
        void AddEntity(Contact contact);
        bool SaveAll();
        Contact GetContactById(Guid id);
        void DeleteContactById(Guid id);
        #endregion
    }
}
