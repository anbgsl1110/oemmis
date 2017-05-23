using Microsoft.AspNetCore.Mvc;
using Oem.Common.CacheHelper;
using Oem.Data.Table.SysSetting;
using Oem.Services.IServices.Order;
using Oem.Services.Services.Auxiliary;
using Oem.Services.Services.BaseInfo;
using Oem.Services.Services.Dispatch;
using Oem.Services.Services.Order;
using Oem.Services.Services.Repertory;
using Oem.Services.Services.SysSetting;
using Oem.Services.Services.User;
using Oem.Web.Security;

namespace Oem.Web.Controllers
{
    public class BaseController : Controller
    {        
        public readonly ICurrentUser CurrentUser;
        
        protected readonly ScanCodeService ScanCodeService;
   
        protected readonly CompanyService CompanyService;
        protected readonly OriginalMaterialsService OriginalMaterialsService;
        protected readonly ProductService ProductService;
        protected readonly ProductBomService ProductBomService;
        protected readonly SupplerService SupplerService;
        protected readonly WarehouseService WarehouseService;
        
        protected readonly DispatchDetailService DispatchDetailService;
        protected readonly DispatchService DispatchService;
        
        protected readonly OrderService OrderService;
        protected readonly OrderDetailsService OrderDetailsService;
        protected readonly PurchaseService PurchaseService;
        protected readonly IPurchaseDetailsService PurchaseDetailsService;
        protected readonly RequisitionService RequisitionService;
        protected readonly RequisitionDetailsService RequisitionDetailsService;
        
        protected readonly WarehouseManagerDetailService WarehouseManagerDetailService;
        protected readonly WarehouseOprationService WarehouseOprationService;
        
        protected readonly UserService UserService;
        protected readonly RoleService RoleService;
        protected readonly LogService LogService;
        
        public BaseController(ICacheService cacheService)
        {
            CurrentUser = new CurrentUser(cacheService);
            
            ScanCodeService = new ScanCodeService();
            
            CompanyService = new CompanyService();
            OriginalMaterialsService = new OriginalMaterialsService();
            ProductService = new ProductService();
            ProductBomService = new ProductBomService();
            SupplerService = new SupplerService();
            WarehouseService = new WarehouseService();
            
            DispatchDetailService = new DispatchDetailService();
            DispatchService = new DispatchService();
            
            OrderService = new OrderService();
            OrderDetailsService = new OrderDetailsService();
            PurchaseService = new PurchaseService();
            PurchaseDetailsService = new PurchaseDetailService();
            RequisitionService = new RequisitionService();
            RequisitionDetailsService = new RequisitionDetailsService();
            
            WarehouseManagerDetailService = new WarehouseManagerDetailService();
            WarehouseOprationService = new WarehouseOprationService();
            
            UserService = new UserService();
            RoleService = new RoleService();
            LogService = new LogService();
        }
        
/*        /// <summary>
        /// 错误界面
        /// </summary>
        /// <returns></returns>
        public IActionResult Error()
        {
            return View();
        }*/
        
        /// <summary>
        /// 记录日志
        /// </summary>
        public void WriteLog(LogRepo logRepo){
            LogService service = new LogService();
            logRepo.UserId = CurrentUser.UserId;
            
            service.Insert(logRepo);
        }
    }   
}