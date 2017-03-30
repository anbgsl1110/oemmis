using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;

namespace Oem.Web.WebApi.Home
{
    /// <summary>
    /// 获取页面时间和本地时间差
    /// </summary>
    public class TimeDvalueApiController : ApiBaseController
    {
        public long Get(long clientTime)
        {
            return HomeService.GetTimeDvalue(clientTime);
        }
    }
}