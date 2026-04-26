import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

const tooltipStyle = {
  backgroundColor: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  fontSize: "12px",
  boxShadow: "0 10px 30px -10px hsl(var(--primary) / 0.2)",
  padding: "8px 12px",
};

const axisStyle = { fontSize: 11, fill: "hsl(var(--muted-foreground))" };

export function MiniArea({ data, dataKey = "value", color = "hsl(var(--primary))", height = 60 }: any) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.4} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} fill={`url(#grad-${dataKey})`} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function AreaChartWidget({ data, height = 240 }: any) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.4} />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
        <XAxis dataKey="time" tick={axisStyle} axisLine={false} tickLine={false} />
        <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#g1)" />
        <Area type="monotone" dataKey="latency" stroke="hsl(var(--accent))" strokeWidth={2} fill="url(#g2)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function LineChartWidget({ data, height = 240 }: any) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
        <XAxis dataKey="hour" tick={axisStyle} axisLine={false} tickLine={false} />
        <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: 11 }} iconType="circle" />
        <Line type="monotone" dataKey="incidents" stroke="hsl(var(--destructive))" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
        <Line type="monotone" dataKey="resolved" stroke="hsl(var(--success))" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function BarChartWidget({ data, height = 240 }: any) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
        <XAxis dataKey="time" tick={axisStyle} axisLine={false} tickLine={false} />
        <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "hsl(var(--muted) / 0.4)" }} />
        <Bar dataKey="errors" radius={[6, 6, 0, 0]}>
          {data.map((d: any, i: number) => (
            <Cell key={i} fill={d.errors > 8 ? "hsl(var(--destructive))" : d.errors > 5 ? "hsl(var(--warning))" : "hsl(var(--primary))"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function PieChartWidget({ data, height = 240 }: any) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Tooltip contentStyle={tooltipStyle} />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={55}
          outerRadius={90}
          paddingAngle={2}
          stroke="hsl(var(--background))"
          strokeWidth={2}
        >
          {data.map((entry: any, i: number) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
        <Legend
          wrapperStyle={{ fontSize: 11 }}
          iconType="circle"
          layout="vertical"
          align="right"
          verticalAlign="middle"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function Heatmap({ data }: { data: { day: number; hour: number; value: number }[] }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="space-y-1">
      <div className="flex gap-px ml-8 text-[9px] text-muted-foreground mb-1">
        {Array.from({ length: 24 }, (_, i) => (
          <div key={i} className="flex-1 text-center">{i % 3 === 0 ? i : ""}</div>
        ))}
      </div>
      {days.map((day, dIdx) => (
        <div key={day} className="flex items-center gap-px">
          <div className="w-7 text-[10px] text-muted-foreground font-medium">{day}</div>
          {Array.from({ length: 24 }, (_, hIdx) => {
            const cell = data.find((d) => d.day === dIdx && d.hour === hIdx);
            const intensity = cell ? cell.value / max : 0;
            return (
              <div
                key={hIdx}
                className="flex-1 aspect-square rounded-sm transition-transform hover:scale-150 hover:z-10 hover:ring-2 hover:ring-primary cursor-pointer"
                style={{
                  background: `hsl(var(--primary) / ${0.05 + intensity * 0.85})`,
                }}
                title={`${day} ${hIdx}:00 — ${cell?.value} events`}
              />
            );
          })}
        </div>
      ))}
      <div className="flex items-center gap-2 mt-3 text-[10px] text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-px">
          {[0.05, 0.2, 0.4, 0.6, 0.85].map((o) => (
            <div key={o} className="h-3 w-3 rounded-sm" style={{ background: `hsl(var(--primary) / ${o})` }} />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
