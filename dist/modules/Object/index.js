function hasSymbols() {
    if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') {
        return false;
    }
    if (typeof Symbol.iterator === 'symbol') {
        return true;
    }
    var obj = {};
    var sym = Symbol('test');
    var symObj = Object(sym);
    if (typeof sym === 'string') {
        return false;
    }
    if (Object.prototype.toString.call(sym) !== '[object Symbol]') {
        return false;
    }
    if (Object.prototype.toString.call(symObj) !== '[object Symbol]') {
        return false;
    }
    var symVal = 42;
    obj[sym] = symVal;
    //@ts-ignore
    for (sym in obj) {
        return false;
    }
    if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) {
        return false;
    }
    if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) {
        return false;
    }
    var syms = Object.getOwnPropertySymbols(obj);
    if (syms.length !== 1 || syms[0] !== sym) {
        return false;
    }
    if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
    }
    if (typeof Object.getOwnPropertyDescriptor === 'function') {
        var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
            return false;
        }
    }
    return true;
}
;
var isFunction = function (fn) {
    return typeof fn === 'function' && String.prototype.toString.call(fn) === '[object Function]';
};
var isntObject = function (o) { return o === null || !(o instanceof Object || typeof o === 'object'); };
//@ts-ignore
var isArgs = Object.isArguments = function (val) {
    var str = Object.prototype.toString.call(val);
    var isArgs = str === '[object Arguments]';
    if (!isArgs)
        isArgs = str !== '[object Array]' && val !== null && typeof val === 'object' && typeof val.length === 'number' && val.length >= 0 && Object.prototype.toString.call(val.callee) === '[object Function]';
    return isArgs;
};
if (!Object.keys) {
    var has = Object.prototype.hasOwnProperty;
    var isEnumerable = Object.prototype.propertyIsEnumerable;
    var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
    var hasProtoEnumBug = isEnumerable.call(function () { }, 'prototype');
    var dontEnums = [
        'toString',
        'toLocaleString',
        'valueOf',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'constructor'
    ];
    var equalsConstructorPrototype = function (o) {
        var ctor = o.constructor;
        return ctor && ctor.prototype === o;
    };
    var excludedKeys = {
        $applicationCache: true,
        $console: true,
        $external: true,
        $frame: true,
        $frameElement: true,
        $frames: true,
        $innerHeight: true,
        $innerWidth: true,
        $onmozfullscreenchange: true,
        $onmozfullscreenerror: true,
        $outerHeight: true,
        $outerWidth: true,
        $pageXOffset: true,
        $pageYOffset: true,
        $parent: true,
        $scrollLeft: true,
        $scrollTop: true,
        $scrollX: true,
        $scrollY: true,
        $self: true,
        $webkitIndexedDB: true,
        $webkitStorageInfo: true,
        $window: true
    };
    var hasAutomationEqualityBug = (function () {
        if (typeof window === 'undefined') {
            return false;
        }
        for (var k in window) {
            try {
                if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
                    try {
                        equalsConstructorPrototype(window[k]);
                    }
                    catch (e) {
                        return true;
                    }
                }
            }
            catch (e) {
                return true;
            }
        }
        return false;
    }());
    var eCPINB = function (o) {
        if (typeof window === 'undefined' || !hasAutomationEqualityBug)
            return equalsConstructorPrototype(o);
        try {
            return equalsConstructorPrototype(o);
        }
        catch (e) {
            return false;
        }
    };
    Object.keys = function keys(object) {
        var isObject = object !== null && typeof object === 'object';
        var isFunction = Object.prototype.toString.call(object) === '[object Function]';
        var isArguments = isArgs(object);
        var isString = isObject && Object.prototype.toString.call(object) === '[object String]';
        var theKeys = [];
        if (!isObject && !isFunction && !isArguments) {
            throw new TypeError('Object.keys called on a non-object');
        }
        var skipProto = hasProtoEnumBug && isFunction;
        if (isString && object.length > 0 && !has.call(object, 0))
            for (var i = 0; i < object.length; ++i)
                theKeys.push(String(i));
        if (isArguments && object.length > 0) {
            for (var j = 0; j < object.length; ++j)
                theKeys.push(String(j));
        }
        else {
            for (var name in object)
                if (!(skipProto && name === 'prototype') && has.call(object, name))
                    theKeys.push(String(name));
        }
        if (hasDontEnumBug)
            for (var k = 0; k < dontEnums.length; ++k)
                if (!(eCPINB(object) && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k]))
                    theKeys.push(dontEnums[k]);
        return theKeys;
    };
}
if (!Object.assign) {
    Object.assign = function (target) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (typeof target == 'undefined' && target == null)
            throw new TypeError('target must be an object');
        var objTarget = Object(target);
        args.forEach(function (e) {
            var source = Object(e);
            var props = Object.keys(source);
            var getSymbols = hasSymbols() && (Object.getOwnPropertySymbols || hasSymbols() ? Object.getOwnPropertySymbols : null);
            if (getSymbols) {
                var syms = getSymbols(source);
                for (var i = 0; i < syms.length; ++i) {
                    var key = syms[i];
                    if (Object.prototype.propertyIsEnumerable.call(source, key))
                        Array.prototype.push.call(props, key);
                }
            }
            ;
            props.forEach(function (key) {
                var value = source[key];
                if (Object.prototype.propertyIsEnumerable.call(source, key))
                    objTarget[key] = value;
            });
        });
        return objTarget;
    };
}
if (!Object.is) {
    Object.is = function (a, b) {
        if (a === 0 && b === 0)
            return 1 / a === 1 / b;
        if (a === b)
            return true;
        if (a !== a && b !== b)
            return true;
        return false;
    };
}
if (!Object.setPrototypeOf) {
    Object.setPrototypeOf = { __proto__: [] } instanceof Array ? (function (obj, proto) {
        obj.__proto__ = proto;
        return obj;
    }) : function (obj, proto) {
        for (var prop in proto)
            if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
                obj[prop] = proto[prop];
            }
        return obj;
    };
}
if (!Object.getPrototypeOf) {
    Object.getPrototypeOf = function (o) {
        if (o !== Object(o)) {
            throw TypeError("Object.getPrototypeOf called on non-object");
        }
        return o.__proto__ || o.constructor.prototype || Object.prototype;
    };
}
if (typeof Object.getOwnPropertyNames !== "function") {
    Object.getOwnPropertyNames = function (o) {
        if (o !== Object(o)) {
            throw TypeError("Object.getOwnPropertyNames called on non-object");
        }
        var props = [], p;
        for (p in o) {
            if (Object.prototype.hasOwnProperty.call(o, p)) {
                props.push(p);
            }
        }
        return props;
    };
}
if (typeof Object.create !== "function") {
    //@ts-ignore
    Object.create = function create(prototype, properties) {
        if (!isntObject(prototype))
            throw new TypeError('Object.create may only be an Object or null');
        var obj = new Function('e', 'function Ctor() {}Ctor.prototype=e;return new Ctor')(prototype);
        obj.constructor.prototype = prototype;
        properties == undefined || Object.defineProperties(obj, properties);
        return obj;
    };
}
if (!Object.defineProperty) {
    //@ts-ignore
    Object.defineProperty = function (obj, key, descriptor) {
        if (isntObject(obj))
            throw new TypeError("Object.defineProperty called on non-object");
        if (isntObject(descriptor))
            throw new TypeError("Property description must be an object");
        if (["string", "number", "symbol"].includes(typeof key))
            throw new TypeError("Property name must be a non-empty string/number/symbol");
        var keystr = String(key);
        var check = function () {
            if (!Object.hasOwnProperty('__defineGetter__'))
                throw new TypeError('Getters & setters cannot be defined on this javascript engine');
            if ('value' in descriptor || 'writable' in descriptor)
                throw new TypeError('A property cannot both have accessors and be writable or have a value');
        };
        if ('get' in descriptor) {
            if (typeof descriptor.get !== 'function')
                throw new TypeError('Getter must be a function');
            check();
            //@ts-ignore
            Object.__defineGetter__.call(obj, keystr, descriptor.get);
        }
        else {
            obj[keystr] = descriptor.value;
        }
        ;
        if ('set' in descriptor) {
            if (typeof descriptor.set !== 'function')
                throw new TypeError('Setter must be a function');
            check();
            //@ts-ignore
            Object.__defineSetter__.call(obj, keystr, descriptor.set);
        }
        if ('value' in descriptor)
            obj[keystr] = descriptor.value;
        return obj;
    };
}
;
if (typeof Object.defineProperties !== "function") {
    Object.defineProperties = function (obj, properties) {
        if (isntObject(obj))
            throw TypeError("Object.defineProperties called on non-object");
        Object.keys(properties).forEach(function (n) { return Object.defineProperty(obj, n, properties[n]); });
        return obj;
    };
}
;
if (typeof Object.freeze !== "function") {
    Object.freeze = function (obj) {
        if (isntObject(obj))
            throw TypeError("Object.freeze called on non-object");
        return obj;
    };
}
//# sourceMappingURL=index.js.map