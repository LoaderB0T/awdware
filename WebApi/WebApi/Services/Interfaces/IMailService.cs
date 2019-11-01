using System.Net.Mail;

namespace WebApi.Services
{
    public interface IMailService
    {
        bool Send(MailMessage mail);
    }
}
