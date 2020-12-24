
object-utils
============

[![Build Status](https://travis-ci.com/ultraq/object-utils.svg?branch=master)](https://travis-ci.com/ultraq/object-utils)
[![Coverage Status](https://coveralls.io/repos/github/ultraq/object-utils/badge.svg?branch=master)](https://coveralls.io/github/ultraq/object-utils?branch=master)
[![npm](https://img.shields.io/npm/v/@ultraq/object-utils.svg?maxAge=3600)](https://www.npmjs.com/package/@ultraq/object-utils)
[![Bundlephobia minified size](https://img.shields.io/bundlephobia/min/@ultraq/object-utils)](https://bundlephobia.com/result?p=@ultraq/object-utils)

A collection of utilities for JavaScript objects.


Installation
------------

```
npm install @ultraq/object-utils
```


API
---

### equals(object1, object2)

Deep-equality comparison between 2 objects on whether they contain the same
values as each other.  Only works with objects that act as data structures, not
classes or the like as this function only compares primitives using identity
(`===`) comparison.

 - **object1**: 
 - **object2**: 

### merge(target, ...sources)

Deep-merges all of the properties of the objects in `sources` with `target`,
modifying the target object and returning it.

 - **target**: object to merge values into
 - **sources**: array of argument list of objects to copy values from

### navigate(object, path)

> The null-safe nature of this method is now in JavaScript as the optional
> chaining operator (`?.`).  If you're not using string paths/selectors to the
> item in your object, then I suggest you use that instead.  Otherwise, if
> you're using string path selectors or can't use that method because of browser
> support, this method will still do the job 🙂

Returns a value from an object via a path string that describes the nesting of
objects to get to the value, eg:

```javascript
let object = {
  greeting: {
    message: 'Hello!'
  }
};
let pathToMessage = 'greeting.message';
```

If the path doesn't resolve to anything, then `undefined` is returned.

 - **object**:  object to search through
 - **path**: a dot-separated path string to get to the desired value within the object
