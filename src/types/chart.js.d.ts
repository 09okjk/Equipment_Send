declare module 'chart.js' {
  export class Chart {
    static register(...items: any[]): void;
  }
  
  export const Title: any;
  export const Tooltip: any;
  export const Legend: any;
  export const BarElement: any;
  export const CategoryScale: any;
  export const LinearScale: any;
  export const ArcElement: any;
  export const PointElement: any;
  export const LineElement: any;
}
