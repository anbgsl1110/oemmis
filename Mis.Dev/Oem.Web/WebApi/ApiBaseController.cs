using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.ProjectModel.Resolution;
using Oem.IServices;
using Oem.IServices.Home;
using Oem.Models.Item;
using Oem.Services.Home;

namespace Oem.Web.WebApi
{
    [Route("api/[Controller]")]
    public class ApiBaseController : Controller
    {
        protected readonly IHomeService HomeService;

        public ApiBaseController()
        {
            HomeService = new HomeService();
        }

        /// <summary>
        /// 登录用户信息
        /// </summary>
        /// <returns></returns>
        protected LoginUserInfo GetLoginUserInfo()
        {
            return new LoginUserInfo { UserId = 1110, UserName = "anbgsl1110" };
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

