
using Oem.Data.Enum;
using Oem.Data.Table.SysSetting;

namespace Oem.Web.Security
{
    public interface ICurrentUser
    {
        /// <summary>
        /// 用户Id
        /// </summary>
        long UserId { get; }

        /// <summary>
        /// 用户名
        /// </summary>
        string UserName { get; }

        /// <summary>
        /// 机构Id
        /// </summary>
        long OrgId { get; }

        /// <summary>
        /// 用户权限
        /// </summary>
        AuthorityEnum[] UserAuthority { get; }

        /// <summary>
        /// 用户角色
        /// </summary>
        RoleRepo[] UserRole { get; }

        /// <summary>
        /// 设置当前用户信息
        /// </summary>
        /// <param name="userId">用户Id</param>
        /// <param name="userName">用户名</param>
        /// <param name="orgId">机构ID</param>
        /// <param name="userAuthority">用户权限</param>
        /// <param name="userRole">用户角色</param>
        void SetCurrentUserInfo(long userId, string userName, long orgId, AuthorityEnum[] userAuthority,
            RoleRepo[] userRole);

        /// <summary>
        /// 清除当前用户信息
        /// </summary>
        void ClearCurrentUserInfo();
    }
}
