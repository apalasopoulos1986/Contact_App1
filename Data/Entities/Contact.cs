using DataAnnotationsExtensions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Contact_App.Data.Entities
{
    public class Contact
    {
        #region Variables of Entity
        public Guid Id { get; set;  }
       
       
        public string Name { get; set; }
        
        public string Surname { get; set; }
       
        public string Email { get; set; } 
        public string Address { get; set; }
       
        public string FixedPhone { get; set; }
       
        public  string MobilePhone { get; set; }
        #endregion
    }
}
