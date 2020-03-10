using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Contact_App.Data
{
    public class ContactsSeeder
    {
        private readonly ContactAppContext _ctx;
        public ContactsSeeder(ContactAppContext ctx)
        {
            _ctx = ctx;
        }

        //used to ensure creation of Database
        public void Seed()
        {
            _ctx.Database.EnsureCreated();
        }
    }
}
