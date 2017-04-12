﻿using Oem.Data.Enum;
using Oem.Data.Service;
using Oem.Data.Service.UserDto;
using Oem.Services.IServices.User;

namespace Oem.Services.Services.User
{
    /// <summary>
    /// 用户服务
    /// </summary>
    public class UserService : BaseService,IUserService
    {
        public ServiceResult<ServiceStateEnum, UserDto> GetUser(long userId)
        {
            var user = UserProvider.GetUser(userId);
            if (user != null)
            {
                UserDto data = new UserDto
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Password = user.Password
                };
                return ServiceResult.Create(ServiceStateEnum.Success, data);
            }
            return ServiceResult.Create(false, ServiceStateEnum.Failed, new UserDto());
        }

        public ServiceResult<ServiceStateEnum, FormsAuthTicketDto> DecryptCookie(string cookie)
        {
            throw new System.NotImplementedException();
        }
    }
}