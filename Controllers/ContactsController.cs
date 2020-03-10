using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Contact_App.Data;
using Contact_App.Data.Entities;
using Contact_App.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Contact_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {

        #region Interface Implementation For Contacts Repository  
        private readonly IContactsRepository _contactsRepository;
        public ContactsController(IContactsRepository contactsRepository)
        {
            _contactsRepository = contactsRepository;
        }
        #endregion
        #region Get Method For Contacts      
        [HttpGet]
        public ActionResult<IEnumerable<Contact>> Get()
        {
            try
            {
                var results = _contactsRepository.GetAllContacts();
                if (results != null)
                {
                    return Ok(results);
                }

            }
            catch (Exception ex)
            {

                return BadRequest($"Failed to get contacts: {ex}");
            }
            return NotFound();
        }
        #endregion
        #region Create Method For Contacts


        [HttpPost]
        public ActionResult Post([FromBody] PostContactRequest contactViewModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newContact = new Contact();
                    newContact.Id = Guid.NewGuid();
                    newContact.Name = contactViewModel.Name;
                    newContact.Surname = contactViewModel.Surname;
                    newContact.Email = contactViewModel.Email;
                    newContact.Address = contactViewModel.Address;
                    newContact.FixedPhone = contactViewModel.FixedPhone;
                    newContact.MobilePhone = contactViewModel.MobilePhone;
                    _contactsRepository.AddEntity(newContact);
                    if (_contactsRepository.SaveAll())
                    {
                        return Created($"api/contacts/{newContact.Id}", newContact);
                    }
                }

            }
            catch (Exception ex)
            {

                return BadRequest($"Failed to create new contact: {ex}");
            }
            return BadRequest("Failed to create new contact");
        }
        #endregion
        #region Delete Method For Contacts


        [HttpDelete("{id:guid}")]
        public ActionResult Delete(Guid id)
        {
            try
            {
                var contact = _contactsRepository.GetContactById(id);
                if (contact == null)
                {
                    return BadRequest("Failed to delete contact");
                }
                _contactsRepository.DeleteContactById(id);
                if (_contactsRepository.SaveAll())
                {
                    return NoContent();
                }

            }
            catch (Exception ex)
            {

                return BadRequest($"Failed to delete contact: {ex}");
            }
            return BadRequest($"Failed to delete contact");
        }
        #endregion
        #region Update Method For Contacts        
        [HttpPut("{id:guid}")]
        public ActionResult Put(Guid id, [FromBody] PutContactRequest putContactRequest)
        {
            try
            {
                if (ModelState.IsValid)
                {


                    var oldContact = _contactsRepository.GetContactById(id);
                    if (oldContact == null)
                    {
                        return BadRequest("There is no contact to update");
                    }

                    oldContact.Name = putContactRequest.Name;
                    oldContact.Surname = putContactRequest.Surname;
                    oldContact.Email = putContactRequest.Email;
                    oldContact.Address = putContactRequest.Address;
                    oldContact.FixedPhone = putContactRequest.FixedPhone;
                    oldContact.MobilePhone = putContactRequest.MobilePhone;

                    if (_contactsRepository.SaveAll())
                    {
                        return Ok();
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to update contact: {ex}");

            }
            return BadRequest("Failed to update contact");
        }
        #endregion
    }
}