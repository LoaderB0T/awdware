using Awdware.Data.Facade.Entities;

namespace Awdware.Business.Utils.Models
{
    public class ConfirmKeyUsageResult
    {
        public ConfirmKeyUsageSuccess Success { get; set; }
        public WebUser WebUser { get; set; }
    }
}
