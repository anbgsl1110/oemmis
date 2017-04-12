namespace Oem.Data.Service.UserDto
{
    /// <summary>
    /// 用户数据对象
    /// </summary>
    public class UserDto
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
        /// 密码
        /// </summary>
        public string Password { get; set; }
    }
}