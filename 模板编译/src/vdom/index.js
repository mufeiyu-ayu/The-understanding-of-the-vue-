import { createElement, createTextVnode } from './vnode';

function renderMixin (Vue) {
  Vue.prototype._c = function () {
    return createElement(...arguments);
  }

  Vue.prototype._s = function (value) {
    if (value === null) return;
    return typeof value === 'object' ? JSON.stringify(value) : value;
  }

  Vue.prototype._v = function (text) {
    return createTextVnode(text);
  }

  Vue.prototype._render = function () {
    const vm = this,
          render = vm.$options.render,
          vnode = render.call(vm);
    
    return vnode;
  }
}

export {
  renderMixin
}