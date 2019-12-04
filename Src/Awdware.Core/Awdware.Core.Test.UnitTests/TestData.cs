using Awdware.Core.Facade.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace UnitTest
{
    public class TestData
    {
        public RegisterRequestDto BasicRegisterRequestDto
        {
            get
            {
                return new RegisterRequestDto
                {
                    Username = "maxmustermann",
                    Email = "max@mustermann.de",
                    Firstname = "Max",
                    Lastname = "Mustermann",
                    Password = "thisIsMyPW!1",
                    Password2 = "thisIsMyPW!1"
                };
            }
        }
    }
}
