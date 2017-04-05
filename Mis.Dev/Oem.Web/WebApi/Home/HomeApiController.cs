﻿using Microsoft.AspNetCore.Mvc;
using Oem.Data.Table.OrgUser;

namespace Oem.Web.WebApi.Home
{
    public class HomeApiController : ApiBaseController
    {
        // POST api/values
        [HttpPost]
        public int Post(int id)
        {
            return id;
        }

        [HttpGet]
        public UserRepo Get()
        {
            return new UserRepo(){Id = 1};
        }
    }
}
