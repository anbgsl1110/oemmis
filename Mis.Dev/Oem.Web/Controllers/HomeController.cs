using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Oem.Common.CacheHelper;

namespace Oem.Web.Controllers
{
    public class HomeController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Login()
        {
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }

        public IActionResult Home()
        {
            return View();
        }

        public HomeController(ICacheService cacheService) : base(cacheService)
        {
        }
    }
}