using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Oem.Models.Item;

namespace Oem.Web.WebApi
{
    [Route("api/[Controller]")]
    public class ApiBaseController : Controller
    {
        protected LoginUserInfo GetLoginUserInfo()
        {
            return new LoginUserInfo { UserId = 1110, UserName = "anbgsl1110" };
        }
    }
}
