using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Static;

namespace WebApi.Models
{
    public class MailConfirmEmail
    {
        public EmailType Type { get; set; }
        public string To { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Link { get; set; }
        public string Username { get; set; }
    }
}
