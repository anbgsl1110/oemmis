using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;

namespace Oem.Common.CacheHelper
{
    /// <summary>
    /// MemoryCache缓存服务对象
    /// </summary>
    public class MemoryCacheService  : ICacheService
    {
        protected IMemoryCache Cache;

        public MemoryCacheService(IMemoryCache memoryCache)
        {
            Cache = memoryCache;
        }

        public bool Exists(string key)
        {
            if (key == null)
            {
                throw new ArgumentNullException(nameof(key));
            }
            object cached;
            return Cache.TryGetValue(key, out cached);
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
            if (value == null)
            {
                throw new ArgumentNullException(nameof(value));
            }
            Cache.Set(key, value);
            return Exists(key);
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
            if (value == null)
            {
                throw new ArgumentNullException(nameof(value));
            }
            Cache.Set(key, value,
                new MemoryCacheEntryOptions().SetSlidingExpiration(expiresSliding)
                    .SetAbsoluteExpiration(expiressAbsoulte));
            return Exists(key);
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
            if (value == null)
            {
                throw new ArgumentNullException(nameof(value));
            }
            if (isSliding)
            {
                Cache.Set(key, value, new MemoryCacheEntryOptions().SetSlidingExpiration(expiresIn));
            }
            else
            {
                Cache.Set(key, value, new MemoryCacheEntryOptions().SetAbsoluteExpiration(expiresIn));
            }
            return Exists(key);
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
            Cache.Remove(key);
            return !Exists(key);
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
            keys.ToList().ForEach(item => Cache.Remove(item));
        }

        public Task RemoveAllAsync(IEnumerable<string> keys)
        {
            throw new NotImplementedException();
        }

        public T Get<T>(string key) where T : class
        {
            if (key == null)
            {
                throw new ArgumentNullException(nameof(key));
            }
            return Cache.Get<T>(key);
        }

        public Task<T> GetAsync<T>(string key) where T : class
        {
            throw new NotImplementedException();
        }

        public object Get(string key)
        {
            if (key == null)
            {
                throw new ArgumentNullException(nameof(key));
            }
            return Cache.Get(key);
        }

        public Task<object> GetAsync(string key)
        {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> GetAll(IEnumerable<string> keys)
        {
            if (keys == null)
            {
                throw new ArgumentOutOfRangeException(nameof(keys));
            }

            var dict = new Dictionary<string, object>();
            keys.ToList().ForEach(item => dict.Add(item, Cache.Get(item)));
            return dict;
        }

        public Task<IDictionary<string, object>> GetAllAsync(IEnumerable<string> keys)
        {
            throw new NotImplementedException();
        }

        public bool Replace(string key, object value)
        {
            if (key == null)
            {
                throw new ArgumentNullException(nameof(key));
            }
            if (value == null)
            {
                throw new ArgumentNullException(nameof(value));
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
                throw new ArgumentNullException(nameof(key));
            }
            if (value == null)
            {
                throw new ArgumentNullException(nameof(value));
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
                throw new ArgumentNullException(nameof(key));
            }
            if (value == null)
            {
                throw new ArgumentNullException(nameof(value));
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
            Cache?.Dispose();
            GC.SuppressFinalize(this);
        }
    }
}