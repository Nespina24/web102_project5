import {
    BarChart,
    Bar,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

export default function IngredientsChart({ recipes }) {
    const data = recipes.map((recipe) => ({
        name: recipe.title,
        ingredients: recipe.extendedIngredients?.length || 0
    }));

    return (
        <div>
            <h2 style={{ color: "gray" }}>Ingredients per Recipe</h2>
            <ResponsiveContainer width="95%" height={400}>
                <BarChart
                    data={data}
                    margin={{ top: 10, right: 30, left: 30, bottom: 10 }}
                >
                    <CartesianGrid strokeDasharray="5 5" />
                    <YAxis
                        label={{
                            value: "Number of Ingredients",
                            angle: -90,
                            position: "insideLeft",
                            textAnchor: "middle",
                            dx: -20
                        }}
                    />
                    <Tooltip />
                    <Bar dataKey="ingredients" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}