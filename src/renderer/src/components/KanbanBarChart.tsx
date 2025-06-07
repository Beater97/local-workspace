import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
  Cell
} from 'recharts';

// Palette JetBrains-ish per 3 colonne
const kanbanColors = ['#3b82f6', '#eab308', '#22c55e']; // blu, giallo, verde
const kanbanColorsDark = ['#8b5cf6', '#facc15', '#22d3ee']; // viola, giallo, ciano
// @ts-ignore
export default function KanbanBarChart({ data, isDark }: { data: any[], isDark: boolean }) {
  const barColors = isDark ? kanbanColorsDark : kanbanColors;
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} barGap={28}>
        <CartesianGrid strokeDasharray="2 3" stroke={isDark ? "#404040" : "#d4d4d4"} />
        <XAxis
          dataKey="name"
          stroke={isDark ? "#a1a1aa" : "#334155"}
          tick={{ fontSize: 14, fontFamily: 'JetBrains Mono' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          allowDecimals={false}
          stroke={isDark ? "#a1a1aa" : "#334155"}
          tick={{ fontSize: 13, fontFamily: 'JetBrains Mono' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            background: isDark ? "#18181b" : "#f9fafb",
            border: isDark ? "1px solid #312e81" : "1px solid #e0e7ef",
            color: isDark ? "#fff" : "#18181b",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 14
          }}
          labelStyle={{
            color: isDark ? "#a78bfa" : "#3b82f6",
            fontWeight: 700
          }}
          itemStyle={{
            color: isDark ? "#fff" : "#18181b",
            fontWeight: 600
          }}
          cursor={{ fill: isDark ? "#27272a" : "#e0e7ef", opacity: 0.15 }}
        />
        <Bar
          dataKey="value"
          radius={[6, 6, 0, 0]}
          isAnimationActive
          barSize={48}
        >
          {data.map((_, idx) => (
            <Cell
              key={idx}
              fill={barColors[idx % barColors.length]}
            />
          ))}
          <LabelList
            dataKey="value"
            position="top"
            style={{
              fontWeight: 700,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 18,
              fill: isDark ? "#fff" : "#18181b",
              textShadow: isDark
                ? "1px 1px 2px #18181b"
                : "1px 1px 2px #fff"
            }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
