using Oem.Data.Enum;

namespace Oem.Models.Response.User
{
    /// <summary>
    /// 用户Response
    /// </summary>
    public class UserResponse
    {
        /// <summary>
        /// 用户Id
        /// </summary>
        public long Id { get; set; }
        /// <summary>
        /// 用户名
        /// </summary>
        public string UserName { get; set; }
        
        /// <summary>
        /// 用户权限
        /// </summary>
        public AuthorityEnum[] UserFunction { get; set; }
    }
}