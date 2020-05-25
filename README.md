# Necessary

A collection of utility functions.

These utility functions were partly inspired by [lodash](https://lodash.com/), [async](https://caolan.github.io/async/) and the like. They provide functionality that for the most part will be covered far more comprehensibly elsewhere. The idea was only to create a collection that addressed some modest requirements and would result in a relatively small footprint. That said, the bare bones implementations should hopefully provide some confidence if stepped in to and out of whilst debugging, especially in the case of the asynchronous functions.

## Installation

You can install Necessary with [npm](https://www.npmjs.com/):

    npm install necessary

You can also clone the repository with [Git](https://git-scm.com/)...

    git clone https://github.com/djalbat/necessary.git

...and then install the dependencies with npm from within the project's root directory:

    npm install

## Usage

Each of the collections of utility functions described below is exported as a plain old JavaScript object. To get hold of them, import the requisite object and then destructure it:

```
import { arrayUtilities, asynchronousUtilities, fileSystemUtilities } from "necessary";

const { first, last } = arrayUtilities,
      { isDirectory } = fileSystemUtilities;

...
```
The miscellaneous functions are a special case. They can be treated as above but may well have other functions assigned to them. See below.

## Array functions

- `first()`
- `second()`
- `third()`
- `fourth()`
- `fifth()`
- `fifthLast()`
- `fourthLast()`
- `thirdLast()`
- `secondLast()`
- `last()`
- `tail()`
- `push()`
- `unshift()`
- `concat()`
- `clear()`
- `copy()`
- `merge()`
- `splice()`
- `replace()`
- `filter()`
- `find()`
- `prune()`
- `patch()`
- `augment()`
- `separate()`
- `forwardsSome()`
- `backwardsSome()`
- `forwardsEvery()`
- `backwardsEvery()`
- `forwardsReduce()`
- `backwardsReduce()`
- `forwardsForEach()`
- `backwardsForEach()`

Note that none of these functions take or pass on a `thisArg` argument when they might otherwise have done. Use `bind()`.

* The functions `first()` through to `last()` return the requisite element of the array argument, if passed an array of at least the required length. If the array is not long enough they return `undefined`. The `tail()` function returns all but the first element of the array argument.

* The `push()` function is similar to its native counterpart but will push an array rather than a single element.

* The `unshift()` function is similar to its native counterpart but will unshift an array rather than a single element.

* The `concat()` function is similar to its native counterpart, however it alters the first array argument *in place*. Like its native counterpart it will also take a single element as the second argument and convert it to an array.

```
concat([1, 2, 3], 4); // the array argument becomes [1, 2, 3, 4]
```

* The `clear()` function removes all the elements in the array argument and returns them as a fresh array:

```
clear([1, 2, 3]); // the array argument becomes []
                  // the return value will be [1, 2, 3] 
```

* The `copy()` function copies the second array argument over the top of the first array argument, in other words it replaces each element of the first array argument with the corresponding element in the second array argument. If there are more elements in the second array argument that the first, the first is lengthened:  

```
copy([1, 2, 3], [4, 5, 6, 7]); // the first array argument becomes [4, 5, 6, 7]
```

* The `merge()` function copies the second array argument onto to the end of the first array argument, behaving in identical fashion to the `push()` function:

```
merge([1, 2, 3], [4, 5, 6, 7]); // the first array argument becomes [1, 2, 3, 4, 5, 6, 7]
```

* The `splice()` function works in a similar vein to its native counterpart, however it takes an array as the optional fourth argument rather than a series of elements from the fourth argument onwards. It mutates the first array argument and returns an array of the elements that have been removed from it:

```
splice([1, 2, 3], 1, 2, [4, 5]); // the return value will be [2, 3] 
                                 // the first array argument becomes [1, 4, 5]
```

* The `replace()` function will replace an element in the array with the given element the first time that the test callback function returns a truthy value:

```
replace([1, 2, 0, -1, -2], 3, (element, index) => {
  return element === 0;
}); // the first array argument becomes [1, 2, 3, -1, -2]
```

* The `filter()` function is like its native counterpart, however it filters the first array argument *in place*. The second argument should be a test callback function that will be invoked for each element of the array. If it does not return a truthy value, the corresponding element will be removed.

```
filter([1, 2, -1, -2], (element, index) => {
  return element > 0;
}); // the first array argument becomes [1, 2]
    // the return value is [-1, -2]
```

* The `find()` function is like its native counterpart, however it returns an array of all the elements for which the test callback function returns a truthy value, rather than just the first:

```
find([1, 2, -1, -2], (element, index) => {
  return element > 0;
}); // the return value will be [1, 2]
```

* The `prune()` function is much like the `filter()` function, however it will terminate the first time that the test callback function does not return a truthy value:

```
prune([1, 2, -1, -2], (element, index) => {
  return element > 0;
}); // the first array argument becomes [1, 2, -2] 
    // the return value is -1 
```

* The `patch()` function will append the given element to the first array argument the first time that the test callback function returns a truthy value:

```
patch([1, 2, 0, -1, -2], 4, (element, index) => {
  return element === 0;
}); // the first array argument becomes [1, 2, 0, -1, -2, 4]
```

* The `augment()` function is appends each of the elements of the second array argument to the first array argument whenever the test callback returns a truthy value:

```
augment([1, 2, 3], [-1, 4, -2, 5], (element, index) => {
  return element > 0;
}); // the first array argument becomes [1, 2, 3, 4, 5]
```

* The `separate()` function separates the first array argument, pushing each of its elements onto either the second or the third array argument depending on whether or not the test callback returns a truthy value:

```
separate([1, -1, -2, 2, 3, -3], [], [], (element, index) => {
  return element > 0;
}); // the second and third array arguments become [1, 2, 3] and [-1, -2, 3], respectively.
```

* The `forwardsXXX()` and `backwardsXXX()` functions work as their names suggest. They are not as robust as their native counterparts, however, and rely on the array remaining immutable.

## Path functions

- `isPathName()`
- `isPathTopmostName()`
- `isPathRelativePath()`
- `isPathAbsolutePath()`
- `isTopmostNameInAbsolutePath()`
- `combinePaths()`
- `concatenatePaths()`
- `bottommostNameFromPath()`
- `topmostDirectoryPathFromPath()`
- `topmostDirectoryNameFromPath()`
- `pathWithoutBottommostNameFromPath()`
- `pathWithoutTopmostDirectoryNameFromPath()`

These functions manipulate or query strings that represent file and directory paths. Note that only forward slash `/` delimiters are supported. Trailing delimiters are not needed, but tolerated.

* The `isPathName()` function returns `true` if the string argument contains no `/` delimiters apart from the first and last characters:

```
isPathName("root/"); // the return value is true

isPathName("/root"); // the return value is true

isPathName("./root"); // the return value is false

isPathName("../etc"); // the return value is false

isPathName("/root/etc"); // the return value is false
```

* The `isPathTopmostName()` function returns `true` if the string argument is both a name and an absolute path:

```
isPathTopmostName("/root/"); // the return value is true

isPathTopmostName("/root"); // the return value is true

isPathTopmostName("etc/"); // the return value is false
```

* The `isPathRelativePath()` function returns `true` if the string argument does not start with a delimiter`/`:

```
isPathRelativePath("etc"); // the return value is true

isPathRelativePath("./etc"); // the return value is true

isPathRelativePath("../etc"); // the return value is true
```

* The `isPathAbsolutePath()` returns `true` if the string argument starts with a delimiter`/`:

```
isPathAbsolutePath("/root/etc"); // the return value is true
```

* The `isTopmostNameInAbsolutePath()` function returns `true` if the second string argument begins with the first string argument optionally followed by a delimiter`/` and further characters:

```
isTopmostNameInAbsolutePath("/root", "/root/etc");  // the return value is true

isTopmostNameInAbsolutePath("root", "/root/etc");  // the return value is false

isTopmostNameInAbsolutePath("etc", "/root/etc"); // the return value is false
```

Note that the function assumes that the first argument is a topmost name and that the second argument is an abolute path. It does not check, it simply compares the two arguments with a single regex. 

* The `combinePaths()` function will combine the first string argument with the second string argument by successively removing the bottommost directory name of the former for each topmost parent directory `..` signifier it finds in the latter. Current directory `.` signifiers are also removed:

```
combinePaths("etc/", "./init"); // the return value is 'etc/init'

combinePaths("/root/etc/", "../init"); // the return value is '/root/init'
```

Note that the function assumes that the second argument is a relative name or path.

* The `concatenatePaths()` function will concatenate the first and second string arguments, adding the trailing forward slash `/` to the first string if necessary:

```
concatenatePaths("root", "etc/"); // the return value is 'root/etc/'

concatenatePaths("root/", "etc/"); // the return value is 'root/etc/'
```

Note that the function assumes that the second argument is a relative name or path although without a leading current directory `.` or parent directory `..` signifier. 

* The `bottommostNameFromPath()`, `topmostDirectoryPathFromPath()`, `topmostDirectoryNameFromPath()`, `pathWithoutBottommostNameFromPath()` and `pathWithoutTopmostDirectoryNameFromPath()` functions work as their names suggest. Each expects there to be at least one delimiter, returning `null` otherwise:

```
bottommostNameFromPath("../etc"); // the return value is 'etc'

topmostDirectoryPathFromPath("/root/etc/init.conf"); // the return value is '/root/etc'

topmostDirectoryNameFromPath("etc/init.conf"); // the return value is 'etc'

pathWithoutBottommostNameFromPath("root/etc/init.conf"); // the return value is 'root/etc'

pathWithoutTopmostDirectoryNameFromPath("root/etc/init.conf"); // the return value is 'etc/init.conf'
```

## File system functions

- `checkEntryExists()`
- `checkFileExists()`
- `checkDirectoryExists()`
- `isEntryFile()`
- `isEntryDirectory()`
- `isDirectoryEmpty()`
- `readDirectory()`
- `readFile()`
- `writeFile()`
- `appendToFile()`
- `createDirectory()`
- `renameFile()`
- `getStats()`

An inglorious collection of functions which do no more than paper over some of Node's synchronous [native file system API](https://nodejs.org/api/fs.html) functions. All of the functions will throw native errors upon failure.

* The `checkEntryExists()`, `checkFileExists()`, `checkDirectoryExists()`, `isEntryFile()`, `isEntryDirectory()` and `isDirectoryEmpty()` functions work as their names suggest, returning a boolean value.

```
checkEntryExists("root/etc"); // the return value is true if the file or directory exists

checkFileExists("root/etc/init.conf"); // the return value is true if the file exists

checkDirectoryExists("root/etcconf"); // the return value is true if the directory exists

isEntryFile("root/etc/init.conf"); // the return value is true if the entry is a file

isEntryDirectory("root"); // the return value is true if the entry is a directory

isDirectoryEmpty("root/etc"); // the return value is true if the directory is empty
```

* The `readDirectory()` function returns an array of entry names if the directory exists:

```
readDirectory("root/etc"); // returns the contents of the 'root/etc' directory
```

* The `readFile()` function takes the file encoding as an optional second string argument. The default is `utf8`. It returns the content of the file upon success:

```
readFile("root/etc/init.conf"); // returns the content of the 'root/etc/init.conf' file
```

* The `writeFile()` function takes the content of the file as a second string argument. It does not return anything upon success:

```
writeFile("root/etc/init.conf", ""); // writes '' to the 'root/etc/init.conf' file
```

* The `appendToFile()` function takes the content to append file as a second string argument. It will create teh file if necessary and does not return anything upon success:

```
appendToFile("root/etc/init.conf", ""); // appends '' to the 'root/etc/init.conf' file
```

* The `createDirectory()` function creates a directory, also creating the parent directories if necessary:

```
createDirectory("root/etc/init"); // Creates the 'root/etc/init' directory
```

* The `getStats()` function returns an instance of the [fs.Stats](https://nodejs.org/api/fs.html#fs_class_fs_stats) class for a file or a directory:

```
const stats = getStats("root/etc"); // returns stats for the 'root/etc' directory
```

## Asynchronous functions

- `whilst()`
- `forEach()`
- `sequence()`
- `eventually()`
- `repeatedly()`
- `forwardsForEach()`
- `backwardsForEach()`

These functions generally take either a callback or an array of callbacks, followed by a `done()` function and an optional `context` argument. They all pass a `next()` function to the callbacks followed by the `done()` function, the `context` and then an `index` argument. Callbacks are given access to the `done()` function which can be called instead of the `next()` function in order to terminate early.

* The `whilst()` function takes a single callback, which it calls each time the callback invokes the given `next()` function or until the callback invokes the given `done()` function. The callback can also force termination by returning a truthy value, in which case it must *not* call the given `next()` or `done()` functions. In the example below the callback will be exectuted ten times:

```
const context = {}; ///

const callback = (next, done, context, index) => {
  const terminate = (index === 9);

  if (terminate) {
    done();
  } else {
    ...

    next();
  }
}

whilst(callback, () => {
  /// done
}, context);
``` 

* The `forEach()` function takes an array as the first argument followed by a single callback, which it calls for each element of the array unless the callback invokes the given `done()` function. If the `done()` function is never invoked by the callback, it is called once each of the array elements has been passed to the callback, provided the callback invokes the given `next ()` function each time. In the example below the callback will be executed four times:

```
const context = {};

const callback = (element, next, done, context, index) => {
  const terminate = (element === 3);

  if (terminate) {
    done();
  } else {
    ...

    next();
  }
}

const array = [0, 1, 2, 3, 4, 5];

forEach(array, callback, () => {
  /// done
}, context);
```

* The `sequence()` function takes an array of callbacks, which it calls in turn unless the callback invokes the given `done()` function. If the `done()` function is never invoked by a callback, it is called once each of the callbacks have been called, provided each callback invokes the given `next ()` function. In the example below each of the callbacks bar the last is executed:

```
const context = {};

const firstCallback = (next, done, context, index) => { next(); },
      secondCallback = (next, done, context, index) => { next(); },
      thirdCallback = (next, done, context, index) => { done(); },
      lastCallback = (next, done, context, index) => { next(); },
      callbacks = [
        firstCallback,
        secondCallback,
        thirdCallback,
        lastCallback
      ];

sequence(callbacks, () => {
  /// done
}, context);
```

* The `eventually()` function takes an array of callbacks, each of which it calls immediately without waiting for the callbacks to invoke the given `next()` functions. When each of the callbacks has invoked the given `next()` function, it will call the `done()` function. Note that in this case invoking the `done()` function from within a callback will not halt the execution of other callbacks, it is passed as an argument only for the sake of convention. In the example below each of the callbacks is executed:

```
const context = {};

const firstCallback = (next, done, context, index) => { next(); },
      secondCallback = (next, done, context, index) => { next(); },
      thirdCallback = (next, done, context, index) => { done(); },
      callbacks = [
        firstCallback,
        secondCallback,
        thirdCallback
      ];

eventually(callbacks, () => {
  /// done
}, context);
```
* The `repeatedly()` function takes a single callback and a `length` parameter, immediately calling the callback a `length` number of times without waiting for it to invoke the given `next()` function each time. When the callback has invoked the given `next()` function a `length` number of times, it will call the `done()` function. Note that in this case invoking the `done()` function from within the callback will not halt its execution the requisite number of times, it is passed as an argument only for the sake of convention. In the example below the callback is executed ten times:

```
const context = {};

const callback = (next, done, context, index) => {
  ...

  next();
};

const length = 10;

repeatedly(callback, length, () => {
  // done
}, context);
```

## Template functions

- `parseFile()`
- `parseContent()`
- `parseLine()`

These functions parse files, content or single lines, replacing each token of the form `${<name>}` with the value of the corresponding property of a plain old JavaScript object passed as the second argument, or replacing the token with an empty string if no such property exists.

* The `parseFile()` function takes a file path as the first argument:

```
const filePath ="/etc/var/public/name.html",
      name = "Joe Bloggs",
      age = 99,
      args = {
        name,
        age
      }
      parsedContent = parseFile(filePath, args); 
```

* The `parseContent()` function takes content as the first argument, honouring newline `\n` characters:

```
const content = `

  name: <strong>${name}</strong><br/>
  age: <strong>${age}</strong><br/>
  
      `,
      name = "Joe Bloggs",
      age = 99,
      args = {
        name,
        age
      }
      parsedContent = parseContent(content, args); 
```

* The `parseLine()` function takes a single line of content as the first argument:

```
const line = "${name}, aged ${age}.",
      name = "Joe Bloggs",
      age = 99,
      args = {
        name,
        age
      }
      parsedLine = parseLine(line, args); // returns 'Joe Bloggs, aged 99.' 
```

## Miscellaneous functions

- `log()`
- `rc()`
- `get()`
- `post()`
- `onETX()`
- `prompt()`

A small if motley collection of functions for various common tasks.

* The `log()` function provides rudimentary logging functionality, printing its argument to the console, prepended with a date and time stamp together with the path of the file containing the callee function and the line number:

```
log("...") // Results in '28-01-2018 15:44:47.363 bin/main.js(35) ...' being logged.
```

You can pass an error instead of a string to `log()`, in which case it will print the file path and line number of the place where the error was thrown along with the error message.

Additionally, it is possible to print to a log file if a log directory and, optionally, a base name for the log file are specified. The base name here means the file name minus the extension and separator. The default is `default`:

```
const { setLogFileBaseName, setLogDirectoryPath } = log;

setLogFileBaseName("example");
setLogDirectoryPath("./log");

log("...") // Results in '28-01-2018 15:44:47.363 bin/main.js(35) ...\n' line being appended to
           // the './log/example.log' file as well as the message being logged.
```

A standard set of functions, namely `fatal()`, `error()`, `warning()`, `info()`, `debug()` and `trace()`, are available and these are filtered in the usual way, assuming the log level has been set:

```
const { setLogLevel, DEBUG } = log;

setLogLevel(DEBUG);

log.error("...") // Printed to the console and optionally, to the log file.
log.trace("...") // Ignored, because the trace level is lower than the debug level.
```

There is also a `setLogOptions()` function which allows you to pass the log level, base file name and directory path as a plain old JavaScript object. See below for a usage example.

Finally, log files are rolled over every night. So `./log/example.log` would become `./log/example.28-01-2018.log` and a new `./log/example.log` file would be started at midnight.

* The `rc()` function parses a JSON runtime configuration file of a certain format and provides the information therein by assigning it to itself:

```
rc();

const { logOptions } = rc;

setLogOptions(logOptions); // Expects a plain old JavaScript object of the form { level,
                           //                                                     fileBaseName,
                           //                                                     directoryPath }
```

By default it will parse a file called `.rc` in the current working directory. This file should have the following format:

```
{
  "environments": [
    {
      "name": "development",
      ...
    },
    {
      "name": "production",
      ...
    }
  ]
}
```

In the absence of being passed an environment name, it will parse and return the first element of the `enviromnents` array. It will not try to assign the `name` property of the chosen environment to itself, by the way, because functions already have a `name` property. It can be instructed to a chose a specific environment thus:

```
rc("production"); // Provides the 'production' environment
```

Or you can pass `process.argv` if the command line arguments include something of the form `--environment=...`:

```
rc(process.argv); // Provides the 'development' if given '--environment=development'
```

You can change the base extension of the file that is parsed, that is the part of the extension between the leading dot and `rc`, by making use of the `setRCBaseExtension()` function:

```
const { setRCBaseExtension } = rc;

setRCBaseExtension("default");

rc(); // Provides the first environment in the '.defaultrc' file
```

Note that the `rc()` function can be included in any file but only needs to be called once. But be careful that it is called before it is ever destructured.

Aside from the aforementioned `setRCBaseExtension()` functions, the `checkRCFileExists()`, `createVacuousRCFile()`, `readRCFile()` and `writeRCFile()` functions do as their names suggest. The `updateRCFile()` function, if passed a plain old JavaScript object as the first parameter, will add the properties therein, overwriting any existing properties. Properties to be removed can be given as further arguments. If you do not want to add as well as remove properties, set the first argument to a falsey value.

```
const { readRCFile, writeRCFile, updateRCFile, checkRCFileExists, createVacuousRCFile } = rc;

const rcFileExists = checkRCFileExists();  // Returns true if the rc file exists.

createVacuousRCFile(); // creates an rc file with an empty environment.

const json = readRCFile();  // Reads the entire contents of the rc file into a JSON object

writeRCFile(json);  // Stringifies the given JSON object and writes it to the rc file

updateRCFile({example: "example"});  // Updates the rc file, adding the 'example' property

updateRCFile(null, "example");  // Updates the rc file, removing the 'example' property
```

* The `get()` function sends a `GET` request, taking host, URI, optional query parameters and callback arguments. The optional `parameters` argument should be a plain old JavaScript object, the names and values of which will be encoded and concatenated to form the query string. If the status code is 200 and the response is stringified JSON, this will be parsed and returned by way of the callback, otherwise null will be returned:

```
const host = "...",
      uri = "...",
      parameters = {
        ...
      };

get(host, uri, parameters, (json) => {
  if (json !== null) {
    ...
  }
});
```

Note that the `uri` argument should include a leading forward slash `/` if the `host` argument does not have a trailing one.

* The `post()` function behaves similarly to the `get()` function in what it expects both by way of arguments and in the HTTP response. However, it sends a `POST` rather than a `GET` request and takes an additional `json` argument after the `host` and `uri` arguments. This argument is stringified and sent in the request body:

```
const host = "...",
      uri = "...",
      json = ...;

post(host, uri, json, (json) => {
  if (json !== null) {
    ...
  }
});
```

Note that `parameters` argument is missing in the example above but that there is nothing wrong with including it and thereby appending a query string to the request URL.

* The `onETX()` function takes a handler which is invoked whenever the `ETX` character code is encountered in the `stdin` stream, which typically happens when the user presses `Ctrl-C`. This method is therefore useful for exiting a console application immediately upon the user's behest, if it is passed `process.exit`. It also returns a function that can be called to remove the listener at some later point in time:

```
const offEXT = onEXT(process.exit);

...

offEXT();
```

* The `prompt()` function is meant for use in terminal applications. It takes a plain old JavaScript object and a callback function as the its first and second arguments, respectively. The plain old JavaScript object is for the options. The callback function is invoked when the user hits return:

```
const hidden = true,
      description = ...,
      initialValue = ...,
      errorMessage = ...,
      validationFunction = ...,
      options = {
        hidden,
        description,
        initialValue,
        errorMessage,
        validationFunction
      };

prompt(options, (value) => {
  ...
});
```

There are a range of options. Aside from those shown above, the options object can have `attempts` and `encoding` properties with default values `3` and `utf8`, respectively. The default value of the `hidden` property is `false`. Setting it to `true` results in password-style input, that is, the characters remain hidden. The options object can also include a `validatePattern` property, which must be a regular expression. This is used for validation in the absence of a validation function. Lastly, note that the `description` and `errorMessage` properties are mandatory.

## Compiling from source

Automation is done with [npm scripts](https://docs.npmjs.com/misc/scripts), have a look at the `package.json` file. The pertinent commands are:

    npm run build-debug
    npm run watch-debug

## Contact

- james.smith@djalbat.com
- http://djalbat.com
