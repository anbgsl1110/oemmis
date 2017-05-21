using Microsoft.AspNetCore.Mvc;
using Oem.Common.CacheHelper;
using Oem.Data.Enum;
using Oem.Models.Response;
using Oem.Models.Response.User;
using Oem.Services.IServices.User;

namespace Oem.Web.WebApi.User
{
    /// <summary>
    /// 用户信息
    /// </summary>
    public class UserApiController : ApiBaseController
    {
        /// <summary>
        /// 用户服务
        /// </summary>
        public IUserService UserService { get; set; }

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

        public UserApiController(ICacheService cacheService,
            [FromServices] IUserService userService) : base(cacheService)
        {
            UserService = userService;
        }
    }
}