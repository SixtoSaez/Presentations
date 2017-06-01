using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Http;

namespace KWebStartup
{
    public class Startup
    {
        public void Configure(IApplicationBuilder app)
        {
            app.Run(async context => await context.Response.WriteAsync("Hello!"));
        }
    }
}
