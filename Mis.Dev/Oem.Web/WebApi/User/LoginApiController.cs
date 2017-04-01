using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Oem.Data.Enum;
using Oem.Data.Table;
using Oem.Models.Request.Home;
using Oem.Models.Response;
using Oem.Models.Response.Home;

namespace Oem.Web.WebApi.User
{
    public class LoginApiController : ApiBaseController
    {
        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        [HttpPost]
        public Response<LoginResponse> Post(LoginRequest req)
        {
            return new Response<LoginResponse>(ErrorTypeEnum.NoError,
                new LoginResponse {UserId = 2, UserName = "anbgsl1110"});
        }
    }
}
