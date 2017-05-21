using Oem.Data.Enum;
using Oem.Data.ServiceModel;
using Oem.Data.ServiceModel.UserDto;
using Oem.Models.Item.Home;

namespace Oem.Services.IServices.User
{
    /// <summary>
    /// 用户服务接口
    /// </summary>
    public interface IUserService
    {
        /// <summary>
        /// 获取用户信息
        /// </summary>
        /// <param name="userId">用户Id</param>
        /// <returns></returns>
        ServiceResult<ServiceStateEnum, UserDto> GetUser(long userId);

        /// <summary>
        /// 身份认证
        /// </summary>
        /// <param name="cookie"></param>
        /// <returns></returns>
        ServiceResult<ServiceStateEnum, FormsAuthTicketDto> DecryptCookie(string cookie);
        
        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        ServiceResult<ServiceStateEnum, LoginUserInfo> Login(string userName,string password);
    }
}