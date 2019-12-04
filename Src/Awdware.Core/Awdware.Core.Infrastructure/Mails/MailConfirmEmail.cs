using Awdware.Core.Infrastructure.Helper;

namespace Awdware.Core.Infrastructure.Mails
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
