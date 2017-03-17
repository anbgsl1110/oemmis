using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Oem.Data.Enum;
using Oem.Data.Table;
using Oem.Models.Resonse;

namespace Oem.Web.WebApi
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
