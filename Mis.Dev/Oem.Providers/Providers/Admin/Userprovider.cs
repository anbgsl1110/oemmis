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

        /// <summary>
        /// 获取用户信息
        /// </summary>
        /// <param name="userId">用户Id</param>
        /// <returns></returns>
        public UserRepo GetUser(long userId)
        {
            using (var dbConnection = DbFactory.GetNewConnection())
            {
                dbConnection.Open();
                string sql = string.Format(@"SELECT Id, UserName, Password FROM oemmis_dev.user WHERE Id = {0};"
                    ,userId);
                return dbConnection.Query<UserRepo>(sql).SingleOrDefault();
            }
        }
    }
}