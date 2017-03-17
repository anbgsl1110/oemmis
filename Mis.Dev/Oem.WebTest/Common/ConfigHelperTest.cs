using System;
using System.Collections.Generic;
using System.Text;
using Oem.Common.Util;
using Xunit;

namespace Oem.WebTest.Common
{
    public class ConfigHelperTest
    {
        [Fact]
        public void GetConfigStringTest()
        {
            var result = ConfigHelper.GetConfigString("EnvironmentConfig");
            string name = result["Name"];
            Assert.Equal(name,"Dev");
        }
    }
}
