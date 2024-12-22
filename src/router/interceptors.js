import Cookies from "js-cookie";

function isLogin () {
  const username = Cookies.get('username');
  const token = Cookies.get('token');
  if (token && username) {
		return true;
	} else {
		return false;
	}
}
function routerBeforeEachFunc (to, from, next) {
  // console.log('to', to,);
  // console.log('from', from,);
  // console.log('isLogin', isLogin,);
  if (to.meta && to.meta.title) {
    document.title = to.meta.title; // 更新页面标题
  } else {
    document.title = '默认标题'; // 如果没有指定标题，则设置为默认标题
  }
  if (isLogin() || to.path === "/login") {
    next();
  } else {
    console.log('window.location.href', window.location.href);
    // window.location.href = "/login";
    // next(false);
    next({ name: 'login', query: { redirect: to.fullPath } });
  }
}
export {
  routerBeforeEachFunc
};
