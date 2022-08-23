// document https://pm2.keymetrics.io/docs/usage/application-declaration/
module.exports = {
  apps: [{
    script: './src/server.js',
    watch: '.',
    env: {
      "NODE_ENV": "development",
    },
    env_production: {
      "NODE_ENV": "production"
    }
  }, {
    name: "api-fast",
    script: './src/server.js',
    instances: 4,
    exec_mode: "cluster",
    watch: ['./src/server.js']
  }],

  deploy: {
    production: {
      user: 'root',
      host: '192.168.1.55',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: '/var/www/production',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
    },
    dev: {
      user: 'node',
      host: '192.168.1.55',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/development',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env dev',
      env: {
        NODE_ENV: 'dev'
      }
    }
  }
};
