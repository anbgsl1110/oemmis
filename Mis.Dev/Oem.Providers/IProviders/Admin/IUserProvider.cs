using System.Collections.Generic;
using Oem.Data.Table.OrgStructure;

namespace Oem.Providers.IProviders.Admin
{
    public interface IUserProvider : IBaseProvider
    {
        /// <summary>
        /// 获取用户列表
        /// </summary>
        /// <returns></returns>
        List<UserRepo> GetUserList();

        /// <summary>
        /// 获取用户信息
        /// </summary>
        /// <param name="userId">用户Id</param>
        /// <returns></returns>
        UserRepo GetUser(long userId);

        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        UserRepo Login(string userName, string password);
    }
}