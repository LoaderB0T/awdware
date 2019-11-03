using WebApi.Helper;

namespace WebApi.Models
{
    public class MailConfirmEmail
    {
        public EmailKind Type { get; set; }
        public string To { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Link { get; set; }
        public string Username { get; set; }
    }
}
