"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { type Monthlydata } from "@/lib/types";

interface MonthlyDataTableProps {
  data: Monthlydata[];
  setData: (data: Monthlydata[]) => void;
}

export function MonthlyDataTable({ data, setData }: MonthlyDataTableProps) {
  const handleChange = (
    id: string,
    field: keyof Monthlydata,
    value: string
  ) => {
    const numericValue = parseInt(value) || 0;
    const updatedData = data.map((item) => {
      if (item.id === id) {
        const newItem = { ...item, [field]: numericValue };

        // Ensure completed values don't exceed programmed values
        if (
          field === "inspectionsCompleted" &&
          numericValue > item.inspectionsProgrammed
        ) {
          newItem.inspectionsCompleted = item.inspectionsProgrammed;
        }
        if (
          field === "trainingCompleted" &&
          numericValue > item.trainingProgrammed
        ) {
          newItem.trainingCompleted = item.trainingProgrammed;
        }

        return newItem;
      }
      return item;
    });
    setData(updatedData);
  };

  const calculatePercentage = (completed: number, programmed: number) => {
    if (programmed === 0) return 0;
    return ((completed / programmed) * 100).toFixed(1);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mes</TableHead>
            <TableHead>Inspecciones Programadas</TableHead>
            <TableHead>Inspecciones Realizadas</TableHead>
            <TableHead>% Avance</TableHead>
            <TableHead>Capacitaciones Programadas</TableHead>
            <TableHead>Capacitaciones Realizadas</TableHead>
            <TableHead>% Avance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.month}</TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={row.inspectionsProgrammed}
                  onChange={(e) =>
                    handleChange(
                      row.id,
                      "inspectionsProgrammed",
                      e.target.value
                    )
                  }
                  className="w-20"
                  min="0"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={row.inspectionsCompleted}
                  onChange={(e) =>
                    handleChange(row.id, "inspectionsCompleted", e.target.value)
                  }
                  className="w-20"
                  min="0"
                  max={row.inspectionsProgrammed}
                />
              </TableCell>
              <TableCell>
                {calculatePercentage(
                  row.inspectionsCompleted,
                  row.inspectionsProgrammed
                )}
                %
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={row.trainingProgrammed}
                  onChange={(e) =>
                    handleChange(row.id, "trainingProgrammed", e.target.value)
                  }
                  className="w-20"
                  min="0"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={row.trainingCompleted}
                  onChange={(e) =>
                    handleChange(row.id, "trainingCompleted", e.target.value)
                  }
                  className="w-20"
                  min="0"
                  max={row.trainingProgrammed}
                />
              </TableCell>
              <TableCell>
                {calculatePercentage(
                  row.trainingCompleted,
                  row.trainingProgrammed
                )}
                %
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
