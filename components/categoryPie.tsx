import { PieChart, Pie, Cell, Tooltip,Legend  } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#a855f7"];

function CategoryPie({data}:{data:{ name: string; value: number }[]}) {
  return (
<PieChart width={600} height={300}>
 <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label={({ name, percent }) => 
          `${name} ${(percent! * 100).toFixed(0)}%`
        }
      >
        {data.map((_, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}


</Pie>

<Tooltip/>
  <Legend />
</PieChart>
  )
}

export default CategoryPie