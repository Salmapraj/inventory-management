import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip ,ResponsiveContainer} from 'recharts';


type ChartData = {
  date: string;
  products: number;
};
function NewProductChart({data}:{data:ChartData[]}) {

  return (
    <div className='bg-blue-100  p-3  '>
      <h1 className="text-lg font-medium mb-3">New Products</h1>

<ResponsiveContainer width="80%" height={200}>
 <AreaChart
        responsive
        data={data}             
        margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorProducts" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date"  />
      <YAxis allowDecimals={false} />
      <Tooltip  formatter={(value)=>[`${value} products`,"Added"]}/>
      <Area type="monotone" dataKey="products" stroke="#16a34a
      " fill="#8884d8"
       />
</AreaChart>
</ResponsiveContainer>

    </div>
  )
}

export default NewProductChart