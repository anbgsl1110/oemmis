using System.Collections.Generic;
using Oem.Data.Table;

namespace Oem.IProviders.Admin
{
    public interface IUserProvider
    {
        List<UserRepo> GetUserList();
    }
}