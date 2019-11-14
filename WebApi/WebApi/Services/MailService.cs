using Microsoft.Extensions.Configuration;
using System;
using System.Net.Mail;
using WebApi.Helper;

namespace WebApi.Services
{
    public class MailService : IMailService, IDisposable
    {
        private readonly IConfiguration _configuration;
        private SmtpClient _smtp;

        public MailService(IConfiguration configuration)
        {
            _configuration = configuration;
            Init();
        }

        private void Init()
        {
            var config = _configuration.GetSection("Mail");

            _smtp = new SmtpClient
            {
                Host = config.GetValue<string>("Host"),
                Port = config.GetValue<int>("Port"),
                Timeout = config.GetValue<int>("Timeout"),
                Credentials = new System.Net.NetworkCredential(config.GetValue<string>("login_address"), config.GetValue<string>("login_pw")),

                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network
            };
        }

        public bool Send(MailMessage mail)
        {
            try
            {
                _smtp.Send(mail);
                return true;
            }
            catch (Exception)
            {
                Logger.LogError("Failed to send mail", mail, _smtp);
                return false;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            this._smtp.Dispose();
        }
    }
}
