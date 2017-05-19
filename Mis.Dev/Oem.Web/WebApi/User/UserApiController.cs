using Microsoft.AspNetCore.Mvc;
using Oem.Data.Enum;
using Oem.Models.Response;
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
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public Response<UserResponse> Get(int id)
        {
            var serviceResult = UserService.GetUser(id).Data;
            var userFunctions = new[] {AuthorityEnum.Employee};
            UserResponse userResponse = new UserResponse
            {
                Id = serviceResult.Id,
                UserName = serviceResult.UserName,
                UserFunction = userFunctions
            };
            return new Response<UserResponse>(userResponse);
        }
    }
}