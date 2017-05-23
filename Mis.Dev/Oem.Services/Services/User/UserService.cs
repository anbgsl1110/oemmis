using System.Collections.Generic;
using Oem.Data.Enum;
using Oem.Data.ServiceModel;
using Oem.Data.ServiceModel.UserDto;
using Oem.Models.Item.Home;
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

        public ServiceResult<ServiceStateEnum, LoginUserInfo> Login(string userName, string password)
        {
            var loginUser = UserProvider.Login(userName, password);
            if (loginUser != null)
            {
                LoginUserInfo data = new LoginUserInfo
                {
                    UserId = loginUser.Id,
                    UserName = loginUser.UserName,
                    UserAuthority = new AuthorityEnum[]{}
                };
                return ServiceResult.Create(ServiceStateEnum.Success, data);
            }
            return ServiceResult.Create(false, ServiceStateEnum.Failed, new LoginUserInfo());
        }
        
        public ServiceResult<ServiceStateEnum, T> Select<T>(T t, long id)
        {
            var result = UserProvider.Select(t, id);
            return new ServiceResult<ServiceStateEnum, T> {State = ServiceStateEnum.Success, Data = result};
        }

        public ServiceResult<ServiceStateEnum, IEnumerable<T>> Select<T>(T t, long pageIndex, long pageSize)
        {
            var result = UserProvider.Select(t, pageIndex, pageSize);
            return new ServiceResult<ServiceStateEnum, IEnumerable<T>>
            {
                State = ServiceStateEnum.Success,
                Data = result
            };
        }

        public ServiceResult<ServiceStateEnum, IEnumerable<T>> Select<T>(IDictionary<string, object> parameters)
        {
            var result = UserProvider.Select<T>(parameters);
            return new ServiceResult<ServiceStateEnum, IEnumerable<T>>
            {
                State = ServiceStateEnum.Success,
                Data = result
            };
        }

        public ServiceResult<ServiceStateEnum> Insert<T>(T t)
        {
            UserProvider.Insert(t);
            return new ServiceResult<ServiceStateEnum>();
        }

        public ServiceResult<ServiceStateEnum, int> InsertWithIdentity<T>(T t)
        {
            var result = UserProvider.InsertWithIdentity(t);
            return new ServiceResult<ServiceStateEnum, int>
            {
                State = ServiceStateEnum.Success,
                Data = result
            };
        }

        public ServiceResult<ServiceStateEnum> Delete<T>(T t, long id)
        {
            UserProvider.Delete(t,id);
            return new ServiceResult<ServiceStateEnum>();
        }

        public ServiceResult<ServiceStateEnum> Update<T>(T t)
        {
            UserProvider.Update(t);
            return new ServiceResult<ServiceStateEnum>();
        }
    }
}