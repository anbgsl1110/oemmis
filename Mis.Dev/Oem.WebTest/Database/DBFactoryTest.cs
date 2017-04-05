using Dapper;
using Oem.Providers;
using Xunit;

namespace Oem.WebTest.Database
{
    public class DbFactoryTest
    {
        /// <summary>
        /// 测试数据库连接
        /// </summary>
        [Fact]
        public void InitTest()
        {
            using (var dbConnection = DbFactory.GetNewConnection())
            {
                dbConnection.Open();
                string sql = @"insert into user values(null,'测试','')";
                var count = dbConnection.Execute(sql);
                Assert.NotNull(count);
            }
        }
    }
}