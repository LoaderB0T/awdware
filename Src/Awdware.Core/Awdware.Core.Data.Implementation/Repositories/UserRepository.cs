using System;
using System.Linq;
using Awdware.Core.Business.Utils;
using Awdware.Core.Business.Utils.Models;
using Awdware.Core.Data.Facade.Entities;
using Awdware.Core.Data.Implementation.Contexts;
using Awdware.Core.Infrastructure.Helper;

namespace Awdware.Core.Data.Implementation.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AwdwareCoreDbContext _awdwareCoreDbContext;

        public UserRepository(AwdwareCoreDbContext awdwareCoreDbContext)
        {
            _awdwareCoreDbContext = awdwareCoreDbContext;
        }

        public WebUser GetUserById(string userId)
        {
            var userId2 = userId;
            var user = _awdwareCoreDbContext.WebUser.Single(x => x.UserId == userId2);
            return user;
        }

        public WebUser TryGetUserByName(string username)
        {
            var user = _awdwareCoreDbContext.WebUser.FirstOrDefault(x => x.Username.ToUpper() == username.ToUpper());
            return user;
        }

        public WebUser TryGetUserByEmail(string email)
        {
            var user = _awdwareCoreDbContext.WebUser.FirstOrDefault(x => x.Email.ToUpper() == email.ToUpper());
            return user;
        }

        public bool ValidatePassword(WebUser user, string password)
        {
            if (user == null)
                return false;
            return PasswordHasher.Verify(password, user.PasswordHash);
        }

        public bool CheckIfUsernameExists(string username)
        {
            var exists = _awdwareCoreDbContext.WebUser.Any(x => x.Username.ToUpper() == username.ToUpper());
            return exists;
        }

        public bool CheckIfEmailExists(string email)
        {
            var exists = _awdwareCoreDbContext.WebUser.Any(x => x.Email.ToUpper() == email.ToUpper());
            return exists;
        }

        public bool AddUser(WebUser user)
        {
            try
            {
                _awdwareCoreDbContext.WebUser.Add(user);
                _awdwareCoreDbContext.SaveChanges();
                return true;
            }
            catch (Exception exception)
            {
                Logger.LogError(exception, "Could not add user {user} to database.", user);
                return false;
            }
        }

        public bool AddConfirmationKey(WebUser user, string key, ConfirmType type, DateTime? expiration = null)
        {
            if (user == null || string.IsNullOrEmpty(key))
                return false;
            Confirmationkey confirm = new Confirmationkey
            {
                UserId = user.UserId,
                KeyString = key,
                ConfirmType = type,
                Expiration = expiration
            };

            if (_awdwareCoreDbContext.UserConfirmations.Any(x => (x.UserId == confirm.UserId && x.ConfirmType == confirm.ConfirmType)))
            {
                throw new InvalidOperationException("The confirm key already exists");
            }
            else
            {
                _awdwareCoreDbContext.UserConfirmations.Add(confirm);
            }

            _awdwareCoreDbContext.SaveChanges();
            return true;
        }


        public bool UserHasConfirmedEmail(string userId)
        {
            return !_awdwareCoreDbContext.UserConfirmations.Any(x => (x.UserId == userId && x.ConfirmType == ConfirmType.EmailConfirmation));
        }

        public bool ConfirmationLinkExists(string link, ConfirmType type)
        {
            return _awdwareCoreDbContext.UserConfirmations.Any(
                x => (x.KeyString == link && x.ConfirmType == type));
        }

        public bool ConfirmationLinkIsValid(string link, ConfirmType type)
        {
            Confirmationkey confirm = _awdwareCoreDbContext.UserConfirmations.First(
                x => (x.KeyString == link && x.ConfirmType == type));
            return confirm.Expiration > DateTime.Now;
        }


        public ConfirmKeyUsageResult TryUseConfirmationLink(string key, ConfirmType type)
        {
            var res = new ConfirmKeyUsageResult();
            var confirmKey = _awdwareCoreDbContext.UserConfirmations.FirstOrDefault(x => (x.KeyString == key && x.ConfirmType == type));

            if (confirmKey == null)
            {
                res.Success = ConfirmKeyUsageSuccess.UnknownError;
                return res;
            }

            _awdwareCoreDbContext.UserConfirmations.Remove(confirmKey);
            _awdwareCoreDbContext.SaveChanges();

            if (confirmKey.Expiration > DateTime.Now)
            {
                res.Success = ConfirmKeyUsageSuccess.Success;
                res.WebUser = GetUserById(confirmKey.UserId);
                return res;
            }
            else
            {
                res.Success = ConfirmKeyUsageSuccess.ExpiredKey;
                return res;
            }
        }

        public bool UpdatePassword(string token, string newPassword)
        {
            var confirmKeyResult = TryUseConfirmationLink(token, ConfirmType.PasswordReset);

            if (confirmKeyResult.Success != ConfirmKeyUsageSuccess.Success)
            {
                return false;
            }

            var user = confirmKeyResult.WebUser;
            user.PasswordHash = newPassword;
            _awdwareCoreDbContext.WebUser.Update(user);
            _awdwareCoreDbContext.SaveChanges();

            return true;
        }

        public void SetMailConfirmed(string userId, bool isConfirmed = true)
        {
            var user = GetUserById(userId);
            user.ConfirmedMail = isConfirmed;
            _awdwareCoreDbContext.WebUser.Update(user);
            _awdwareCoreDbContext.SaveChanges();
        }
    }
}
