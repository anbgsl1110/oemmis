using Dapper;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Oem.Providers;

namespace Oem.WebTest
{
    [TestClass]
    public class DbFactoryTest
    {
        /// <summary>
        /// 测试数据库连接
        /// </summary>
        [TestMethod]
        public void InitTest()
        {
            using (var dbConnection = DbFactory.GetNewConnection())
            {
                dbConnection.Open();
                string sql = @"insert into user values(null, '测试', 'http://www.cnblogs.com/linezero/', 18)";
                var count = dbConnection.Execute(sql);
                Assert.IsNotNull(count);
            }
        }
    }
}