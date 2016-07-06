var namespaceName = 'projectName';
var ns = {}[namespaceName] = {};
ns.util = {};

ns.util.log = function() {
	if (!!console) {
		console.log.apply(this, arguments)
	}
}
var log = ns.util.log;

ns.util.template = function(text, data, settings) {
	var _ = {};
	var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\t':     't',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };
	
	  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
	var slice            = Array.prototype.slice;
	var nativeForEach      = Array.prototype.forEach;
	var each = _.each = _.forEach = function(obj, iterator, context) {
	    if (obj == null) return obj;
	    if (nativeForEach && obj.forEach === nativeForEach) {
	      obj.forEach(iterator, context);
	    } else if (obj.length === +obj.length) {
	      for (var i = 0, length = obj.length; i < length; i++) {
	        if (iterator.call(context, obj[i], i, obj) === breaker) return;
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (var i = 0, length = keys.length; i < length; i++) {
	        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
	      }
	    }
	    return obj;
	  };
	_.templateSettings = {
	    evaluate: /<%([\s\S]+?)%>/g,
	    interpolate: /<%=([\s\S]+?)%>/g,
	    escape: /<%-([\s\S]+?)%>/g
	};
	_.defaults = function(obj) {
		each(slice.call(arguments, 1), function(source) {
			if (source) {
				for ( var prop in source) {
					if (obj[prop] === void 0) obj[prop] = source[prop];
				}
			}
		});
		return obj;
	};
	var render;
	settings = _.defaults({}, settings, _.templateSettings);

	// Combine delimiters into one regular expression via alternation.
	var matcher = new RegExp([(settings.escape || noMatch).source,
	        (settings.interpolate || noMatch).source,
	        (settings.evaluate || noMatch).source].join('|')
	                + '|$', 'g');

	// Compile the template source, escaping string literals appropriately.
	var index = 0;
	var source = "__p+='";
	text.replace(matcher,
	                function(match, escape, interpolate, evaluate, offset) {
		                source += text.slice(index, offset).replace(escaper,
		                                function(match) {
			                                return '\\' + escapes[match];
		                                });

		                if (escape) {
			                source += "'+\n((__t=(" + escape
			                                + "))==null?'':_.escape(__t))+\n'";
		                }
		                if (interpolate) {
			                source += "'+\n((__t=(" + interpolate
			                                + "))==null?'':__t)+\n'";
		                }
		                if (evaluate) {
			                source += "';\n" + evaluate + "\n__p+='";
		                }
		                index = offset + match.length;
		                return match;
	                });
	source += "';\n";

	// If a variable is not specified, place data values in local scope.
	if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

	source = "var __t,__p='',__j=Array.prototype.join,"
	                + "print=function(){__p+=__j.call(arguments,'');};\n"
	                + source + "return __p;\n";

	try {
		render = new Function(settings.variable || 'obj', '_', source);
	} catch (e) {
		e.source = source;
		throw e;
	}

	if (data) return render(data, _);
	var template = function(data) {
		return render.call(this, data, _);
	};

	// Provide the compiled function source as a convenience for precompilation.
	template.source = 'function(' + (settings.variable || 'obj') + '){\n'
	                + source + '}';

	return template;
};
