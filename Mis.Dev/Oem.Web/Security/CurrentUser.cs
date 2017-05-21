using Oem.Common.CacheHelper;
using Oem.Data.Enum;
using Oem.Data.Table.SysSetting;

namespace Oem.Web.Security
{
    /// <summary>
    /// 当前登录用户
    /// </summary>
    public class CurrentUser : ICurrentUser
    {
        /// <summary>
        /// 缓存对象
        /// </summary>
        public ICacheService MyCache { get; }

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="myCache"></param>
        public CurrentUser(ICacheService myCache)
        {
            MyCache = myCache;
        }

        public long UserId
        {
            get { return long.Parse(MyCache.Get(@"OemMis-UseId").ToString()); }
        }

        public string UserName
        {
            get
            {
                return MyCache.Get<string>(@"OemMis-UserName");
            }
        }

        public long OrgId
        {
            get
            {
                return long.Parse(MyCache.Get(@"OemMis-OrgId").ToString());

            }
        }

        public AuthorityEnum[] UserAuthority
        {
            get
            {
                return MyCache.Get<AuthorityEnum[]>(@"OemMis-UserAuthority");
            }
        }

        public RoleRepo[] UserRole
        {
            get
            {
                return MyCache.Get<RoleRepo[]>(@"OemMis-UserRole");
            }
        }

        public void SetCurrentUserInfo(long userId, string userName, long orgId, AuthorityEnum[] userAuthority,
            RoleRepo[] userRole)
        {
            MyCache.Add(@"OemMis-UseId", userId);
            MyCache.Add(@"OemMis-UserName", userName);
            MyCache.Add(@"OemMis-OrgId", orgId);
            MyCache.Add(@"OemMis-UserAuthority", userAuthority);
            MyCache.Add(@"OemMis-UserRole", userRole);
        }

        public void ClearCurrentUserInfo()
        {
            MyCache.RemoveAll(new []
            {
                @"OemMis-UseId", @"OemMis-UserName",@"OemMis-OrgId",@"OemMis-UserAuthority",@"OemMis-UserRole"
                
            });
        }
    }
}