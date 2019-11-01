﻿using WebApi.Entities;
using WebApi.Models.Enums;

namespace WebApi.Models
{
    public class ConfirmKeyUsageResult
    {
        public ConfirmKeyUsageSuccess Success { get; set; }
        public WebUser WebUser { get; set; }
    }
}
