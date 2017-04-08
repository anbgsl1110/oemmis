using Oem.Common.LogHelper;
using Xunit;

namespace Oem.WebTest.Common
{
    public class LogHelperTest
    {
        private readonly LogHelper _logHelper;

        public LogHelperTest()
        {
            _logHelper = new LogHelper();
        }
        [Fact]
        public void WriteLog()
        {
            _logHelper.WriteLog("LogHelper Unit Test");
        }
    }
}