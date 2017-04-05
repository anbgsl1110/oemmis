namespace Oem.Data.Table.OrgUser
{
    /// <summary>
    /// 用户角色对象
    /// </summary>
    public class UserRoleRepo
    {
        /// <summary>
        /// 主键Id
        /// </summary>
        public long Id { get; set; }
        /// <summary>
        /// 用户Id
        /// </summary>
        public long UserId { get; set; }
        /// <summary>
        /// 角色Id
        /// </summary>
        public long RoleId { get; set; }
    }
}