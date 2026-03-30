import { chartData } from "@/chartData";
import { Products } from "./products";
import { Session } from "./session";

 export interface DashboardProps extends Session {
  totalVal: number;
  totalPrice: number;
  lowStock: number;
  allProducts: Products[];
  chartData: chartData[];
pieData: { name: string; value: number }[]
}