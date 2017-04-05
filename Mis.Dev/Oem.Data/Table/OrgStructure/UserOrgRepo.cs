namespace Oem.Data.Table.OrgStructure
{
    /// <summary>
    /// 用户机构
    /// </summary>
    public class UserOrgRepo
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
        /// 机构Id
        /// </summary>
        public long OrgId { get; set; }
    }
}