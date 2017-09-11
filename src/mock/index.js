import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers } from '../resources/user';

export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    const mock = new MockAdapter(axios);
    mock.onPost('/login').reply((config) => {
      const { username, password } = JSON.parse(config.data);
      return new Promise((resolve, reject) => {
        let user = null;
        setTimeout(() => {
          const hasUser = LoginUsers.some((u) => {
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u));
              user.password = undefined;
              return true;
            }
            return false;
          });

          resolve([200, hasUser ? {
            code: 200,
            msg: '请求成功！！！',
            user
          } : {
            code: 500,
            msg: '用户名或密码错误！！！'
          }]);
        }, Math.random() * 1000 + 1000);
      });
    });
  }
};
