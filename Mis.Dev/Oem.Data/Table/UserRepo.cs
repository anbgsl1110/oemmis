using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Oem.Data.Table
{
    /// <summary>
    /// 用户
    /// </summary>
    public class UserRepo
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Url { get; set; }
        public int Age { get; set; }
        public string Password { get; set; }
    }
}
