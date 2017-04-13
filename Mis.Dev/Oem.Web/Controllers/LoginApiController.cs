using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.Authentication;
using Microsoft.AspNetCore.Mvc;
using Oem.Data.Enum;
using Oem.Models.Request.Home;
using Oem.Models.Response;
using Oem.Models.Response.Home;

namespace Oem.Web.Controllers
{
    [Route("api/[Controller]")]
    public class LoginApiController : Controller
    {
        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<Response<LoginResponse>> Post(LoginRequest req)
        {
            //设置Identity
            var identity = new ClaimsIdentity(@"OemMis");
            identity.AddClaim(new Claim(ClaimTypes.Sid, @"1110"));
            identity.AddClaim(new Claim(ClaimTypes.Rsa, @"password"));
            identity.AddClaim(new Claim(ClaimTypes.Name, Convert.ToString(@"success")));
            var userClaimsPrincipal = new ClaimsPrincipal(identity);
            await HttpContext.Authentication.SignInAsync("OemMis", userClaimsPrincipal,
                new AuthenticationProperties {IsPersistent = true});

            return new Response<LoginResponse>(ErrorTypeEnum.NoError,
                new LoginResponse {UserId = 1, UserName = "anbgsl1110"});
        }
    }
}
