declare module 'vue-chartjs' {
  import { DefineComponent } from 'vue'
  
  export const Bar: DefineComponent<{
    data: any;
    options: any;
  }, {}, any>
  
  export const Pie: DefineComponent<{
    data: any;
    options: any;
  }, {}, any>
  
  export const Doughnut: DefineComponent<{
    data: any;
    options: any;
  }, {}, any>
  
  export const Line: DefineComponent<{
    data: any;
    options: any;
  }, {}, any>
}
