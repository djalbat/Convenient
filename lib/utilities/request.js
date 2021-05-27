"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _constants = require("../constants");
var _http = require("../utilities/http");
var http = require("http"), https = require("https");
function get(host, uri, parameters, headers, callback) {
    if (callback === undefined) {
        callback = headers; ///
        headers = {
        };
    }
    var method = _constants.GET, _request = request(host, uri, parameters, method, headers, callback);
    _request.end();
    return _request;
}
function post(host, uri, parameters, headers, callback) {
    if (callback === undefined) {
        callback = headers; ///
        headers = {
        };
    }
    var method = _constants.POST, _request = request(host, uri, parameters, method, headers, callback);
    return _request;
}
function request(host, uri, parameters, method, headers, callback) {
    var port = (0, _http).portFromHost(host), secure = (0, _http).secureFromHost(host), hostname = (0, _http).hostnameFromHost(host), queryString = (0, _http).queryStringFromParameters(parameters), path = queryString === _constants.EMPTY_STRING ? uri : "".concat(uri, "?").concat(queryString), options = {
        hostname: hostname,
        headers: headers,
        method: method,
        port: port,
        path: path
    }, request1 = secure ? https.request : http.request; ///
    var _request = request1(options, function(response) {
        var error = null;
        callback(error, response);
    });
    _request.on(_constants.ERROR, function(error) {
        var response = null;
        callback(error, response);
    });
    return _request;
}
var _default = {
    get: get,
    post: post,
    request: request
};
exports.default = _default;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsaXRpZXMvcmVxdWVzdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpLFxuICAgICAgaHR0cHMgPSByZXF1aXJlKFwiaHR0cHNcIik7XG5cbmltcG9ydCB7R0VULCBQT1NULCBFUlJPUiwgRU1QVFlfU1RSSU5HfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBwb3J0RnJvbUhvc3QsIHNlY3VyZUZyb21Ib3N0LCBob3N0bmFtZUZyb21Ib3N0LCBxdWVyeVN0cmluZ0Zyb21QYXJhbWV0ZXJzIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9odHRwXCI7XG5cbmZ1bmN0aW9uIGdldChob3N0LCB1cmksIHBhcmFtZXRlcnMsIGhlYWRlcnMsIGNhbGxiYWNrKSB7XG4gIGlmIChjYWxsYmFjayA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY2FsbGJhY2sgPSBoZWFkZXJzOyAvLy9cbiAgICBoZWFkZXJzID0ge307XG4gIH1cblxuICBjb25zdCBtZXRob2QgPSBHRVQsXG4gICAgICAgIF9yZXF1ZXN0ID0gcmVxdWVzdChob3N0LCB1cmksIHBhcmFtZXRlcnMsIG1ldGhvZCwgaGVhZGVycywgY2FsbGJhY2spO1xuXG4gIF9yZXF1ZXN0LmVuZCgpO1xuXG4gIHJldHVybiBfcmVxdWVzdDtcbn1cblxuZnVuY3Rpb24gcG9zdChob3N0LCB1cmksIHBhcmFtZXRlcnMsIGhlYWRlcnMsIGNhbGxiYWNrKSB7XG4gIGlmIChjYWxsYmFjayA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY2FsbGJhY2sgPSBoZWFkZXJzOyAvLy9cbiAgICBoZWFkZXJzID0ge307XG4gIH1cblxuICBjb25zdCBtZXRob2QgPSBQT1NULFxuICAgICAgICBfcmVxdWVzdCA9IHJlcXVlc3QoaG9zdCwgdXJpLCBwYXJhbWV0ZXJzLCBtZXRob2QsIGhlYWRlcnMsIGNhbGxiYWNrKTtcblxuICByZXR1cm4gX3JlcXVlc3Q7XG59XG5cbmZ1bmN0aW9uIHJlcXVlc3QoaG9zdCwgdXJpLCBwYXJhbWV0ZXJzLCBtZXRob2QsIGhlYWRlcnMsIGNhbGxiYWNrKSB7XG4gIGNvbnN0IHBvcnQgPSBwb3J0RnJvbUhvc3QoaG9zdCksXG4gICAgICAgIHNlY3VyZSA9IHNlY3VyZUZyb21Ib3N0KGhvc3QpLFxuICAgICAgICBob3N0bmFtZSA9IGhvc3RuYW1lRnJvbUhvc3QoaG9zdCksXG4gICAgICAgIHF1ZXJ5U3RyaW5nID0gcXVlcnlTdHJpbmdGcm9tUGFyYW1ldGVycyhwYXJhbWV0ZXJzKSxcbiAgICAgICAgcGF0aCA9IChxdWVyeVN0cmluZyA9PT0gRU1QVFlfU1RSSU5HKSA/XG4gICAgICAgICAgICAgICAgIHVyaSA6XG4gICAgICAgICAgICAgICAgICBgJHt1cml9PyR7cXVlcnlTdHJpbmd9YCxcbiAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICBob3N0bmFtZSxcbiAgICAgICAgICBoZWFkZXJzLFxuICAgICAgICAgIG1ldGhvZCxcbiAgICAgICAgICBwb3J0LFxuICAgICAgICAgIHBhdGhcbiAgICAgICAgfSxcbiAgICAgICAgcmVxdWVzdCA9IHNlY3VyZSA/XG4gICAgICAgICAgICAgICAgICAgICBodHRwcy5yZXF1ZXN0IDogLy8vXG4gICAgICAgICAgICAgICAgICAgICAgIGh0dHAucmVxdWVzdDsgLy8vXG5cbiAgY29uc3QgX3JlcXVlc3QgPSByZXF1ZXN0KG9wdGlvbnMsIChyZXNwb25zZSkgPT4ge1xuICAgIGNvbnN0IGVycm9yID0gbnVsbDtcblxuICAgIGNhbGxiYWNrKGVycm9yLCByZXNwb25zZSk7XG4gIH0pO1xuXG4gIF9yZXF1ZXN0Lm9uKEVSUk9SLCAoZXJyb3IpID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IG51bGw7XG5cbiAgICBjYWxsYmFjayhlcnJvciwgcmVzcG9uc2UpO1xuICB9KTtcblxuICByZXR1cm4gX3JlcXVlc3Q7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZ2V0LFxuICBwb3N0LFxuICByZXF1ZXN0XG59O1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJDQUFBLFVBQVk7Ozs7O0lBS2lDLFVBQWM7SUFDK0IsS0FBbUI7SUFKdkcsSUFBSSxHQUFHLE9BQU8sRUFBQyxJQUFNLElBQ3JCLEtBQUssR0FBRyxPQUFPLEVBQUMsS0FBTztTQUtwQixHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFFBQVE7UUFDL0MsUUFBUSxLQUFLLFNBQVM7UUFDeEIsUUFBUSxHQUFHLE9BQU8sQ0FBRSxDQUFHLEFBQUgsRUFBRyxBQUFILENBQUc7UUFDdkIsT0FBTzs7O1FBR0gsTUFBTSxHQVQrQixVQUFjLE1BVW5ELFFBQVEsR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRO0lBRXpFLFFBQVEsQ0FBQyxHQUFHO1dBRUwsUUFBUTs7U0FHUixJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFFBQVE7UUFDaEQsUUFBUSxLQUFLLFNBQVM7UUFDeEIsUUFBUSxHQUFHLE9BQU8sQ0FBRSxDQUFHLEFBQUgsRUFBRyxBQUFILENBQUc7UUFDdkIsT0FBTzs7O1FBR0gsTUFBTSxHQXZCK0IsVUFBYyxPQXdCbkQsUUFBUSxHQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVE7V0FFbEUsUUFBUTs7U0FHUixPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRO1FBQ3pELElBQUksT0E3QjhFLEtBQW1CLGVBNkJqRixJQUFJLEdBQ3hCLE1BQU0sT0E5QjRFLEtBQW1CLGlCQThCN0UsSUFBSSxHQUM1QixRQUFRLE9BL0IwRSxLQUFtQixtQkErQnpFLElBQUksR0FDaEMsV0FBVyxPQWhDdUUsS0FBbUIsNEJBZ0M3RCxVQUFVLEdBQ2xELElBQUksR0FBSSxXQUFXLEtBbENrQixVQUFjLGdCQW1DMUMsR0FBRyxNQUNRLE1BQVcsQ0FBbEIsR0FBRyxHQUFDLENBQUMsR0FBYyxNQUFBLENBQVosV0FBVyxHQUMvQixPQUFPO1FBQ0wsUUFBUSxFQUFSLFFBQVE7UUFDUixPQUFPLEVBQVAsT0FBTztRQUNQLE1BQU0sRUFBTixNQUFNO1FBQ04sSUFBSSxFQUFKLElBQUk7UUFDSixJQUFJLEVBQUosSUFBSTtPQUVOLFFBQU8sR0FBRyxNQUFNLEdBQ0gsS0FBSyxDQUFDLE9BQU8sR0FDWCxJQUFJLENBQUMsT0FBTyxDQUFFLENBQUcsQUFBSCxFQUFHLEFBQUgsQ0FBRztRQUVoQyxRQUFRLEdBQUcsUUFBTyxDQUFDLE9BQU8sV0FBRyxRQUFRO1lBQ25DLEtBQUssR0FBRyxJQUFJO1FBRWxCLFFBQVEsQ0FBQyxLQUFLLEVBQUUsUUFBUTs7SUFHMUIsUUFBUSxDQUFDLEVBQUUsQ0F0RGdDLFVBQWMsaUJBc0RyQyxLQUFLO1lBQ2pCLFFBQVEsR0FBRyxJQUFJO1FBRXJCLFFBQVEsQ0FBQyxLQUFLLEVBQUUsUUFBUTs7V0FHbkIsUUFBUTs7O0lBSWYsR0FBRyxFQUFILEdBQUc7SUFDSCxJQUFJLEVBQUosSUFBSTtJQUNKLE9BQU8sRUFBUCxPQUFPIn0=