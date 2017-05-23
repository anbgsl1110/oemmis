using Microsoft.EntityFrameworkCore;
using Oem.Data.Table.BaseInfo;
using Oem.Data.Table.OrgStructure;
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

        #endregion

        #region 订单管理

        

        #endregion

        #region 仓库管理

        

        #endregion

        #region 派工管理

        

        #endregion

        #region 辅助工具

        

        #endregion
    
    }
}