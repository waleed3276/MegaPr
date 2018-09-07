using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MegaProject.Startup))]
namespace MegaProject
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
