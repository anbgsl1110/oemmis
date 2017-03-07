using System;
using System.Linq;
using Dapper;
using NUnit.Framework;
using Oem.Providers;

namespace Oem.WebTest
{
    [TestFixture]
    public class DbFactoryTest
    {
        /// <summary>
        /// 测试数据库连接
        /// </summary>
        [Test]
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