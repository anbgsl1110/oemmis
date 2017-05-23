using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.DependencyInjection;
using Oem.Data.Table.BaseInfo;
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
            for (int i = 0; i < 5; i++)
            {
                dbContext.User.Add(new UserRepo
                {
                    UserName = "test" + i,
                    Password = "abc123"
                });
                dbContext.OriginalMaterials.Add(new OriginalMaterialsRepo
                {
                    Name = "原材料" + i,
                    Type = "皮000" + i,
                    Color = "绿色",
                    Format = "20*18",
                    Unit = "平方米",
                    WarehouseName = "仓库0001",
                    WarehouseNumber  = "CK0001",
                    Sort = "皮",
                    SerialNumber = "G920" + i,
                    SupplerId = 1,
                    WarehousesAmount = 1110,
                    ShreddedWarehousesAmount = 1110,
                    StockWarehouseAmount = 1110   
                });
                dbContext.OriginalMaterials.Add(new OriginalMaterialsRepo
                {
                    Name = "衬里材料" + i,
                    Type = "衬里000" + i,
                    Color = "紫色",
                    Format = "20*18",
                    Unit = "平方米",
                    WarehouseName = "仓库0002",
                    WarehouseNumber  = "CK0002",
                    Sort = "衬里",
                    SerialNumber = "G920" + i,
                    SupplerId = 2,
                    WarehousesAmount = 1110,
                    ShreddedWarehousesAmount = 1110,
                    StockWarehouseAmount = 1110   
                });
                dbContext.OriginalMaterials.Add(new OriginalMaterialsRepo
                {
                    Name = "辅料材料" + i,
                    Type = "辅料000" + i,
                    Color = "红色",
                    Format = "20*18",
                    Unit = "平方分米",
                    WarehouseName = "仓库0001",
                    WarehouseNumber  = "CK0001",
                    Sort = "辅料",
                    SerialNumber = "G920" + i,
                    SupplerId = 3,
                    WarehousesAmount = 1110,
                    ShreddedWarehousesAmount = 1110,
                    StockWarehouseAmount = 1110   
                });
            }
            dbContext.User.Add(new UserRepo
            {
                UserName = "admin",
                Password = "abc123"
            });
            dbContext.Org.Add(new OrgRepo
            {
                OrgName = "Xdj",
                Remark = "喜多见皮具加工厂"
            });
        }
    }
}
