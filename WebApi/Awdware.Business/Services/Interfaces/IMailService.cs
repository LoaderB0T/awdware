using System.Net.Mail;

namespace Awdware.Business.Implementation.Services
{
    public interface IMailService
    {
        bool Send(MailMessage mail);
    }
}
