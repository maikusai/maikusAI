import React, { useMemo } from 'react';
import {
    AreaChart, Area,
    BarChart, Bar,
    PieChart, Pie, Cell,
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { TrendingUp, Activity, Phone, AlertTriangle, CheckCircle } from 'lucide-react';

// ─────────────────────────────────────────────
//  Colour palette
// ─────────────────────────────────────────────
const COLORS = {
    blue:   '#3B82F6',
    green:  '#10B981',
    purple: '#8B5CF6',
    amber:  '#F59E0B',
    red:    '#EF4444',
    cyan:   '#06B6D4',
    pink:   '#EC4899',
    lime:   '#84CC16',
};
const PIE_COLORS = [COLORS.blue, COLORS.green, COLORS.red, COLORS.purple, COLORS.amber, COLORS.cyan];

const CARD = 'bg-[#0f1524] border border-white/[0.07] rounded-2xl p-4 md:p-5';
const SECTION_TITLE = 'text-xs font-bold text-white/40 uppercase tracking-widest mb-4';

// ─────────────────────────────────────────────
//  Custom tooltip
// ─────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-3 shadow-2xl text-sm">
            {label && <p className="text-white/50 text-xs mb-2">{label}</p>}
            {payload.map((p: any) => (
                <p key={p.name} style={{ color: p.color || p.fill || '#fff' }}>
                    <span className="font-semibold">{p.name}:</span> {p.value}
                </p>
            ))}
        </div>
    );
};

// ─────────────────────────────────────────────
//  Stat card
// ─────────────────────────────────────────────
const StatCard = ({ label, value, icon: Icon, color }: any) => (
    <div className={`${CARD} flex items-center gap-4`}>
        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: color + '20' }}>
            <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-xs text-white/40 mt-0.5">{label}</p>
        </div>
    </div>
);

// ─────────────────────────────────────────────
//  Cumulative helper chart (declared before use)
// ─────────────────────────────────────────────
const CumulativeChart = ({ calls, appointments }: { calls: any[]; appointments: any[] }) => {
    const data = useMemo(() => {
        const fmt = (ts: string) =>
            new Date(ts).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
        const allDates = [
            ...calls.map(c => fmt(c.created_at)),
            ...appointments.map(a => fmt(a.created_at)),
        ];
        const uniqueDates = [...new Set(allDates)].sort();
        let cCalls = 0, cAppts = 0;
        return uniqueDates.map(date => {
            cCalls += calls.filter(c => fmt(c.created_at) === date).length;
            cAppts += appointments.filter(a => fmt(a.created_at) === date).length;
            return { date, Calls: cCalls, Appointments: cAppts };
        });
    }, [calls, appointments]);

    return (
        <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }} />
                <Line type="monotone" dataKey="Calls" stroke={COLORS.blue} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="Appointments" stroke={COLORS.purple} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
        </ResponsiveContainer>
    );
};

// ─────────────────────────────────────────────
//  Main component
// ─────────────────────────────────────────────
interface Props {
    calls: any[];
    appointments: any[];
    queries: any[];
}

