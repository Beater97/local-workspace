import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell
} from 'recharts'

// Palette JetBrains-ish per 3 colonne
const kanbanColors = ['#6366f1', '#f59e0b', '#10b981'] // blu-viola, giallo, verde
const kanbanColorsDark = ['#8b5cf6', '#facc15', '#22d3ee'] // viola, giallo, ciano
export default function KanbanBarChart({ data, isDark }: { data: any[]; isDark: boolean }) {
  const barColors = isDark ? kanbanColorsDark : kanbanColors
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} barGap={24}>
        <XAxis
          dataKey="name"
          stroke={isDark ? '#cbd5e0' : '#4a5568'}
          tick={{ fontSize: 14, fontFamily: 'JetBrains Mono' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          allowDecimals={false}
          stroke={isDark ? '#cbd5e0' : '#4a5568'}
          tick={{ fontSize: 13, fontFamily: 'JetBrains Mono' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            background: isDark ? '#2d3748' : '#edf2f7',
            border: isDark ? '1px solid #4a5568' : '1px solid #cbd5e0',
            color: isDark ? '#fff' : '#2d3748',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 14
          }}
          labelStyle={{
            color: isDark ? '#ddd6fe' : '#6366f1',
            fontWeight: 700
          }}
          itemStyle={{
            color: isDark ? '#fff' : '#2d3748',
            fontWeight: 600
          }}
          cursor={{ fill: isDark ? '#4a5568' : '#e2e8f0', opacity: 0.15 }}
        />
        <Bar dataKey="value" radius={[8, 8, 0, 0]} isAnimationActive barSize={52}>
          {data.map((_, idx) => (
            <Cell key={idx} fill={barColors[idx % barColors.length]} />
          ))}
          <LabelList
            dataKey="value"
            position="top"
            style={{
              fontWeight: 700,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 16,
              fill: isDark ? '#fff' : '#4a5568',
              textShadow: isDark ? '1px 1px 2px #2d3748' : '1px 1px 2px #edf2f7'
            }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}