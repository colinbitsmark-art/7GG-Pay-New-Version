"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { allocationData, complianceStats, riskAlertData, volumeData } from "@/lib/mock-data";

const chartGold = "#D4AF37";
const chartSoftGold = "#F5D76E";
const chartGreen = "#22C55E";
const chartAmber = "#F59E0B";
const chartRed = "#EF4444";
const muted = "var(--text-secondary)";

const tooltipStyle = {
  background: "var(--modal-bg)",
  border: "1px solid var(--border-subtle)",
  borderRadius: "12px",
  color: "var(--text-primary)"
};

export function VolumeChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={volumeData} margin={{ left: -10, right: 10, top: 10 }}>
        <defs>
          <linearGradient id="payIn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={chartGold} stopOpacity={0.42} />
            <stop offset="95%" stopColor={chartGold} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="payOut" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={chartGreen} stopOpacity={0.26} />
            <stop offset="95%" stopColor={chartGreen} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="var(--border-muted)" vertical={false} />
        <XAxis dataKey="month" stroke={muted} tickLine={false} axisLine={false} />
        <YAxis stroke={muted} tickLine={false} axisLine={false} tickFormatter={(value) => `$${Number(value) / 1000000}M`} />
        <Tooltip contentStyle={tooltipStyle} />
        <Area type="monotone" dataKey="payIn" stroke={chartGold} fill="url(#payIn)" strokeWidth={2} />
        <Area type="monotone" dataKey="payOut" stroke={chartGreen} fill="url(#payOut)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function AllocationChart() {
  const colors = [chartGold, chartSoftGold, chartGreen, "#38BDF8", "#A78BFA"];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={allocationData}
          dataKey="value"
          innerRadius={72}
          outerRadius={104}
          paddingAngle={4}
        >
          {allocationData.map((entry, index) => (
            <Cell key={entry.name} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function RiskAlertChart() {
  return (
    <ResponsiveContainer width="100%" height={270}>
      <BarChart data={riskAlertData} margin={{ left: -20, top: 10 }}>
        <CartesianGrid stroke="var(--border-muted)" vertical={false} />
        <XAxis dataKey="day" stroke={muted} tickLine={false} axisLine={false} />
        <YAxis stroke={muted} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="low" stackId="a" fill={chartGreen} radius={[0, 0, 0, 0]} />
        <Bar dataKey="medium" stackId="a" fill={chartAmber} radius={[0, 0, 0, 0]} />
        <Bar dataKey="high" stackId="a" fill={chartRed} radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ComplianceDonut() {
  const colors = [chartGreen, chartAmber, chartRed, chartGold];

  return (
    <ResponsiveContainer width="100%" height={270}>
      <PieChart>
        <Pie data={complianceStats} dataKey="value" innerRadius={66} outerRadius={96} paddingAngle={4}>
          {complianceStats.map((entry, index) => (
            <Cell key={entry.name} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
      </PieChart>
    </ResponsiveContainer>
  );
}
