namespace Awdware.Facade.Dtos.Led
{
    public class LedConfigFileDto
    {
        public string ServerHost { get; set; }
        public int ServerPort { get; set; }
        public bool ServerUseHttps { get; set; }
        public string UserId { get; set; }
        public string ConfigName { get; set; }
        public string ComPortName { get; set; }
        public string Id { get; set; }
    }
}
