
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Oem.Data.Table.Auxiliary;
using Oem.Services.Services.Auxiliary;

namespace Oem.Web.Controllers
{
    public class AuxiliaryController : BaseController
    {
        /// <summary>
        /// 扫码流水
        /// </summary>
        /// <returns></returns>
        public IActionResult ScanList()
        {
            ScanCodeService service = new ScanCodeService();
            var result = service.Select(new 
                ScanCodeRepo(),0,1000).Data.ToList();
            var list = result.Where(p => p.Id > 0).Take(10).ToList();
            ViewBag.List = list;
            
            return View();
        }

        /// <summary>
        /// 扫码添加
        /// </summary>
        /// <returns></returns>
        public IActionResult ScanAdd()
        {
            return View();
        }

        /// <summary>
        /// 扫码详情
        /// </summary>
        /// <returns></returns>
        public IActionResult ScanListDetail()
        {
            return View();
        }
    }
}