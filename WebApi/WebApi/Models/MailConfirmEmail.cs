using WebApi.Static;

namespace WebApi.Models
{
    public class MailConfirmEmail
    {
        public StaticEnums Type { get; set; }
        public string To { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Link { get; set; }
        public string Username { get; set; }
    }
}
