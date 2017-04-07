using System.Collections.Generic;
using System.Linq;
using Dapper;
using Oem.Data.Table.OrgStructure;
using Oem.Providers.IProviders.Admin;

namespace Oem.Providers.Providers.Admin
{
    public class Userprovider : IUserProvider
    {
        /// <summary>
        /// 获取用户列表
        /// </summary>
        /// <returns></returns>
        public List<UserRepo> GetUserList()
        {
            using (var dbConnection = DbFactory.GetNewConnection())
            {
                dbConnection.Open();
                return dbConnection.Query<UserRepo>("SELECT * FROM user").ToList();
            }
        }
    }
}