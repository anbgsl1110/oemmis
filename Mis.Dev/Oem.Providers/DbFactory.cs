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
            var con = @"server=114.215.158.176;port=5002;database=oemmis_dev;uid=oemmis_dev;pwd=000000;SslMode=None";
            return new MySqlConnection(con);
            //return DbConnection;
        }
    }
}