import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
// import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { reportid: string } }
) {
  try {
    console.log("Params:", params);
    console.log("ReportID:", params.reportid);
    const report = await prisma.report.findUnique({
      where: {
        reportId: params.reportid,
      },
    });

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    return NextResponse.json(report);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch report details" },
      { status: 500 }
    );
  }
}

// export async function PATCH(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const session = await getServerSession();
//     if (!session) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { status } = await request.json();
//     const report = await prisma.report.update({
//       where: { id: params.id },
//       data: { status },
//     });

//     return NextResponse.json(report);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Error updating report" },
//       { status: 500 }
//     );
//   }
// }
