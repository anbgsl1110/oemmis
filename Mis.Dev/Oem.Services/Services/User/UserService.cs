using Oem.Data.Enum;
using Oem.Models.Service;
using Oem.Models.Service.UserDto;
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
            UserDto data = new UserDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Password = user.Password
            };
            return ServiceResult.Create(ServiceStateEnum.Success,data);
        }
    }
}