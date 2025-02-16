"use client";

import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
import DashboardCard from "@/components/dashboard/DashboardCard";

import { MonthlyDataChart } from "@/components/monthly-data-chart";
import { MonthlyDataTable } from "@/components/monthly-data-table";

import PostsTable from "@/components/posts/PostsTable";
import { Card } from "@/components/ui/card";
import { initialData2, Monthlydata } from "@/lib/types";
import { Folder, MessageCircle, Newspaper, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [data2, setData2] = useState<Monthlydata[]>(initialData2);

  return (
    <>
      <>
        <div className="flex flex-col md:flex-row justify-between gap-5 mb-5">
          <DashboardCard
            title="Posts"
            count={100}
            icon={<Newspaper className="text-slate-500" size={72} />}
          />
          <DashboardCard
            title="Categories"
            count={100}
            icon={<Folder className="text-slate-500" size={72} />}
          />
          <DashboardCard
            title="users"
            count={100}
            icon={<User className="text-slate-500" size={72} />}
          />
          <DashboardCard
            title="Messages"
            count={100}
            icon={<MessageCircle className="text-slate-500" size={72} />}
          />
        </div>
        <AnalyticsChart />
        <PostsTable title="ultimos posts" limit={5} />

        <div className="container mx-auto py-10 space-y-8">
          <h1 className="text-3xl font-bold text-center">
            Dashboard de Inspecciones y Capacitaciones
          </h1>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Resumen Gráfico</h2>
            <MonthlyDataChart data={data2} />
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Datos Mensuales</h2>
            <MonthlyDataTable data={data2} setData={setData2} />
          </Card>
        </div>
      </>
    </>
  );
}
