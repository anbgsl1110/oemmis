using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.DependencyInjection;
using Oem.Data.Table.OrgStructure;
using Remotion.Linq.Parsing.Structure.IntermediateModel;

namespace Oem.Data.DataBase
{
    /// <summary>
    /// 数据库初始对象
    /// </summary>
    public class InitData
    {
        /// <summary>
        /// 初始化数据库
        /// </summary>
        /// <param name="dbContext"></param>
        public void InitDb(InitDbContext dbContext)
        {
            if (dbContext.Database != null)
            {
                dbContext.Database.EnsureDeleted();
                dbContext.Database.EnsureCreated();
                this.Seed(dbContext);
                dbContext.SaveChanges();
            }
        }

        /// <summary>
        /// 数据库初始数据
        /// </summary>
        /// <param name="dbContext"></param>
        public void Seed(InitDbContext dbContext)
        {
            dbContext.User.Add(new UserRepo
            {
                UserName = "test",
                Password = "jyl"
            });
        }
    }
}
