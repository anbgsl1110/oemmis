using System;
using System.Collections.Generic;
using System.Text;
using Oem.IServices.Home;

namespace Oem.Services.Home
{
    public class HomeService : IHomeService
    {
        /// <summary>
        /// 获取页面时间和本地时间差
        /// </summary>
        /// <param name="clientTime">页面时间</param>
        /// <returns>时间差值</returns>
        public long GetTimeDvalue(long clientTime)
        {
            long serviceTime = (DateTime.Now.ToUniversalTime().Ticks - 621355968000000000) / 100000;
            return serviceTime - clientTime - 500;
        }
    }
}
