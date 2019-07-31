using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos
{
    public class LoginHelpRequestDto
    {
        public string Email { get; set; }
        public bool ForgotUsername { get; set; }
        public bool ForgotPassword { get; set; }
    }
}
