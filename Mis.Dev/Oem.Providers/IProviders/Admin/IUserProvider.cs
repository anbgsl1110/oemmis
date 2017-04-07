using System.Collections.Generic;
using Oem.Data.Table.OrgStructure;

namespace Oem.Providers.IProviders.Admin
{
    public interface IUserProvider
    {
        /// <summary>
        /// 获取用户列表
        /// </summary>
        /// <returns></returns>
        List<UserRepo> GetUserList();
    }
}