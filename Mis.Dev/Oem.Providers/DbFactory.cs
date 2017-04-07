using System;
using System.Data;
using MySql.Data.MySqlClient;
using Oem.Common.Util;

namespace Oem.Providers
{
    public static class DbFactory
    {
        private static readonly string ConnectionString = ConfigHelper.GetConnectionString("OemMisConn");
        private static readonly IDbConnection DbConnection = new MySqlConnection(ConnectionString);

        public static IDbConnection GetNewConnection()
        {
            return DbConnection;
        }
    }
}