using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyModel.Resolution;
using Oem.Common.CacheHelper;
using Oem.Models.Response;
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
        public readonly IHomeService HomeService;        
        
        public readonly ICacheService CacheService;
        
        public readonly ICurrentUser CurrentUser;

        public ApiBaseController(ICacheService cacheService)
        {
            HomeService = new HomeService();
            CacheService = cacheService;
            CurrentUser = new CurrentUser(CacheService);
        }

        /// <summary>
        /// 当前用户
        /// </summary>
        /// <returns></returns>
        public Response<ICurrentUser> Get()
        {
            return new Response<ICurrentUser>(CurrentUser);
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

