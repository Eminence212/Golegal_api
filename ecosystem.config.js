module.exports = {
  apps: [
    {
      name: "Node server",
      exec_mode: "cluster",
      instances: 1,
      script: "./server.js",
      args: "",
    },
  ],
};