const DashboardAnalytics: React.FC<Props> = ({ calls, appointments, queries }) => {

    // 1. Calls per day
    const callsPerDay = useMemo(() => {
        const map: Record<string, number> = {};
        calls.forEach(c => {
            const day = new Date(c.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
            map[day] = (map[day] || 0) + 1;
        });
        return Object.entries(map).map(([date, count]) => ({ date, count }));
    }, [calls]);

    // 2. Sentiment distribution
    const sentimentData = useMemo(() => {
        const map: Record<string, number> = { Positive: 0, Neutral: 0, Negative: 0 };
        calls.forEach(c => {
            const s = (c.sentiment || '').toLowerCase();
            if (s.includes('positive')) map['Positive']++;
            else if (s.includes('negative')) map['Negative']++;
            else map['Neutral']++;
        });
        return Object.entries(map)
            .filter(([, v]) => v > 0)
            .map(([name, value]) => ({ name, value }));
    }, [calls]);

    // 3. Call intent breakdown
    const intentData = useMemo(() => {
        const map: Record<string, number> = {};
        calls.forEach(c => {
            const intent: string = c.extracted_variables?.call_intent || 'unknown';
            const key = intent.charAt(0).toUpperCase() + intent.slice(1);
            map[key] = (map[key] || 0) + 1;
        });
        return Object.entries(map).map(([name, count]) => ({ name, count }));
    }, [calls]);

    // 4. Top branches
    const branchData = useMemo(() => {
        const map: Record<string, number> = {};
        appointments.forEach(a => {
            const b: string = a.branch_name || 'Unknown';
            map[b] = (map[b] || 0) + 1;
        });
        return Object.entries(map)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8)
            .map(([branch, count]) => ({ branch, count }));
    }, [appointments]);

    // 5. Treatment type
    const treatmentData = useMemo(() => {
        const map: Record<string, number> = {};
        appointments.forEach(a => {
            const t: string = a.treatment_type || 'Unknown';
            map[t] = (map[t] || 0) + 1;
        });
        return Object.entries(map)
            .sort((a, b) => b[1] - a[1])
            .map(([name, value]) => ({ name, value }));
    }, [appointments]);

    // 6. Appointment status
    const statusData = useMemo(() => {
        const map: Record<string, number> = {};
        appointments.forEach(a => {
            const s: string = a.status || 'unknown';
            map[s] = (map[s] || 0) + 1;
        });
        return Object.entries(map).map(([name, value]) => ({ name, value }));
    }, [appointments]);

    // 7. Query category
    const queryTypeData = useMemo(() => {
        const map: Record<string, number> = {};
        queries.forEach(q => {
            const cat: string = q.category || 'General';
            map[cat] = (map[cat] || 0) + 1;
        });
        return Object.entries(map).map(([name, value]) => ({ name, value }));
    }, [queries]);

    // 8. Hourly heatmap — Object.entries keys are always strings, use padStart directly
    const hourlyData = useMemo(() => {
        const map: Record<string, number> = {};
        for (let i = 0; i < 24; i++) map[String(i)] = 0;
        calls.forEach(c => {
            const h = String(new Date(c.created_at).getHours());
            map[h] = (map[h] || 0) + 1;
        });
        return Object.entries(map).map(([h, count]) => ({
            hour: `${h.padStart(2, '0')}:00`,
            count,
        }));
    }, [calls]);

    // 9. Weekly radar
    const radarData = useMemo(() => {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const callMap: Record<string, number> = {};
        const apptMap: Record<string, number> = {};
        const qMap: Record<string, number> = {};
        const dayFmt = (ts: string) =>
            new Date(ts).toLocaleDateString('en-GB', { weekday: 'short' });
        calls.forEach(c => { const d = dayFmt(c.created_at); callMap[d] = (callMap[d] || 0) + 1; });
        appointments.forEach(a => { const d = dayFmt(a.created_at); apptMap[d] = (apptMap[d] || 0) + 1; });
        queries.forEach(q => { const d = dayFmt(q.created_at); qMap[d] = (qMap[d] || 0) + 1; });
        return days.map(day => ({
            day,
            Calls: callMap[day] || 0,
            Appointments: apptMap[day] || 0,
            Queries: qMap[day] || 0,
        }));
    }, [calls, appointments, queries]);

    // KPI summary
    const totalCalls = calls.length;
    const completedCalls = calls.filter(c => (c.call_status || '').toLowerCase() === 'completed').length;
    const positiveSentiment = calls.filter(c => (c.sentiment || '').toLowerCase().includes('positive')).length;
    const emergencyQueries = queries.filter(q => q.category === 'Emergency').length;

    const hasData = totalCalls > 0 || appointments.length > 0 || queries.length > 0;

    if (!hasData) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center">
                <Activity className="w-12 h-12 text-white/20 mb-4" />
                <h3 className="text-white/40 font-semibold text-lg">No data yet</h3>
                <p className="text-white/25 text-sm mt-1">Analytics will appear after calls are logged.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">

            {/* KPI Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                <StatCard label="Total Calls"       value={totalCalls}        icon={Phone}         color={COLORS.blue} />
                <StatCard label="Completed"          value={completedCalls}    icon={CheckCircle}   color={COLORS.green} />
                <StatCard label="Positive Sentiment" value={positiveSentiment} icon={TrendingUp}    color={COLORS.purple} />
                <StatCard label="Emergencies"        value={emergencyQueries}  icon={AlertTriangle} color={COLORS.red} />
            </div>

            {/* Row 1: Area + Donut */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className={`${CARD} lg:col-span-2`}>
                    <p className={SECTION_TITLE}>Call Volume Over Time</p>
                    <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={callsPerDay} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
                            <defs>
                                <linearGradient id="cgBlue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={COLORS.blue} stopOpacity={0.3} />
                                    <stop offset="95%" stopColor={COLORS.blue} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis allowDecimals={false} tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="count" name="Calls" stroke={COLORS.blue} strokeWidth={2} fill="url(#cgBlue)" dot={{ r: 3, fill: COLORS.blue }} activeDot={{ r: 5 }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className={CARD}>
                    <p className={SECTION_TITLE}>Sentiment Distribution</p>
                    <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                            <Pie data={sentimentData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value" nameKey="name">
                                {sentimentData.map((_, i) => <Cell key={i} fill={[COLORS.green, COLORS.amber, COLORS.red][i % 3]} />)}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Row 2: Intent + Branches */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={CARD}>
                    <p className={SECTION_TITLE}>Call Intents</p>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={intentData} margin={{ top: 0, right: 10, bottom: 0, left: -20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis allowDecimals={false} tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="count" name="Calls" radius={[6, 6, 0, 0]}>
                                {intentData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className={CARD}>
                    <p className={SECTION_TITLE}>Top Branches</p>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={branchData} layout="vertical" margin={{ top: 0, right: 10, bottom: 0, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                            <XAxis type="number" allowDecimals={false} tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis type="category" dataKey="branch" width={80} tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="count" name="Appointments" fill={COLORS.purple} radius={[0, 6, 6, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Row 3: Hourly + Radar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className={`${CARD} lg:col-span-2`}>
                    <p className={SECTION_TITLE}>Calls by Hour of Day</p>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={hourlyData} margin={{ top: 0, right: 10, bottom: 0, left: -20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="hour" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} interval={2} />
                            <YAxis allowDecimals={false} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="count" name="Calls" fill={COLORS.cyan} radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className={CARD}>
                    <p className={SECTION_TITLE}>Weekly Activity Radar</p>
                    <ResponsiveContainer width="100%" height={200}>
                        <RadarChart data={radarData}>
                            <PolarGrid stroke="rgba(255,255,255,0.08)" />
                            <PolarAngleAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
                            <PolarRadiusAxis tick={false} axisLine={false} />
                            <Radar name="Calls"        dataKey="Calls"        stroke={COLORS.blue}   fill={COLORS.blue}   fillOpacity={0.15} />
                            <Radar name="Appts"        dataKey="Appointments" stroke={COLORS.purple} fill={COLORS.purple} fillOpacity={0.15} />
                            <Radar name="Queries"      dataKey="Queries"      stroke={COLORS.amber}  fill={COLORS.amber}  fillOpacity={0.15} />
                            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Row 4: Treatment + Status + Queries */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={CARD}>
                    <p className={SECTION_TITLE}>Treatment Types</p>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie data={treatmentData} cx="50%" cy="50%" outerRadius={70} dataKey="value" nameKey="name" paddingAngle={3}>
                                {treatmentData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className={CARD}>
                    <p className={SECTION_TITLE}>Appointment Status</p>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie data={statusData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" nameKey="name" paddingAngle={4}>
                                {statusData.map((_, i) => <Cell key={i} fill={[COLORS.green, COLORS.amber, COLORS.red][i % 3]} />)}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className={CARD}>
                    <p className={SECTION_TITLE}>Query Categories</p>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie data={queryTypeData} cx="50%" cy="50%" outerRadius={70} dataKey="value" nameKey="name" paddingAngle={4}>
                                {queryTypeData.map((_, i) => <Cell key={i} fill={[COLORS.red, COLORS.blue][i % 2]} />)}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Row 5: Cumulative growth */}
            <div className={CARD}>
                <p className={SECTION_TITLE}>Cumulative Growth — Calls vs Appointments</p>
                <CumulativeChart calls={calls} appointments={appointments} />
            </div>

        </div>
    );
};

export default DashboardAnalytics;
