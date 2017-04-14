using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.ProjectModel.Resolution;
using Oem.Models.Item;
using Oem.Services.IServices.Home;
using Oem.Services.IServices.User;
using Oem.Services.Services.Home;
using Oem.Services.Services.User;
using Oem.Web.Security;

namespace Oem.Web.WebApi
{
    [Route("api/[Controller]")]
    public class ApiBaseController : Controller
    {
        protected readonly ICurrentUser CurrentUser;

        protected readonly IHomeService HomeService;

        protected readonly IUserService UserService;

        public ApiBaseController()
        {
            CurrentUser = new CurrentUser();
            HomeService = new HomeService();
            UserService = new UserService();
        }

        #region WebApi Restful例子
        //// GET api/values
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET api/values/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/values
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT api/values/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/values/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
        #endregion
    }
}

