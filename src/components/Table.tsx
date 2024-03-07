// Table.js

import { useReactTable, flexRender, getCoreRowModel } from '@tanstack/react-table';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

export default function AppTable({ columns, data }) {
    
  // Use the useTable Hook to send the columns and data to build the table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    // <div className="flex justify-center h-screen">
    //   <Table className="my-auto border">
    //     <thead>
    //       {table.getHeaderGroups().map(headerGroup => (
    //         <tr
    //           key={headerGroup.id}
    //           className="border-b text-gray-800 uppercase">
    //           {headerGroup.headers.map(header => (
    //             <th
    //               key={header.id}
    //               className="px-4 pr-2 py-4 font-medium text-left">
    //               {header.isPlaceholder
    //                 ? null
    //                 : flexRender(
    //                     header.column.columnDef.header,
    //                     header.getContext()
    //                   )}
    //             </th>
    //           ))}
    //         </tr>
    //       ))}
    //     </thead>
    //     <tbody>
    //       {table.getRowModel().rows.map(row => (
    //         <tr key={row.id} className="border-b">
    //           {row.getVisibleCells().map(cell => (
    //             <td key={cell.id} className="px-4 pt-[14px] pb-[18px]">
    //               {flexRender(cell.column.columnDef.cell, cell.getContext())}
    //             </td>
    //           ))}
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    //   <div/>
    // </div>
  );
}