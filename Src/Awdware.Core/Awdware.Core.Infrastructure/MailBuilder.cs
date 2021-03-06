﻿using Microsoft.Extensions.Configuration;
using System;
using System.Net.Mail;
using Awdware.Core.Infrastructure.Mails;
using System.Reflection;
using System.IO;

namespace Awdware.Core.Infrastructure.Helper
{
    public class MailBuilder : IDisposable
    {
        private MailMessage _message;
        private readonly IConfiguration _configuration;
        private string _body;

        public MailBuilder(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private void Init(MailAddress From, MailAddress To)
        {
            _message = new MailMessage(From, To)
            {
                IsBodyHtml = true
            };
        }

        private MailAddress GetFrom()
        {
            var _config = _configuration.GetSection("Mail");
            return new MailAddress(_config.GetValue<string>("Email"), _config.GetValue<string>("DisplayName"));
        }

        private bool LoadTemplate(EmailKind type)
        {
            var config = _configuration.GetSection("Mail");
            string path;
            switch (type)
            {
                case EmailKind.EmailConfirmation:
                    path = config.GetSection("Template").GetValue<string>("EmailConfirm");
                    _message.Subject = config.GetSection("Subject").GetValue<string>("EmailConfirm");
                    break;
                case EmailKind.PasswordReset:
                    path = config.GetSection("Template").GetValue<string>("PasswordReset");
                    _message.Subject = config.GetSection("Subject").GetValue<string>("PasswordReset");
                    break;
                case EmailKind.PasswordResetNoUser:
                    path = config.GetSection("Template").GetValue<string>("PasswordResetNoUser");
                    _message.Subject = config.GetSection("Subject").GetValue<string>("PasswordReset");
                    break;
                case EmailKind.ForgotUsername:
                    path = config.GetSection("Template").GetValue<string>("ForgotUsername");
                    _message.Subject = config.GetSection("Subject").GetValue<string>("ForgotUsername");
                    break;
                default:
                    throw new NotImplementedException();
            }
            var assemblyPath = Assembly.GetExecutingAssembly().Location;
            var assemblyDirectory = Directory.GetParent(assemblyPath);
            _body = File.ReadAllText(assemblyDirectory.FullName + '\\' + path);
            return _body.Length > 0;
        }

        public MailMessage CreateMailConfirmEmail(MailConfirmEmail model)
        {
            if (model == null)
                return null;
            Init(GetFrom(), new MailAddress(model.To, model.FirstName + model.LastName));
            if (!LoadTemplate(model.Type))
                throw new InvalidOperationException("Mail template not found.");
            ReplaceInTemplate("FirstName", model.FirstName);
            ReplaceInTemplate("LastName", model.LastName);
            if (!string.IsNullOrEmpty(model.Link))
                ReplaceInTemplate("ConfirmLink", model.Link);
            if (!string.IsNullOrEmpty(model.Username))
                ReplaceInTemplate("Username", model.Username);
            _message.Body = _body;
            return _message;
        }

        public MailMessage CreateUserDoesNotExistMail(string email)
        {
            Init(GetFrom(), new MailAddress(email));
            if (!LoadTemplate(EmailKind.PasswordResetNoUser))
                throw new InvalidOperationException("Mail template not found.");
            _message.Body = _body;
            return _message;
        }

        private void ReplaceInTemplate(string key, string value)
        {
            _body = _body.Replace("{{" + key + "}}", value, StringComparison.InvariantCultureIgnoreCase);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            _message.Dispose();
        }
    }
}
