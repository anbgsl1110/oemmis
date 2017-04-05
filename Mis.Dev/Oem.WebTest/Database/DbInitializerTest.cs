using System.Data;
using System.Data.Common;
using Microsoft.EntityFrameworkCore;
using Oem.Common.Util;
using Oem.Providers;
using Oem.Web.Data;
using Xunit;

namespace Oem.WebTest.Database
{
    /// <summary>
    /// 数据库初始化
    /// </summary>
    public class DbInitializerTest
    {
        [Fact]
        public void DropAndCreateDatabase()
        {
            using (var context = new InitDbContext(new DbContextOptions<InitDbContext>()))
            {
                context.Database.EnsureDeleted();
            }
        }
    }
}