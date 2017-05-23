using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using Dapper;

namespace Oem.Providers.Providers
{
    /// <summary>
    /// 数据服务基本抽象类
    /// </summary>
    public abstract class BaseProvider
    {
        /// <summary>
        /// 根据主键id获取数据
        /// </summary>
        /// <param name="t"></param>
        /// <param name="id"></param>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public T Select<T>(T t, long id)
        {
            using (var con = DbFactory.GetNewConnection())
            {
                return con.Query<T>($"SELECT * FROM {GetObjectName(t)} WHERE Id = {id};").SingleOrDefault();
            }
        }

        /// <summary>
        /// 分页查询列表记录
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public IEnumerable<T> Select<T>(T t, long pageIndex, long pageSize)
        {
            using (var con = DbFactory.GetNewConnection())
            {
                var sql =
                    $"SELECT * FROM {GetObjectName(t)} WHERE Id > 0 ORDER BY Id DESC LIMIT {pageIndex},{pageSize};";
                return con.Query<T>(sql);
            }
        }

        /// <summary>
        /// 插入数据(返回插入记录主键)
        /// </summary>
        /// <param name="t"></param>
        /// <typeparam name="T"></typeparam>
        public int InsertWithIdentity<T>(T t)
        {
            using (var con = DbFactory.GetNewConnection())
            {
                string insertSql = $@"SET SESSION sql_mode='ANSI';
                                 INSERT INTO {GetObjectName(t)}({GetObjectProperty(t)}) 
                                                        VALUES ({GetObjectPropertyString(t)}); ";
                string returnSql = $@" SELECT `Id` FROM {GetObjectName(t)} 
                                                      WHERE  row_count() > 0 AND `Id`=last_insert_id();";
                return con.ExecuteScalar<int>(insertSql+returnSql, GetObjectParameters(t));
            }
        }
        
        /// <summary>
        /// 插入数据
        /// </summary>
        /// <param name="t"></param>
        /// <typeparam name="T"></typeparam>
        public void Insert<T>(T t)
        {
            using (var con = DbFactory.GetNewConnection())
            {
                string insertSql = $@"SET SESSION sql_mode='ANSI';
                                 INSERT INTO {GetObjectName(t)}({GetObjectProperty(t)}) 
                                                        VALUES ({GetObjectPropertyString(t)}); ";
                con.Execute(insertSql, GetObjectParameters(t));
            }
        }

        /// <summary>
        /// 根据Id删除数据
        /// </summary>
        /// <param name="t"></param>
        /// <param name="id"></param>
        public void Delete<T>(T t, long id)
        {
            using (var con = DbFactory.GetNewConnection())
            {
                string sql = $@"DELETE FROM {GetObjectName(t)} WHERE Id = @Id;";
                con.Execute(sql, new {Id = id});
            }
        }

        /// <summary>
        /// 更新数据
        /// </summary>
        /// <param name="t"></param>
        /// <typeparam name="T"></typeparam>
        public void Update<T>(T t)
        {
            using (var con = DbFactory.GetNewConnection())
            {
                string sql = $"UPDATE {GetObjectName(t)} SET {GetObjectPropertyUpadateString(t)} WHERE `Id` = @Id;";
                con.Execute(sql, GetObjectParameters(t));
            }
        }

        /// <summary>
        /// 列表上分页条件拼接
        /// </summary>
        /// <param name="parameters">请求参数</param>
        /// <returns></returns>
        protected virtual string GetQueryListPagingCondition(IDictionary<string, object> parameters)
        {
            #region 增加分页条件

            var sbPaging = new StringBuilder();

            if (parameters.Keys.Contains("PageSize") && parameters.Keys.Contains("PageIndex"))
            {
                sbPaging.Append(" limit ");
                var pageIndex = (int)parameters["PageIndex"];
                var pageSize = (int)parameters["PageSize"];
                if (parameters.Keys.Contains("PageIndex"))
                {
                    sbPaging.Append(" @PageOffset,");
                    parameters.Add("PageOffset", (pageIndex - 1) * pageSize);
                }

                sbPaging.Append(" @PageSize");
            }

            return sbPaging.ToString();

            #endregion
        }

        #region 私有方法

        /// <summary>
        /// 获取对象属性值参数集合（用于执行存储过程）
        /// </summary>
        /// <param name="t"></param>
        /// <returns></returns>
        private IDictionary<string, object> GetObjectParameters<T>(T t)
        {
            IDictionary<string, object> parameters = new Dictionary<string, object>();
            Type type = t.GetType();
            var propertyInfos = type.GetRuntimeProperties();
            foreach (var propertyInfo in propertyInfos)
            {
                parameters.Add(propertyInfo.Name,propertyInfo.GetValue(t));
            }
            return parameters;
        }

        /// <summary>
        /// 获取对象属性
        /// </summary>
        /// <param name="t"></param>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        private string GetObjectProperty<T>(T t)
        {
            StringBuilder str = new StringBuilder();
            Type type = t.GetType();
            var propertyInfos = type.GetRuntimeProperties();
            foreach (var propertyInfo in propertyInfos)
            {
                str.Append("," + propertyInfo.Name);
            }
            return str.ToString().Substring(4);
        }
        
        /// <summary>
        /// 获取对象属性值字符串拼接
        /// </summary>
        /// <param name="t"></param>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        private string GetObjectPropertyString<T>(T t)
        {
            StringBuilder str = new StringBuilder();
            Type type = t.GetType();
            var propertyInfos = type.GetRuntimeProperties();
            foreach (var propertyInfo in propertyInfos)
            {
                str.Append(",@" + propertyInfo.Name);
            }
            return str.ToString().Substring(5);
        }
        
        /// <summary>
        /// 获取对象属性参数字符串拼接(用于数据更新)
        /// </summary>
        /// <param name="t"></param>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        private string GetObjectPropertyUpadateString<T>(T t)
        {
            StringBuilder str = new StringBuilder();
            Type type = t.GetType();
            var propertyInfos = type.GetRuntimeProperties();
            foreach (var propertyInfo in propertyInfos)
            {
                str.Append("," + propertyInfo.Name + " = @" + propertyInfo.Name);
            }
            return str.ToString().Substring(10);
        }

        /// <summary>
        /// 获取对象名称（用于执行存储过程）
        /// </summary>
        /// <param name="t"></param>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        private string GetObjectName<T>(T t)
        {
            Type type = t.GetType();
            var name = type.Name;
            return name.Remove(name.Length - 4,4);
        }

        #endregion
    }
}