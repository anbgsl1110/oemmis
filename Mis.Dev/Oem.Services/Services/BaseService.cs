using Oem.Providers.IProviders.Admin;
using Oem.Providers.Providers.Admin;
using Oem.Providers.Providers.Auxiliary;
using Oem.Providers.Providers.BaseInfo;
using Oem.Providers.Providers.Dispatch;
using Oem.Providers.Providers.Order;
using Oem.Providers.Providers.Repertory;
using Oem.Providers.Providers.SysSetting;

namespace Oem.Services.Services
{
    /// <summary>
    /// 服务对象基类
    /// </summary>
    public class BaseService
    {        
        protected readonly ScanCodeProvider ScanCodeProvider;
   
        protected readonly CompanyProvider CompanyProvider;
        protected readonly OriginalMaterialsProvider OriginalMaterialsProvider;
        protected readonly ProductProvider ProductProvider;
        protected readonly ProductBomProvider ProductBomProvider;
        protected readonly SupplerProvider SupplerProvider;
        protected readonly WarehouseProvider WarehouseProvider;
        
        protected readonly DispatchDetailProvider DispatchDetailProvider;
        protected readonly DispatchProvider DispatchProvider;
        
        protected readonly OrderProvider OrderProvider;
        protected readonly OrderDetailsProvider OrderDetailsProvider;
        protected readonly PurchaseProvider PurchaseProvider;
        protected readonly PurchaseDetailsProvider PurchaseDetailsProvider;
        protected readonly RequisitionProvider RequisitionProvider;
        protected readonly RequisitionDetailsProvider RequisitionDetailsProvider;
        
        protected readonly WarehouseManagerDetailProvider WarehouseManagerDetailProvider;
        protected readonly WarehouseOprationProvider WarehouseOprationProvider;
        
        protected readonly IUserProvider UserProvider;
        protected readonly RoleProvider RoleProvider;
        protected readonly LogProvider LogProvider;
        
        public BaseService()
        {
            ScanCodeProvider = new ScanCodeProvider();
            
            CompanyProvider = new CompanyProvider();
            OriginalMaterialsProvider = new OriginalMaterialsProvider();
            CompanyProvider = new CompanyProvider();
            ProductProvider = new ProductProvider();
            ProductBomProvider = new ProductBomProvider();
            SupplerProvider = new SupplerProvider();
            WarehouseProvider = new WarehouseProvider();
            
            DispatchDetailProvider = new DispatchDetailProvider(); 
            DispatchProvider = new DispatchProvider();
            
            OrderProvider = new OrderProvider();
            OrderDetailsProvider = new OrderDetailsProvider();
            PurchaseProvider = new PurchaseProvider();
            PurchaseDetailsProvider = new PurchaseDetailsProvider();
            RequisitionProvider = new RequisitionProvider();
            RequisitionDetailsProvider = new RequisitionDetailsProvider();
            
            WarehouseManagerDetailProvider = new WarehouseManagerDetailProvider();
            WarehouseOprationProvider = new WarehouseOprationProvider();
            
            UserProvider = new Userprovider();
            RoleProvider = new RoleProvider();
            LogProvider = new LogProvider(); 
        }
    }
}