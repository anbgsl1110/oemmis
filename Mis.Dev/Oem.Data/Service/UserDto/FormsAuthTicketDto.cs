using System;

namespace Oem.Data.Service.UserDto
{
    public class FormsAuthTicketDto
    {
        public string Name { get; set; }
        public DateTime IssueDate { get; set; }
        public DateTime Expiration { get; set; }
    }
}