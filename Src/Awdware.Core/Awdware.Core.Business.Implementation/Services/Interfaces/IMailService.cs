using System.Net.Mail;

namespace Awdware.Core.Business.Implementation.Services
{
    public interface IMailService
    {
        bool Send(MailMessage mail);
    }
}
