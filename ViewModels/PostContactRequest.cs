using DataAnnotationsExtensions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Contact_App.ViewModels
{
    public class PostContactRequest:IValidatableObject
    {
        [Required]
        public string Name { get; set; }
        [Required]

        public string Surname { get; set; }
        [Required]
        [Email]
        public string Email { get; set; }
        public string Address { get; set; }
        [Phone]

        [MinLength(10, ErrorMessage = "Minimum length=10 digits")]
        [MaxLength(14, ErrorMessage = "Maximum length=14 digits")]
        public string FixedPhone { get; set; }
        [Phone]

        [MinLength(10, ErrorMessage = "Minimum length=10 digits")]
        [MaxLength(14, ErrorMessage = "Maximum length=14 digits")]
        public string MobilePhone { get; set; }
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var addr = new System.Net.Mail.MailAddress(Email);
            if (addr.Address != Email)
            {
                yield return new ValidationResult(
                    $"This is not a valid email address ",
                    new[] { nameof(Email) });
            }

            string phoneRegex = "^[0-9]{10,14}$";
            if (!string.IsNullOrEmpty(FixedPhone))
            {
                if (!Regex.Match(FixedPhone, phoneRegex).Success)
                {
                    yield return new ValidationResult(
                       $"This is not a valid fixed phone ",
                       new[] { nameof(FixedPhone) });
                }
            }
           

            if (!Regex.Match(MobilePhone, phoneRegex).Success)
            {
                yield return new ValidationResult(
                   $"This is not a valid mobile phone ",
                   new[] { nameof(MobilePhone) });
            }
        }
    }
}
