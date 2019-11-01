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
