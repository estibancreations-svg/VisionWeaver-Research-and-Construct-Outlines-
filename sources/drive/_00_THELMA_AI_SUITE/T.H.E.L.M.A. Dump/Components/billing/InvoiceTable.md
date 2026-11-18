Original name: InvoiceTable.docx
Drive ID: 150X6hR4oV9BTFLNjuYCqLrmabdQBzwFh
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/Components/billing/
Modified: 2025-12-19T17:04:58.000Z

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Eye, Send } from "lucide-react";
import { format } from "date-fns";

const statusColors = {
  draft: "bg-gray-100 text-gray-800",
  pending: "bg-yellow-100 text-yellow-800",
  sent: "bg-blue-100 text-blue-800",
  paid: "bg-green-100 text-green-800",
  overdue: "bg-red-100 text-red-800",
  cancelled: "bg-gray-100 text-gray-500"
};

export default function InvoiceTable({ invoices, onView, onDownload, onSend }) {
  if (!invoices || invoices.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No invoices found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice #</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">
                {invoice.invoice_number}
              </TableCell>
              <TableCell>
                {invoice.billing_date ? format(new Date(invoice.billing_date), 'MMM d, yyyy') : '-'}
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{invoice.customer_name || 'N/A'}</p>
                  <p className="text-sm text-gray-500">{invoice.customer_email}</p>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {invoice.invoice_type}
                </Badge>
              </TableCell>
              <TableCell className="font-semibold">
                ${invoice.total_amount?.toFixed(2) || '0.00'}
              </TableCell>
              <TableCell>
                <Badge className={statusColors[invoice.status] || statusColors.draft}>
                  {invoice.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" onClick={() => onView?.(invoice)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => onDownload?.(invoice)}>
                    <Download className="w-4 h-4" />
                  </Button>
                  {invoice.status === 'draft' && (
                    <Button size="sm" variant="ghost" onClick={() => onSend?.(invoice)}>
                      <Send className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
