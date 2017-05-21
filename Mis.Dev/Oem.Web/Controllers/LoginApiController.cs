 using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.Authentication;
using Microsoft.AspNetCore.Mvc;
 using Microsoft.Extensions.Caching.Memory;
 using Oem.Common.CacheHelper;
 using Oem.Data.Enum;
 using Oem.Data.Table.SysSetting;
 using Oem.Models.Request.Home;
using Oem.Models.Response;
using Oem.Models.Response.Home;
 using Oem.Services.Services.User;
 using Oem.Web.Security;
 using Oem.Web.WebApi;

namespace Oem.Web.Controllers
{
    public class LoginApiController : ApiBaseController
    {
        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<Response<LoginResponse>> Post(LoginRequest req)
        {
            //验证并获取登录用户信息
            UserService userService = new UserService();
            var loginUser = userService.Login(req.UserName, req.Password).Data;            
            
            //设置Identity
            var identity = new ClaimsIdentity(@"OemMis");
            identity.AddClaim(new Claim(ClaimTypes.Sid, @"1110"));
            identity.AddClaim(new Claim(ClaimTypes.Rsa, @"password"));
            identity.AddClaim(new Claim(ClaimTypes.Name, Convert.ToString(@"success")));
            var userClaimsPrincipal = new ClaimsPrincipal(identity);
            await HttpContext.Authentication.SignInAsync(@"OemMis", userClaimsPrincipal,
                new AuthenticationProperties {IsPersistent = false});

            //把登录数据放入缓存
            CurrentUser currentUser = new CurrentUser(CacheService);

            if (loginUser != null)
            {
                loginUser.OrgId = 1;
                loginUser.UserAuthority = new[]{AuthorityEnum.Employee};
                loginUser.UserRole = new []{new RoleRepo()};
                currentUser.SetCurrentUserInfo(loginUser.UserId, loginUser.UserName, loginUser.OrgId,
                    loginUser.UserAuthority, loginUser.UserRole);
                
                return new Response<LoginResponse>(ErrorTypeEnum.NoError,
                    new LoginResponse
                    {
                        UserId = loginUser.UserId, 
                        UserName = loginUser.UserName
                    });
            }
            return new Response<LoginResponse>(ErrorTypeEnum.Error,null);
        }

    }
}
