import React from 'react';
import type {Component} from 'react';
export default  (...funcs: Array<Function>) => 
                    (Component: Component): Component => 
                        funcs.reduceRight((component, fn) => fn(component), Component);