// Type definitions for Component
// Project: Component
// Definitions by: Sean J. MacIsaac <seanjmacisaac@gmail.com>

/*~ This is the module template file for class modules.
 *~ You should rename it to index.d.ts and place it in a folder with the same name as the module.
 *~ For example, if you were writing a file for "super-greeter", this
 *~ file should be 'super-greeter/index.d.ts'
 */

/*~ Note that ES6 modules cannot directly export class objects.
 *~ This file should be imported using the CommonJS-style:
 *~   import x = require('someLibrary');
 *~
 *~ Refer to the documentation to understand common
 *~ workarounds for this limitation of ES6 modules.
 */

/*~ This declaration specifies that the class constructor function
 *~ is the exported object from the file
 */
// export = Component;

// /*~ Write your module's methods and properties in this class */
// declare class Component {
//   constructor(opts?: Object);

//   version: string[];
//   after(target: void): Component;
//   after(target: Object): Component;
//   after (target: Object | void): any;
//   static facade(methods: string[]): void;
//   static create(name: string, methods?: {}): any;
// }

declare module "flatman-component" {
  type Node = {

  }
  interface ICreateMethod {
    constructor?(props?:{}): void;
    render(props?:{}): Node;
  }
  export default class Component {
    static create(name: string, methods?: ICreateMethod): any;
    static lib: { [key: string]: Function };
  }
}

/*~ If you want to expose types from your module as well, you can
 *~ place them in this block.
 */

// declare namespace Component {
//   export interface MyClassMethodOptions {
//     width?: number;
//     height?: number;
//   }
// }