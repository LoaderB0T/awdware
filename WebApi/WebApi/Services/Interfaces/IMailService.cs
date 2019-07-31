using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace WebApi.Services
{
    public interface IMailService
    {
        bool Send(MailMessage mail);
    }
}
