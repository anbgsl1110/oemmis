using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.DependencyInjection;
using Oem.Data.Table.Auxiliary;
using Oem.Data.Table.BaseInfo;
using Oem.Data.Table.Dispatch;
using Oem.Data.Table.Order;
using Oem.Data.Table.OrgStructure;
using Oem.Data.Table.Repertory;
using Oem.Data.Table.SysSetting;
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
            //基础资料
            BaseInfoSeed(ref dbContext);
            //订单
            OrderSeed(ref dbContext);
            //仓库
            RepertorySeed(ref dbContext);
            //派工
            DispatchSeed(ref dbContext);
            //辅助
            AuxiliarySeed(ref dbContext);
            //系统设置
            SysSettingSeed(ref dbContext);
        }

        /// <summary>
        /// 基础资料初始化种子
        /// </summary>
        /// <param name="dbContext"></param>
        private void BaseInfoSeed(ref InitDbContext dbContext)
        {
            for (int i = 0; i < 15; i++)
            {
                
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
                dbContext.Product.Add(new ProductRepo
                {
                    SerialNumber = "XL50" + i,
                    StyleNumber = "款式" + i,
                    BrandName = "品名" + i,
                    Color = "红",
                    Remark = "2017年05月款"
                });
                dbContext.Suppler.Add(new SupplerRepo
                {
                    SupplerName = "供应商" + i,
                    Address = "浙江杭州",
                    Phone = "1888888888",
                    Remark = "初始化时创建的供应商"
                });
                dbContext.Company.Add(new CompanyRepo
                {
                    CompanyName = "公司" + i,
                    Address = "西湖区文三路",
                    Phone = "13588888888",
                    Remark = "初始化时创建的公司"
                });
                dbContext.Warehouse.Add(new WarehouseRepo
                {
                    WarehouseNumber = "Ck0000" + i,
                    WarehouseName = "仓库" + i,
                    Address = "陇南康县",
                    WarehouseType = "皮仓库",
                    MaterialsType = "皮",
                    WarehouseManager = "张三",
                    Remark = "初始化时创建的仓库"
                });
            }
        }
        
        /// <summary>
        /// 订单初始化种子
        /// </summary>
        /// <param name="dbContext"></param>
        private void OrderSeed(ref InitDbContext dbContext)
        {
            for (int i = 0; i < 10; i++)
            {
                dbContext.Order.Add(new OrdersRepo
                {
                    OrderNumber = "定单" + i,
                    SerialNumber = "系列" + i,
                    CompanyId = i + 1,
                    TotalAmount = 1110,
                    Operator = i,
                    OrderDate = DateTime.Now,
                    OrderStatus = 1,
                    CreateTime = DateTime.Now
                });
            }
            for (int i = 0; i < 5; i++)
            {
                dbContext.Requisition.Add(new RequisitionRepo
                {
                    RequisitionNumber = "申购" + i,
                    Operator = 1,
                    RequisitionDate = DateTime.Now,
                    RequisitionStatus = 1,
                    CreateTime = DateTime.Now
                });
            }
            for (int i = 0; i < 5; i++)
            {
                dbContext.Purchase.Add(new PurchaseRepo
                {
                    PurchaseNumber = "采购" + i,
                    DeliveryDate = DateTime.Now,
                    Operator = 1,
                    PurchaseDate = DateTime.Now,
                    PurchaseStatus = 1,
                    CreateTime = DateTime.Now
                });
            }
        }
        
        /// <summary>
        /// 仓库管理初始化种子
        /// </summary>
        /// <param name="dbContext"></param>
        private void RepertorySeed(ref InitDbContext dbContext)
        {
            for (int i = 0; i < 5; i++)
            {
                dbContext.WarehouseOpration.Add(new WarehouseOprationRepo
                {
                    OperationNumber = "RKP0000" + i,
                    OperattionTime = DateTime.Now,
                    TotalAmount = 1110,
                    WarehouseId = 1,
                    AuxiliaryNumber = "CGP0005" + i
                });
                dbContext.WarehouseOpration.Add(new WarehouseOprationRepo
                {
                    OperationNumber = "RKCL0000" + i,
                    OperattionTime = DateTime.Now,
                    TotalAmount = 1110,
                    WarehouseId = 2,
                    AuxiliaryNumber = "CGP0005" + i
                });
                dbContext.WarehouseOpration.Add(new WarehouseOprationRepo
                {
                    OperationNumber = "RKFL0000" + i,
                    OperattionTime = DateTime.Now,
                    TotalAmount = 1110,
                    WarehouseId = 3,
                    AuxiliaryNumber = "CGP0005" + i
                });
            }
        }
        
        /// <summary>
        /// 派工初始化种子
        /// </summary>
        /// <param name="dbContext"></param>
        private void DispatchSeed(ref InitDbContext dbContext)
        {
            for (int i = 0; i < 5; i++)
            {
                dbContext.Dispatch.Add(new DispatchRepo
                {
                    DispatchNumber = "XLP0000" + i,
                    DispatchTime = DateTime.Now,
                    WorkStaff = 2,
                    DispatchStaff = 1,
                    DispatchType = "下料皮派工"
                });
                dbContext.Dispatch.Add(new DispatchRepo
                {
                    DispatchNumber = "XLP0000" + i,
                    DispatchTime = DateTime.Now,
                    WorkStaff = 3,
                    DispatchStaff = 1,
                    DispatchType = "下料衬里派工"
                });
                dbContext.Dispatch.Add(new DispatchRepo
                {
                    DispatchNumber = "XJQ0000" + i,
                    DispatchTime = DateTime.Now,
                    WorkStaff = 4,
                    DispatchStaff = 1,
                    DispatchType = "小机器派工"
                });
                dbContext.Dispatch.Add(new DispatchRepo
                {
                    DispatchNumber = "SCXZ0000" + i,
                    DispatchTime = DateTime.Now,
                    WorkStaff = 5,
                    DispatchStaff = 1,
                    DispatchType = "生产小组派工"
                });
                dbContext.DispatchDetail.Add(new DispatchDetailRepo
                {
                    OrderDetailsId = i,
                    Amount = 1110
                });
            }
        }
        
        /// <summary>
        /// 辅助初始化种子
        /// </summary>
        /// <param name="dbContext"></param>
        private void AuxiliarySeed(ref InitDbContext dbContext)
        {
            for (int i = 0; i < 20; i++)
            {
                dbContext.ScanCode.Add(new ScanCodeRepo
                {
                    ScanCodeId = i,
                    CreateTime = DateTime.Now,
                    DispatchId = i + 1
                });
            }
        }
        
        /// <summary>
        /// 系统设置初始化种子
        /// </summary>
        /// <param name="dbContext"></param>
        private void SysSettingSeed(ref InitDbContext dbContext)
        {
            for (int i = 0; i < 5; i++)
            {
                dbContext.Log.Add(new LogRepo
                {
                    UserId = 5,
                    UserName = "初始化",
                    Ip = "114.215.158.17"+i,
                    OperationIdType = "登录",
                    OperationIds = "",
                    OperationResult = "操作成功",
                    OperationDate = DateTime.Now
                });
            }
            dbContext.User.Add(new UserRepo
            {
                UserName = "admin",
                Password = "abc123",
                Phone = "18034648633",
                Email = "anbgsl1110@gmail.com",
                Remark = "初始化时创建的admin用户"
            });
            dbContext.User.Add(new UserRepo
            {
                UserName = "test",
                Password = "abc123",
                Phone = "18800000000",
                Email = "123@ss.space",
                Remark = "初始化时创建的员工用户"
            });           
            dbContext.Org.Add(new OrgRepo
            {
                OrgName = "Xdj",
                Remark = "喜多见皮具加工厂"
            });
            dbContext.Role.Add(new RoleRepo
            {
                RoleName = "员工",
                Description = "员工角色"
            });
            dbContext.Role.Add(new RoleRepo
            {
                RoleName = "管理员",
                Description = "系统管理角色"
            });
            
        }
        
        
    }
}
