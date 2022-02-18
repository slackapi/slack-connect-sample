let html = require("./../templates");

    const customRoutes = [
        {
          path: "/slack/install/",
          method: ["GET"],
          handler: (req, res) => {
            res.writeHead(200);
            res.end(html.normalInstall);
          },
        },
        {
            path: "/slack/install/userToken",
            method: ["GET"],
            handler: (req, res) => {
              res.writeHead(200);
              res.end(html.userTokenInstall);
            },
          },
      ]
      return  customRoutes
  
module.exports = { customRoutes };
