using Oem.Data.Enum;
using Oem.Data.Table.SysSetting;

namespace Oem.Web.Security
{
    /// <summary>
    /// 当前登录用户
    /// </summary>
    public class CurrentUser : ICurrentUser
    {
        public long UserId { get; set; }
        public string UserName { get; set; }
        public long OrgId { get; set; }
        public AuthorityEnum[] UserAuthority { get; set; }
        public RoleRepo[] UserRole { get; set; }

        public void SetCurrentUserInfo(long userId, string userName, long orgId, AuthorityEnum[] userAuthority,
            RoleRepo[] userRole)
        {
            throw new System.NotImplementedException();
        }

        public void ClearCurrentUserInfo()
        {
            throw new System.NotImplementedException();
        }
    }
}