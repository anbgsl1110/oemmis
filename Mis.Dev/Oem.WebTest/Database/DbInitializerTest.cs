using System.Data;
using System.Data.Common;
using Microsoft.EntityFrameworkCore;
using MySQL.Data.EntityFrameworkCore.Extensions;
using Oem.Common.Util;
using Oem.Data;
using Oem.Data.DataBase;
using Oem.Providers;
using Oem.Web.Data;
using Xunit;
using InitDbContext = Oem.Data.DataBase.InitDbContext;

namespace Oem.WebTest.Database
{
    /// <summary>
    /// 数据库初始化
    /// </summary>
    public class DbInitializerTest
    {
        static readonly string Connection = ConfigHelper.GetConnectionString("OemMisConn");
        static readonly DbContextOptions<InitDbContext> DbContextOption = new DbContextOptions<InitDbContext>();
        static readonly DbContextOptionsBuilder<InitDbContext> DbContextOptionBuilder = new DbContextOptionsBuilder<InitDbContext>(DbContextOption);

        [Fact]
        public void DropAndCreateDatabase()
        {
            using (InitDbContext dbContext = new InitDbContext(DbContextOptionBuilder.UseMySQL(Connection).Options))
            {
                InitData initData = new InitData();
                initData.InitDb(dbContext);
            }
        }
    }
}