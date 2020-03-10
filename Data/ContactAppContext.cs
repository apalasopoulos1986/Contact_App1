using Contact_App.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Contact_App.Data
{
    public class ContactAppContext:DbContext
    {
        public ContactAppContext(DbContextOptions<ContactAppContext> options):base(options)
        {

        }
       public DbSet<Contact> Contacts { get; set; }

    }
}
