// See https://aka.ms/new-console-template for more information
using Microsoft.PowerPlatform.Dataverse.Client;
using Microsoft.Xrm.Sdk.Query;
using System.Net;
using UC_EarlyBounds;

var url = "https://org70c66a0d.crm4.dynamics.com";
var appId = "461843d0-0502-4502-981b-419ea6af1af1";
var redirectUri = "https://localhost/";

var connectionString = $"AuthType=OAuth;Integrated Security=true;Url={url};AppId={appId};RedirectUri={redirectUri};LoginPrompt=Auto";

ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
ServiceClient serviceClient = new ServiceClient(connectionString);

var query = new QueryExpression(Account.EntityLogicalName)
{
    ColumnSet = new ColumnSet(true)
};

var accounts = serviceClient.RetrieveMultiple(query).Entities.Select(entity => entity.ToEntity<Account>()).ToList();

foreach(var account in accounts)
{
    Console.WriteLine($"Id: {account.Id}, name: {account.Name}");
}

