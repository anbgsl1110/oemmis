using System;

namespace Oem.Data.ServiceModel.UserDto
{
    public class FormsAuthTicketDto
    {
        public string Name { get; set; }
        public DateTime IssueDate { get; set; }
        public DateTime Expiration { get; set; }
    }
}