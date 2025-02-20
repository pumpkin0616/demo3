import { number } from 'echarts';
import Mock from 'mockjs';

// 定义模拟数据
Mock.mock('/api/user', 'get', {
  code: 200,
  message: 'success',
  data: {
    'id|10000-99999': 1, // 随机生成 10000~99999 的数字
    name: '@name', // 随机生成姓名
    'age|18-60': 1, // 随机生成 18~60 的数字
    city: '@city', // 随机生成城市
  }
});

// 还可以添加更多接口
Mock.mock('/api/list', 'post', {
  code: 200,
  message: 'success',
  data: {
    'list|1-10': [
      {
        'id|+1': 1,
        name: '@cname',
        title: '@title(5, 10)', // 随机生成 5 到 10 个字符的标题
      }
    ]
  }
});

Mock.mock('/user/list', 'post', {
  code: 200,
  message: 'success',
  data: {
    'list|500': [
      {
        'id|+1': 1,
        name: '@cname',
        'number|1-3': 1,
        email: '@email',
      }
    ]
  }
});
// 动态生成固定数量的数据
Mock.mock('/task/list', 'post', (options) => {
  // 从请求体中获取参数
  const { body } = options;
  const params = JSON.parse(body);
  const { names } = params.body; // 如果未传递 `count`，默认生成 10 条数据
  const result = {};
  console.log(names, 'params');

  names.forEach(({ name, number }, index) => {
    const retemp = Array.from({ length: number }, () => {
      return {
        'id|+1': 1,
        name: name,
        email: '@email',
        title: '@title(1,10)',
        title1: '@title(1,10)',
        title2: '@title(1,10)',
        title3: '@title(1,10)',
        title4: '@title(1,10)',
        title5: '@title(1,10)',
        title6: '@title(1,10)',
      };
    });
    result[name] = retemp;
  });
  console.log(result, 'result----api');
  // 使用 Mock.js 动态生成数据
  return Mock.mock({
    code: 200,
    // message: '@pick(["Success", "Created", "Not Found"])',
    message: 'success',
    data: {
      result
    },
  });
});
console.log('Mock 数据已加载');
