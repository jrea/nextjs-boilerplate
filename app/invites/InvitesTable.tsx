"use client";
import { Button } from "@/components/ui/button";
import { Invite } from "@niledatabase/server";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./InviteUserTable";
import { deleteInvite, resend } from "./actions";

const columns: ColumnDef<Invite>[] = [
  { accessorKey: "identifier", header: "Email" },
  { accessorKey: "expires", header: "expires" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const invite = row.original;
      return (
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => resend(invite)}>
            Resend
          </Button>
          <Button variant="destructive" onClick={() => deleteInvite(invite)}>
            Delete
          </Button>
        </div>
      );
    },
  },
];
export default function InvitesTable({ invites }: { invites: Invite[] }) {
  return (
    <DataTable
      columns={columns}
      data={invites instanceof Response ? [] : invites}
    />
  );
}
