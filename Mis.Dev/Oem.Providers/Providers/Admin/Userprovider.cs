using System.Collections.Generic;
using System.Linq;
using Dapper;
using Oem.Data.Table.OrgStructure;
using Oem.Providers.IProviders.Admin;

namespace Oem.Providers.Providers.Admin
{
    public class Userprovider : IUserProvider
    {
        public List<UserRepo> GetUserList()
        {
            using (var dbConnection = DbFactory.GetNewConnection())
            {
                dbConnection.Open();
                return dbConnection.Query<UserRepo>("SELECT * FROM user").ToList();
            }
        }

        public UserRepo GetUser(long userId)
        {
            using (var dbConnection = DbFactory.GetNewConnection())
            {
                string sql = string.Format(@"SELECT Id, UserName, Password FROM oemmis_dev.user WHERE Id = {0};"
                    ,userId);
                return dbConnection.Query<UserRepo>(sql).SingleOrDefault();
            }
        }
    }
}