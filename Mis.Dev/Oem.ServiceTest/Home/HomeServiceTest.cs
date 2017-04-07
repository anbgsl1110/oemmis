using System;
using System.Collections.Generic;
using System.Text;
using Oem.Services.IServices.Home;
using Oem.Services.Services.Home;
using Xunit;

namespace Oem.ServiceTest.Home
{
    /// <summary>
    /// HomeService单元测试
    /// </summary>
    public class HomeServiceTest
    {
        //home服务对象
        private readonly IHomeService _homeService = new HomeService();

        /// <summary>
        /// 获取页面时间和本地时间差单元测试
        /// </summary>
        [Fact]
        public void GetTimeDvalue()
        {
            var result = _homeService.GetTimeDvalue(100);
            Assert.Equal(result.Data > 0,true);
        }
    }
}
