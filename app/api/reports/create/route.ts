import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ReportType } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const { reportData } = await request.json();
    const { reportId, type, specificType, title, description, image, status } =
      reportData;

    console.log("Debugging");
    console.log("reportId:", reportId);
    console.log("type:", type);
    console.log("specificType:", specificType);
    console.log("title:", title);
    console.log("description:", description);
    console.log("image:", image);
    console.log("status:", status);

    const report = await prisma.report.create({
      data: {
        reportId,
        type: "EMERGENCY", //type as ReportType,
        title,
        description,
        reportType: specificType,
        image: image || null,
        status: status || "PENDING",
      },
    });

    return NextResponse.json({
      success: true,
      reportId: report.reportId,
      message: "Report id successfully submitted!",
    });
  } catch (error) {
    console.error("Error in POST handler:", error.message);

    return NextResponse.json(
      {
        success: false,
        error: "Invalid JSON format or failed to submit report",
      },
      { status: 400 }
    );
  }
}
