using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Oem.Common.CacheHelper;
using Oem.Services.IServices.User;

namespace Oem.Web.WebApi.Home
{
    /// <summary>
    /// 获取页面时间和本地时间差
    /// </summary>
    public class TimeDvalueApiController : ApiBaseController
    {
        [HttpGet("{clientTime}")]
        public long Get(long clientTime)
        {
            return HomeService.GetTimeDvalue(clientTime).Data;
        }

        public TimeDvalueApiController(ICacheService cacheService) : base(cacheService)
        {
        }
    }
}