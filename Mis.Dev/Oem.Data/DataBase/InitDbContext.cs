using Microsoft.EntityFrameworkCore;
using Oem.Data.Table.Auxiliary;
using Oem.Data.Table.BaseInfo;
using Oem.Data.Table.Dispatch;
using Oem.Data.Table.Order;
using Oem.Data.Table.OrgStructure;
using Oem.Data.Table.Repertory;
using Oem.Data.Table.SysSetting;

namespace Oem.Data.DataBase
{
    public class InitDbContext : DbContext
    {
        public InitDbContext(DbContextOptions<InitDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            #region 组织结构modelBuilder

            //OrgRepo
            builder.Entity<OrgRepo>().HasKey(p => new {p.Id});
            builder.Entity<OrgRepo>().Property(p => p.OrgName).HasMaxLength(50);
            builder.Entity<OrgRepo>().Property(p => p.Remark).HasMaxLength(50);            
            //UserAuthorityRepo
            builder.Entity<UserAuthorityRepo>().HasKey(p => p.Id);

            //UserOrgRepo
            builder.Entity<UserOrgRepo>().HasKey(p => p.Id);

            //UserRepo
            builder.Entity<UserRepo>().HasKey(p => p.Id);
            builder.Entity<UserRepo>().Property(p => p.UserName).HasMaxLength(50);
            builder.Entity<UserRepo>().Property(p => p.Password).HasMaxLength(50);

            //UserRoleRepo
            builder.Entity<UserRoleRepo>().HasKey(p => p.Id);

            #endregion

            #region 系统设置modelBuilder

            //AuthorityRepo
            builder.Entity<AuthorityRepo>().HasKey(p => p.Id);
            builder.Entity<AuthorityRepo>().Property(p => p.AuthorityName).HasMaxLength(100);

            //LogRepo
            builder.Entity<LogRepo>().HasKey(p => p.Id);
            builder.Entity<LogRepo>().Property(p => p.Ip).HasMaxLength(100);
            builder.Entity<LogRepo>().Property(p => p.OperationIdType).HasMaxLength(100);
            builder.Entity<LogRepo>().Property(p => p.OperationIds).HasMaxLength(200);
            builder.Entity<LogRepo>().Property(p => p.OperationResult).HasMaxLength(100);
            builder.Entity<LogRepo>().Property(p => p.Remark).HasMaxLength(200);

            //RoleAuthorityRepo
            builder.Entity<RoleAuthorityRepo>().HasKey(p => p.Id);

            //RoleRepo
            builder.Entity<RoleRepo>().HasKey(p => p.Id);
            builder.Entity<RoleRepo>().Property(p => p.RoleName).HasMaxLength(100);
           
            #endregion

        }

        #region 组织结构属性

        /// <summary>
        /// 机构
        /// </summary>
        public DbSet<OrgRepo> Org { get; set; }

        /// <summary>
        /// 用户权限
        /// </summary>
        public DbSet<UserAuthorityRepo> UserAuthority { get; set; }

        /// <summary>
        /// 用户机构
        /// </summary>
        public DbSet<UserOrgRepo> UserOrg { get; set; }

        /// <summary>
        /// 用户
        /// </summary>
        public DbSet<UserRepo> User { get; set; }

        /// <summary>
        /// 用户角色
        /// </summary>
        public DbSet<UserRoleRepo> UserRole { get; set; }

        #endregion

        #region 系统设置属性

        /// <summary>
        /// 权限
        /// </summary>
        public DbSet<AuthorityRepo> Authority { get; set; }

        /// <summary>
        /// 日志
        /// </summary>
        public DbSet<LogRepo> Log { get; set; }

        /// <summary>
        /// 角色权限
        /// </summary>
        public DbSet<RoleAuthorityRepo> RoleAuthority { get; set; }

        /// <summary>
        /// 角色
        /// </summary>
        public DbSet<RoleRepo> Role { get; set; }

        #endregion

        #region 基础资料

        /// <summary>
        /// 原材料
        /// </summary>
        public DbSet<OriginalMaterialsRepo> OriginalMaterials { get; set; }
        
        /// <summary>
        /// 产品信息
        /// </summary>
        public DbSet<ProductRepo> Product { get; set; }
        
        /// <summary>
        /// 产品Bom
        /// </summary>
        public DbSet<ProductBomRepo> ProductBom { get; set; }
        
        
        /// <summary>
        /// 供应商
        /// </summary>
        public DbSet<SupplerRepo> Suppler { get; set; }
        
        /// <summary>
        /// 公司
        /// </summary>
        public DbSet<CompanyRepo> Company { get; set; }
        
        /// <summary>
        /// 仓库信息
        /// </summary>
        public DbSet<WarehouseRepo> Warehouse { get; set; }
        
        #endregion

        #region 订单管理

        /// <summary>
        /// 订单
        /// </summary>
        public DbSet<OrdersRepo> Order { get; set; }
        
        /// <summary>
        /// 订单明细
        /// </summary>
        public DbSet<OrderDetailsRepo> OrderDetails { get; set; }
        
        /// <summary>
        /// 申购
        /// </summary>
        public DbSet<RequisitionRepo> Requisition { get; set; }
        
        /// <summary>
        /// 申购明细
        /// </summary>
        public DbSet<RequisitionDetailsRepo> RequisitionDetails { get; set; }
        
        /// <summary>
        /// 采购
        /// </summary>
        public DbSet<PurchaseRepo> Purchase { get; set; }
        
        /// <summary>
        /// 采购明细
        /// </summary>
        public DbSet<PurchaseDetailsRepo> PurchaseDetails { get; set; }

        #endregion

        #region 仓库管理

        /// <summary>
        /// 仓库流水
        /// </summary>
        public DbSet<WarehouseOprationRepo> WarehouseOpration { get; set; }
        
        /// <summary>
        /// 仓库流水明细
        /// </summary>
        public DbSet<WarehouseManagerDetailRepo> WarehouseManagerDetail { get; set; }

        #endregion

        #region 派工管理

        /// <summary>
        /// 派工流水
        /// </summary>
        public DbSet<DispatchRepo> Dispatch { get; set; }
        
        /// <summary>
        /// 派工明细
        /// </summary>
        public DbSet<DispatchDetailRepo> DispatchDetail { get; set; }

        #endregion

        #region 辅助工具

        /// <summary>
        /// 扫码流水
        /// </summary>
        public DbSet<ScanCodeRepo> ScanCode { get; set; }

        #endregion
    
    }
}