using System.Collections.Generic;
using Oem.Data.Table.OrgStructure;
using Oem.IProviders.Admin;
using Oem.Providers.Admin;
using Xunit;

namespace Oem.WebTest.IProvider.Admin
{
    public class UserProviderTest
    {
        private readonly IUserProvider _provider;

        public UserProviderTest()
        {
            _provider = new Userprovider();
        }

        /// <summary>
        /// 获取用户列表单元测试
        /// </summary>
        /// <returns></returns>
        [Fact]
        public void GetUserList()
        {
            List<UserRepo> userList = _provider.GetUserList();
            Assert.NotNull(userList);
        }
    }
}