# MOP System

## Do not push to master branch until code review or end of Sprint. !!!

### Once you have SQL Server configured edit your appsettings.json to apply your connection

### The DB name should remain the same for all instances which I named MOP.


#### The SQLServer connection is added in program.cs to allow interaction with DB instance: 

~~~
builder.Services.AddDbContext<MOPUNDB>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MOPUNDB") ?? throw new InvalidOperationException("Connection string 'MOP DATABASE NOT FOUND' not found.")));
~~~

#### Appsettings.json configuration:

~~~
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  // EDIT THIS LINE WITH YOUR CONNECTION  IE* JOHN\\SQLEXPRESS  SHOULD BE PCNAME\\SQLEXPRESS LEAVE EVERYTHING ELSE THE SAME
  "ConnectionStrings": { "MOPUNDB": "Data Source=JOHN\\SQLEXPRESS;Initial Catalog=Mop;Integrated Security=True; TrustServerCertificate=True;" }
}
~~~

#### CORS is used in this application to allow API consumption added in program.cs file:

~~~
app.UseCors(policy => policy.AllowAnyHeader()
                            .AllowAnyMethod()
                            .SetIsOriginAllowed(origin => true)
                            .AllowCredentials());

~~~
