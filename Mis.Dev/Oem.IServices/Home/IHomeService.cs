using System;
using System.Collections.Generic;
using System.Text;

namespace Oem.IServices.Home
{
    public interface IHomeService
    {
        /// <summary>
        /// 获取页面时间和本地时间差
        /// </summary>
        /// <param name="clientTime">页面时间</param>
        /// <returns>时间差值</returns>
        long GetTimeDvalue(long clientTime);
    }
}
