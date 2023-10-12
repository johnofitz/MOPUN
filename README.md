# MOP System


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


#### Sample Pages:


<div style="display: inline-block; margin-right: 20px; margin-bottom: 50px;">
  <img src="/frontend-mopun/src/images/login.png" alt="Image 1" width="400" height="150" style="display: block;"/>
  <img src="/frontend-mopun/src/images/form.png" alt="Image 2" width="400" height="150" style="display: block;"/>
</div>

<div style="display: inline-block; margin-right: 20px; margin-bottom: 50px;">
  <img src="/frontend-mopun/src/images/table.png" alt="Image 1" width="400" height="150" style="display: block;"/>
  <!-- <img src="" alt="Image 2" width="400" height="150" style="display: block;"/> -->
</div>
