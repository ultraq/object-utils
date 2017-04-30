
object-utils
============

[![Build Status](https://travis-ci.org/ultraq/object-utils.svg?branch=master)](https://travis-ci.org/ultraq/object-utils)

A collection of utilities for JavaScript objects.


API
---

### merge(target, ...sources)

Deep-merges all of the properties of the objects in `sources` with `target`,
modifying the target object and returning it.

 - **target**: object to merge values into
 - **sources**: array of argument list of objects to copy values from
