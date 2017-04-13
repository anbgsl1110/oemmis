using System.Data;
using MySql.Data.MySqlClient;

namespace Oem.Providers
{
    public static class DbFactory
    {
        private static readonly string ConnectionString =
            @"server=114.215.158.176;port=5002;database=oemmis_dev;uid=oemmis_dev;pwd=000000;SslMode=None";
        private static readonly IDbConnection DbConnection = new MySqlConnection(ConnectionString);

        public static IDbConnection GetNewConnection()
        {
            return DbConnection;
        }
    }
}
