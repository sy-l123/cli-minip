/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-multi-assign */
/* eslint-disable no-undef */
/* eslint-disable prefer-rest-params */
/* eslint-disable prefer-const */
/**
 * description: 参考借鉴 Node.js 的 EventEmitter
 * 对象管理 event 事件
 * @func on 监听
 * @func emit 触发
 * @func once 监听只执行一次
 * @func remove 移除某个类型的某个事件
 * @func removeAll 移除某个类型的全部事件/所有类型的全部事件
 */
class EventEmitter {
  constructor() {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  /**
   * emit 触发事件
   * @param type 事件名
   * @param ...args 参数
   */
  emit(type) {
    let events; let handler; let len; let
      isFn;

    events = this._events;
    handler = events[type];

    if (!handler) { return false; }

    isFn = typeof handler === 'function';
    len = arguments.length;

    // 优化性能
    switch (len) {
      case 0:
        throw new Error('"emit" not have arguments');
      case 1:
        emitNone(handler, isFn, this);
        break;
      case 2:
        emitOne(handler, isFn, this, arguments[1]);
        break;
      case 3:
        emitTwo(handler, isFn, this, arguments[1], arguments[2]);
        break;
      case 4:
        emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
        break;
      default:
        args = new Array(len - 1);
        for (let i = 1; i < len; i++) {
          args[i - 1] = arguments[i];
        }
        emitMany(handler, isFn, this, args);
    }

    return true;
  }

  one(type, listener) {
    let events;
    if (typeof listener !== 'function') { throw new Error('"listener" argument must be a function'); }

    events = this._events;
    console.log(events);
    if (typeof events === 'undefined') {
      events = this._events = Object.create(null);
      this._eventsCount = 0;
    }

    events[type] = listener;
    ++this._eventsCount;
    return this;
  }

  _addListener(type, listener, prepend) {
    let events;
    let existing;
    if (typeof listener !== 'function') { throw new Error('"listener" argument must be a function'); }

    events = this._events;
    console.log(events);

    if (typeof events === 'undefined') {
      events = this._events = Object.create(null);
      this._eventsCount = 0;
    } else {
      existing = events[type];
    }

    if (!existing) {
      existing = events[type] = listener;
      ++this._eventsCount;
    } else if (typeof existing === 'function') {
      existing = events[type] = prepend ? [listener, existing] : [existing, listener];
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    return this;
  }

  /**
   * on 监听事件
   * @param type 事件名
   * @param listener 监听函数
   */
  on(type, listener) {
    return this._addListener(type, listener, false);
  }

  /**
   * once 监听只执行一次事件
   * @param type 事件名
   * @param listener 只执行一次的监听函数
   */
  once(type, listener) {
    if (typeof listener !== 'function') { throw new Error('"listener" argument must be a function'); }
    this.on(type, _onceWrap(this, type, listener));
    return this;
  }

  /**
   * prepend 优先监听事件
   * @param type 事件名
   * @param listener 要优先的监听函数
   */
  prepend(type, listener) {
    return this._addListener(type, listener, true);
  }

  /**
   * prependOnce 优先只执行一次的监听事件
   * @param type 事件名
   * @param listener 要优先且只执行一次的监听函数
   */
  prependOnce(type, listener) {
    if (typeof listener !== 'function') { throw new TypeError('"listener" argument must be a function'); }
    this.prepend(type, _onceWrap(this, type, listener));
    return this;
  }

  /**
   * remove 移除的监听事件
   * @param type 事件名
   * @param listener 要移除的监听函数（可选）
   */
  remove(type, listener) {
    let list; let events; let position; let
      originalListener;

    if (typeof listener !== 'function') { throw new TypeError('"listener" argument must be a function'); }

    events = this._events;
    if (!events) {
      return this;
    }

    list = events[type];
    if (!list) {
      return this;
    }

    if (list === listener || list.listener === listener) {
      if (--this._eventsCount === 0) {
        this._events = Object.create(null);
      } else {
        delete events[type];
      }
    } else if (typeof list !== 'function') {
      position = -1;

      for (let i = list.length - 1; i >= 0; i--) {
        if (list[i] === listener || list[i].listener === listener) {
          originalListener = list[i].listener;
          position = i;
          break;
        }
      }

      if (position < 0) {
        return this;
      }

      if (position === 0) {
        list.shift();
      } else {
        spliceOne(list, position);
      }

      if (list.length === 1) {
        events[type] = list[0];
      }
    }

    return this;
  }

  /**
   * removeAll 移除某事件名的全部监听事件/移除全部事件名的事件
   * @param type 事件名
   */
  removeAll(type) {
    let listeners; let
      events;

    events = this._events;

    if (!events) { return this; }

    if (arguments.length === 0) {
      const keys = Object.keys(events);
      let key;
      for (let i = 0; i < keys.length; ++i) {
        key = keys[i];
        this.removeAll(key);
      }
      this._events = Object.create(null);
      this._eventsCount = 0;
      return this;
    }

    listeners = events[type];

    if (typeof listeners === 'function') {
      this.remove(type, listeners);
    } else if (listeners !== undefined) {
      for (let i = listeners.length - 1; i >= 0; i--) {
        this.remove(type, listeners[i]);
      }
    }

    return this;
  }

  eventNames() {
    return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
  }
}

const emitNone = (handler, isFn, self) => {
  if (isFn) {
    handler.call(self);
  } else {
    const len = handler.length;
    const listeners = arrayClone(handler, len);
    for (let i = 0; i < len; ++i) { listeners[i].call(self); }
  }
};

const emitOne = (handler, isFn, self, arg1) => {
  if (isFn) {
    handler.call(self, arg1);
  } else {
    const len = handler.length;
    const listeners = arrayClone(handler, len);
    for (let i = 0; i < len; ++i) { listeners[i].call(self, arg1); }
  }
};

const emitTwo = (handler, isFn, self, arg1, arg2) => {
  if (isFn) {
    handler.call(self, arg1, arg2);
  } else {
    const len = handler.length;
    const listeners = arrayClone(handler, len);
    for (let i = 0; i < len; ++i) { listeners[i].call(self, arg1, arg2); }
  }
};

const emitThree = (handler, isFn, self, arg1, arg2, arg3) => {
  if (isFn) {
    handler.call(self, arg1, arg2, arg3);
  } else {
    const len = handler.length;
    const listeners = arrayClone(handler, len);
    for (let i = 0; i < len; ++i) { listeners[i].call(self, arg1, arg2, arg3); }
  }
};

const emitMany = (handler, isFn, self, args) => {
  if (isFn) {
    handler.apply(self, args);
  } else {
    const len = handler.length;
    const listeners = arrayClone(handler, len);
    for (let i = 0; i < len; ++i) { listeners[i].apply(self, args); }
  }
};

const spliceOne = (list, index) => {
  for (; index + 1 < list.length; index++) { list[index] = list[index + 1]; }
  list.pop();
};

function onceWrapper(...args) {
  if (!this.fired) {
    this.target.remove(this.type, this.wrapFn);
    this.fired = true;
    Reflect.apply(this.listener, this.target, args);
  }
}

const _onceWrap = (target, type, listener) => {
  const state = {
    fired: false,
    wrapFn: undefined,
    target,
    type,
    listener,
  };
  const wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
};

function arrayClone(arr, n) {
  const copy = new Array(n);
  for (let i = 0; i < n; ++i) { copy[i] = arr[i]; }
  return copy;
}

const event = new EventEmitter();

export default event;
