module.exports = {
  /**
   * 按需开启注释
   */

  /**
   * 协议文件的来源
   * 支持多种协议文件来源，通常一个项目只使用其中一种
   */
  inputs: {
    // tolstoy web
    // web: {
      // eg: serviceIds: [4354],
      // serviceIds: [4354],
    // },
    // rick pb 服务
    rick: {
      // eg: nodeStubNpm: ['@tencent/vip-cardcenter-srv'],
      nodeStubNpm: [],
      // url: https://trpc.rick.woa.com/rick/pb/detail?id=49910 或者 url中id: 49910
      idOrUrl: [],
    },
    // git 仓库
    /**
     * eg:
     * git: [{
      url: 'git@git.woa.com:xy-vip/logic/xy-card/rpc.git',
      branch: 'master',
      entry: ['proto/cardcentersrv_if.proto']
    }],
     */
    // git: [],
  },

  /**
   * 功能模块的配置
   */
  modules: {
    // http 服务
    server: {
      // port: 3001,
      mock: {
        // baseUrl: '/api',
        // 生成 mock 数据的配置
        // gene: {
          // 生成 mock 数据过程中的一些钩子
          // hooks: {
            // beforeGenerateResponse: (data) => data,
          // },
          // 输出mock数据的路径
        // output: './mocker',
      }
      // },
    },
    sdk: {
      // 生成 sdk 功能
      // gene: {
        // output: './api',
      // }
    },
  },

  /**
   * 控制 protobuf parser 的行为，默认配置即可，通常不需要关心
   */
  protobuf: {
    keepCase: false,
  },
  /**
   * 输出产物的路径，会根据运行环境自动推断，通常不需要关心
   */
  output: {
    // 这里的优先级高于命令行参数
    baseDir: '',
  },
};
