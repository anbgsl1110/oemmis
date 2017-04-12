
namespace Oem.Web.Security
{
    interface ICurrentUser
    {
        void SetCurrentUserInfo();
        /// <summary>
        /// 用户Id
        /// </summary>
        long UserId { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        string UserName { get; set; }

        /// <summary>
        /// 密码
        /// </summary>
        string Password { get; set; }
    }
}
