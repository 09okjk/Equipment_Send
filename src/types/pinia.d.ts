declare module 'pinia' {
  export * from 'pinia'

  export function defineStore(
    id: string,
    options: any
  ): any;
  
  export function defineStore(
    id: string,
    storeSetup: Function,
    options?: any
  ): any;
  
  export function createPinia(): any;
  
  export interface PiniaCustomProperties {}
  
  export interface PiniaCustomStateProperties {}
  
  export interface DefineStoreOptions<S, A, G> {
    state?: () => S;
    getters?: G;
    actions?: A;
  }
}
