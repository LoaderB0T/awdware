﻿using System;
using Awdware.Core.Business.Utils.Models;
using Awdware.Core.Data.Facade.Entities;

namespace Awdware.Core.Data.Implementation.Repositories
{
    public interface IUserRepository
    {
        WebUser GetUserById(string userId);
        WebUser TryGetUserByName(string username);
        WebUser TryGetUserByEmail(string email);
        bool ValidatePassword(WebUser user, string password);
        bool CheckIfUsernameExists(string username);
        bool CheckIfEmailExists(string email);
        bool AddUser(WebUser user);
        bool UpdatePassword(string token, string newPassword);
        bool AddConfirmationKey(WebUser user, string key, ConfirmType type, DateTime? expiration = null);
        ConfirmKeyUsageResult TryUseConfirmationLink(string key, ConfirmType type);
        bool UserHasConfirmedEmail(string userId);
        void SetMailConfirmed(string userId, bool isConfirmed = true);
    }
}
