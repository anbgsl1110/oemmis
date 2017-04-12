using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Redis;
using Newtonsoft.Json;
using StackExchange.Redis;

namespace Oem.Common.CacheHelper
{
    /// <summary>
    /// RedisCache服务类
    /// </summary>
    public class RedisCacheService : ICacheService
    {
        protected IDatabase Cache;
        private readonly ConnectionMultiplexer _connectionMultiplexer;
        private readonly string _instance;

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="redisCacheOptions"></param>
        /// <param name="database"></param>
        public RedisCacheService(RedisCacheOptions redisCacheOptions, int database = 0)
        {
            _connectionMultiplexer = ConnectionMultiplexer.Connect(redisCacheOptions.Configuration);
            Cache = _connectionMultiplexer.GetDatabase(database);
            _instance = redisCacheOptions.InstanceName;
        }

        /// <summary>
        /// 获取Redis的key值
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public string GetKeyForRedis(string key)
        {
            return _instance + key;
        }

        public bool Exists(string key)
        {
            if (key == null)
            {
                throw new ArgumentNullException(nameof(key));
            }
            return Cache.KeyExists(GetKeyForRedis(key));
        }

        public Task<bool> ExistsAsync(string key)
        {
            throw new NotImplementedException();
        }

        public bool Add(string key, object value)
        {
            if (key == null)
            {
                throw new ArgumentNullException(nameof(key));
            }
            return Cache.StringSet(GetKeyForRedis(key), Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(value)));
        }

        public Task<bool> AddAsync(string key, object value)
        {
            throw new NotImplementedException();
        }

        public bool Add(string key, object value, TimeSpan expiresSliding, TimeSpan expiressAbsoulte)
        {
            if (key == null)
            {
                throw new ArgumentNullException(nameof(key));
            }
            return Cache.StringSet(GetKeyForRedis(key), Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(value)),
                expiressAbsoulte);
        }

        public Task<bool> AddAsync(string key, object value, TimeSpan expiresSliding, TimeSpan expiressAbsoulte)
        {
            throw new NotImplementedException();
        }

        public bool Add(string key, object value, TimeSpan expiresIn, bool isSliding = false)
        {
            if (key == null)
            {
                throw new ArgumentNullException(nameof(key));
            }
            return Cache.StringSet(key, Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(value)), expiresIn);
        }

        public Task<bool> AddAsync(string key, object value, TimeSpan expiresIn, bool isSliding = false)
        {
            throw new NotImplementedException();
        }

        public bool Remove(string key)
        {
            if (key == null)
            {
                throw new ArgumentNullException(nameof(key));
            }
            return Cache.KeyDelete(GetKeyForRedis(key));
        }

        public Task<bool> RemoveAsync(string key)
        {
            throw new NotImplementedException();
        }

        public void RemoveAll(IEnumerable<string> keys)
        {
            if (keys == null)
            {
                throw new ArgumentNullException(nameof(keys));
            }
            keys.ToList().ForEach(item => Remove(item));
        }

        public Task RemoveAllAsync(IEnumerable<string> keys)
        {
            throw new NotImplementedException();
        }

        public T Get<T>(string key) where T : class
        {
            if (key == null)
            {
                throw new ArgumentNullException();
            }
            var value = Cache.StringGet(GetKeyForRedis(key));

            if (!value.HasValue)
            {
                return default(T);
            }

            return JsonConvert.DeserializeObject<T>(value);
        }

        public Task<T> GetAsync<T>(string key) where T : class
        {
            throw new NotImplementedException();
        }

        public object Get(string key)
        {
            if (key == null)
            {
                throw new ArgumentNullException();
            }
            var value = Cache.StringGet(GetKeyForRedis(key));

            if (!value.HasValue)
            {
                return null;
            }

            return JsonConvert.DeserializeObject(value);
        }

        public Task<object> GetAsync(string key)
        {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> GetAll(IEnumerable<string> keys)
        {
            if (keys == null)
            {
                throw new ArgumentNullException();
            }

            var dictionary = new Dictionary<string, Object>();
            keys.ToList().ForEach(item => dictionary.Add(item, Get(GetKeyForRedis(item))));
            return dictionary;
        }

        public Task<IDictionary<string, object>> GetAllAsync(IEnumerable<string> keys)
        {
            throw new NotImplementedException();
        }

        public bool Replace(string key, object value)
        {
            if (key == null)
            {
                throw new ArgumentNullException();
            }

            if (Exists(key))
            {
                if (!Remove(key))
                {
                    return false;
                }
            }

            return Add(key, value);
        }

        public Task<bool> ReplaceAsync(string key, object value)
        {
            throw new NotImplementedException();
        }

        public bool Replace(string key, object value, TimeSpan expiresSliding, TimeSpan expiressAbsoulte)
        {
            if (key == null)
            {
                throw new ArgumentNullException();
            }

            if (Exists(key))
            {
                if (!Remove(key))
                {
                    return false;
                }
            }

            return Add(key, value, expiresSliding, expiressAbsoulte);
        }

        public Task<bool> ReplaceAsync(string key, object value, TimeSpan expiresSliding, TimeSpan expiressAbsoulte)
        {
            throw new NotImplementedException();
        }

        public bool Replace(string key, object value, TimeSpan expiresIn, bool isSliding = false)
        {
            if (key == null)
            {
                throw new ArgumentNullException();
            }

            if (Exists(key))
            {
                if (isSliding)
                {
                    if (!Remove(key))
                    {
                        return false;
                    }
                }
            }

            return Add(key, value, expiresIn, isSliding);
        }

        public Task<bool> ReplaceAsync(string key, object value, TimeSpan expiresIn, bool isSliding = false)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// 释放
        /// </summary>
        public void Dispose()
        {
            _connectionMultiplexer?.Dispose();
            GC.SuppressFinalize(this);
        }
    }
}