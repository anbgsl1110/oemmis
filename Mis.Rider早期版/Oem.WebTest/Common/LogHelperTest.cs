using NUnit.Framework;
using Oem.Common.Log;

namespace Oem.WebTest.Common
{
    public class LogHelperTest
    {
        private readonly LogHelper _logHelper;

        public LogHelperTest()
        {
            _logHelper = new LogHelper();
        }
        [Test]
        public void WriteLog()
        {
            _logHelper.WriteLog("LogHelper Unit Test");
        }
    }
}