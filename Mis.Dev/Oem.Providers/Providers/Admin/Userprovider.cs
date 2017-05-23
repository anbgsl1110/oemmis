using System.Collections.Generic;
using System.Linq;
using Dapper;
using Oem.Data.Table.OrgStructure;
using Oem.Providers.IProviders.Admin;

namespace Oem.Providers.Providers.Admin
{
    public class Userprovider : BaseProvider,IUserProvider
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
                string sql = string.Format(@"SELECT Id, UserName, Password FROM user WHERE Id = {0};"
                    ,userId);
                return dbConnection.Query<UserRepo>(sql).SingleOrDefault();
            }
        }

        public UserRepo Login(string userName,string password)
        {
            using (var dbConnection = DbFactory.GetNewConnection())
            {
                string sql = @"SELECT Id, UserName FROM user 
                                  WHERE Id > 0 AND UserName = @UserName AND Password = @Password;";
                return dbConnection.Query<UserRepo>(sql,new {UserName = userName,Password = password}).SingleOrDefault();
            }
        }

        public IEnumerable<T> Select<T>(IDictionary<string, object> parameters)
        {
            throw new System.NotImplementedException();
        }
    }
}