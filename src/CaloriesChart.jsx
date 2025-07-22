import {
  LineChart,
  Line,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function CaloriesChart({ recipes }) {
  const data = recipes.map((recipe, index) => ({
    name: recipe.title,
    calories:
      recipe.nutrition?.nutrients?.find((n) => n.name === "Calories")?.amount || 0
  }));

  return (
    <div>
      <h2 style={{ color: "gray" }}>Calories per Recipe</h2>
      <ResponsiveContainer width="95%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 30, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="5 5" />
          <YAxis
            label={{
              value: "Calories",
              angle: -90,
              position: "insideLeft",
              textAnchor: "middle",
              dx: -20
            }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="calories"
            stroke="#8884d8"
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}