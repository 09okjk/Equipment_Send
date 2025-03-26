declare module 'vue-router' {
  import { RouteRecordRaw } from 'vue-router'
  export * from 'vue-router'
  
  export function useRouter(): {
    push: (path: string) => void;
    replace: (path: string) => void;
    go: (delta: number) => void;
    back: () => void;
    forward: () => void;
  }
  
  export function useRoute(): {
    path: string;
    params: Record<string, string>;
    query: Record<string, string>;
    hash: string;
    fullPath: string;
    matched: any[];
    name: string | null | undefined;
    meta: Record<string, any>;
  }
  
  export function createRouter(options: {
    history: any;
    routes: RouteRecordRaw[];
  }): any;
  
  export function createWebHistory(base?: string): any;
}
