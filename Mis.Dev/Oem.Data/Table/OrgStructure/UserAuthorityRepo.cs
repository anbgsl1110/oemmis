namespace Oem.Data.Table.OrgStructure
{
    /// <summary>
    /// 用户权限对象
    /// </summary>
    public class UserAuthorityRepo
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
        /// 权限Id
        /// </summary>
        public long AuthorityId { get; set; }
    }
}