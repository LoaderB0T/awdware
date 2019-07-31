using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models.JwtPayloads
{
    public abstract class PayloadBase
    {
        public int Nbf { get; set; }
        public int Exp { get; set; }
        public string Iss { get; set; }
        public string Aud { get; set; }
    }
}
