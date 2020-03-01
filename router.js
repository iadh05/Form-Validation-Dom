class Router {
  constructor() {
    this.routes = [];
  }
  get(uri, callback) {
    if (!uri || !callback) {
      throw new Error('uri or callback are missing');
    }
    if (typeof uri !== 'string') {
      throw new TypeError('uri must be string');
    }
    if (typeof callback !== 'function') {
      throw new TypeError('callback must be function');
    }
    this.routes.forEach(route => {
      if (route.uri === uri) {
        throw new Error('the uri alredy existed');
      }
    });
    const route = {
      uri,
      callback
    };
    this.routes.push(route);
  }
  init() {
    this.routes.some(route => {
      let regex = new RegExp(`^${route.uri}$`);
      let path = window.location.pathname;
      if (path.match(regex)) {
        let req = { path };
        return route.callback.call(this, req);
      }
    });
  }
}
export default Router;
