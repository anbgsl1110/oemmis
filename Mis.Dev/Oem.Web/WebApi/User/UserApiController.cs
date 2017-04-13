using Oem.Models.Response.User;

namespace Oem.Web.WebApi.User
{
    /// <summary>
    /// 用户信息
    /// </summary>
    public class UserApiController : ApiBaseController
    {
        /// <summary>
        /// 获取用户信息
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public UserResponse Get(int userId)
        {
            var serviceResult = UserService.GetUser(userId).Data;
            UserResponse userResponse = new UserResponse
            {
                Id = serviceResult.Id,
                UserName = serviceResult.UserName
            };
            var x = CurrentUser.UserId;
            return userResponse;
        }
    }
}