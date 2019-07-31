﻿using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using WebApi.Contexts;
using WebApi.Entities;
using WebApi.Entities.Enums;
using WebApi.Static;
using WebApi.Models.Enums;
using WebApi.Models;

namespace WebApi.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ILogger _logger;
        private readonly ApplicationDbContext _webShopDBContext;

        public UserRepository(ApplicationDbContext webShopDBContext, ILogger<UserRepository> logger)
        {
            _webShopDBContext = webShopDBContext;
            _logger = logger;
        }

        public WebUser GetUserById(string userId)
        {
            var user = _webShopDBContext.WebUser.First(x => x.UserId == userId);
            return user;
        }

        public WebUser TryGetUserByName(string username)
        {
            var user = _webShopDBContext.WebUser.FirstOrDefault(x => x.Username.ToLower() == username.ToLower());
            return user;
        }

        public WebUser TryGetUserByEmail(string email)
        {
            var user = _webShopDBContext.WebUser.FirstOrDefault(x => x.Email.ToLower() == email.ToLower());
            return user;
        }

        public bool ValidatePassword(WebUser user, string password)
        {
            return PasswordHasher.Verify(password, user.PasswordHash);
        }

        public bool CheckIfUsernameExists(string username)
        {
            var exists = _webShopDBContext.WebUser.Any(x => x.Username.ToLower() == username.ToLower());
            return exists;
        }

        public bool CheckIfEmailExists(string email)
        {
            var exists = _webShopDBContext.WebUser.Any(x => x.Email.ToLower() == email.ToLower());
            return exists;
        }

        public bool AddUser(WebUser user)
        {
            try
            {
                _webShopDBContext.WebUser.Add(user);
                _webShopDBContext.SaveChanges();
                return true;
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Could not add user {user} to database.", user);
                return false;
            }
        }

        public bool AddConfirmationKey(WebUser user, string key, ConfirmType type, DateTime? expiration = null)
        {
            Confirmationkey confirm = new Confirmationkey
            {
                UserId = user.UserId,
                KeyString = key,
                ConfirmType = type,
                Expiration = expiration
            };

            if (_webShopDBContext.UserConfirmation.Any(x => (x.UserId == confirm.UserId && x.ConfirmType == confirm.ConfirmType)))
            {
                throw new InvalidOperationException("The confirm key already exists");
            }
            else
            {
                _webShopDBContext.UserConfirmation.Add(confirm);
            }

            _webShopDBContext.SaveChanges();
            return true;
        }


        public bool UserHasConfirmedEmail(string userId)
        {
            return !_webShopDBContext.UserConfirmation.Any(x => (x.UserId == userId && x.ConfirmType == ConfirmType.EmailConfirmation));
        }

        public bool ConfirmationLinkExists(string link, ConfirmType type)
        {
            return _webShopDBContext.UserConfirmation.Any(
                x => (x.KeyString == link && x.ConfirmType == type));
        }

        public bool ConfirmationLinkIsValid(string link, ConfirmType type)
        {
            Confirmationkey confirm = _webShopDBContext.UserConfirmation.First(
                x => (x.KeyString == link && x.ConfirmType == type));
            return confirm.Expiration > DateTime.Now;
        }


        public ConfirmKeyUsageResult TryUseConfirmationLink(string key, ConfirmType type)
        {
            var res = new ConfirmKeyUsageResult();
            var confirmKey = _webShopDBContext.UserConfirmation.FirstOrDefault(x => (x.KeyString == key && x.ConfirmType == type));

            if (confirmKey == null)
            {
                res.Success = ConfirmKeyUsageSuccess.UNKNOWN_KEY;
                return res;
            }

            _webShopDBContext.UserConfirmation.Remove(confirmKey);
            _webShopDBContext.SaveChanges();

            if (confirmKey.Expiration > DateTime.Now)
            {
                res.Success = ConfirmKeyUsageSuccess.SUCESS;
                res.WebUser = GetUserById(confirmKey.UserId);
                return res;
            }
            else
            {
                res.Success = ConfirmKeyUsageSuccess.EXPIRED_KEY;
                return res;
            }
        }

        public bool UpdatePassword(string token, string newPassword)
        {
            var confirmKeyResult = TryUseConfirmationLink(token, ConfirmType.PasswordReset);

            if (confirmKeyResult.Success != ConfirmKeyUsageSuccess.SUCESS)
            {
                return false;
            }

            var user = confirmKeyResult.WebUser;
            user.PasswordHash = newPassword;
            _webShopDBContext.WebUser.Update(user);
            _webShopDBContext.SaveChanges();

            return true;
        }

        public void SetMailConfirmed(string userId, bool isConfirmed = true)
        {
            var user = GetUserById(userId);
            user.ConfirmedMail = isConfirmed;
            _webShopDBContext.WebUser.Update(user);
            _webShopDBContext.SaveChanges();
        }
    }
}
