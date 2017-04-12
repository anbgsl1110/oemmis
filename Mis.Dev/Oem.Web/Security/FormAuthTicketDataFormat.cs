using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Oem.Data.Service.UserDto;
using Oem.Services.Services.User;

namespace Oem.Web.Security
{
    public class FormsAuthTicketDataFormat : ISecureDataFormat<AuthenticationTicket>
    {
        public readonly string AuthenticationScheme;

        public FormsAuthTicketDataFormat(string authenticationScheme)
        {
            AuthenticationScheme = authenticationScheme;
        }

        public AuthenticationTicket Unprotect(string protectedText, string purpose)
        {
            //Get FormsAuthenticationTicket from asp.net web api
            var formsAuthTicket = GetFormsAuthTicket(protectedText);
            var name = formsAuthTicket.Name;
            DateTime issueDate = formsAuthTicket.IssueDate;
            DateTime expiration = formsAuthTicket.Expiration;

            //Create AuthenticationTicket
            var claimsIdentity = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, name) });
            var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);
            var authProperties = new Microsoft.AspNetCore.Http.Authentication.AuthenticationProperties
            {
                IssuedUtc = issueDate,
                ExpiresUtc = expiration
            };
            var ticket = new AuthenticationTicket(claimsPrincipal, authProperties, AuthenticationScheme);
            return ticket;
        }

        public string Protect(AuthenticationTicket data)
        {
            throw new NotImplementedException();
        }

        public string Protect(AuthenticationTicket data, string purpose)
        {
            throw new NotImplementedException();
        }

        public AuthenticationTicket Unprotect(string protectedText)
        {
            throw new NotImplementedException();
        }

        private FormsAuthTicketDto GetFormsAuthTicket(string cookie)
        {
            return new UserService().DecryptCookie(cookie).Data;
        }
    }
}