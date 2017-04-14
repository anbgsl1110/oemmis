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
        public IMyCache MyCache { get; }

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="myCache"></param>
        public CurrentUser(IMyCache myCache)
        {
            MyCache = myCache;
        }

        public long UserId
        {
            get { return MyCache.Get<long>(@"OemMis-UseId"); }
        }

        public string UserName
        {
            get
            {
                return MyCache.Get<string>(@"OemMis-UserName");
            };
        }

        public long OrgId
        {
            get
            {
                return MyCache.Get<long>(@"OemMis-OrgId");

            };
        }

        public AuthorityEnum[] UserAuthority
        {
            get
            {
                return MyCache.Get<AuthorityEnum[]>(@"OemMis-UserAuthority");
            };
        }

        public RoleRepo[] UserRole
        {
            get
            {
                return MyCache.Get<RoleRepo[]>(@"OemMis-UserRole");
            };
        }

        public void SetCurrentUserInfo(long userId, string userName, long orgId, AuthorityEnum[] userAuthority,
            RoleRepo[] userRole)
        {
            MyCache.Set(@"OemMis-UseId", userId);
            MyCache.Set(@"OemMis-UserName", userName);
            MyCache.Set(@"OemMis-OrgId", orgId);
            MyCache.Set(@"OemMis-UserAuthority", userAuthority);
            MyCache.Set(@"OemMis-UserRole", userRole);
        }

        public void ClearCurrentUserInfo()
        {
            MyCache[@"OemMis-UseId"] = null;
            MyCache[@"OemMis-UserName"] = null;
            MyCache[@"OemMis-OrgId"] = null;
            MyCache[@"OemMis-UserAuthority"] = null;
            MyCache[@"OemMis-UserRole"] = null;
        }
    }
}