import { NextResponse } from "next/server";
import { z } from "zod";
import { addLeadToNotion } from "@/lib/notion";
import { Resend } from "resend";

const leadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone number is required"),
  businessName: z.string().optional().or(z.literal("")),
  serviceNeeded: z.string(),
  timeline: z.string(),
  budget: z.string(),
});

const resendKey = process.env.RESEND_API_KEY;
const resend = resendKey && !resendKey.includes("your_resend") ? new Resend(resendKey) : null;
const notificationEmail = process.env.NOTIFICATION_EMAIL || "collab.zaidbuilds@gmail.com";

// Service map for readable emails
const serviceMap: Record<string, string> = {
  simple: "Simple Website (Starter Package) - ₹10,000",
  growth: "Interactive Growth Website - ₹15,000-₹18,000",
  premium: "Premium 3D & Custom App - ₹20,000-₹25,000",
  ecommerce: "E-Commerce Store - ₹25,000+",
};

const timelineMap: Record<string, string> = {
  asap: "ASAP (Within 2 weeks)",
  normal: "2-4 Weeks",
  flexible: "Flexible (1 Month+)",
};

const budgetMap: Record<string, string> = {
  starter: "₹10,000 — ₹15,000",
  growth: "₹15,000 — ₹25,000",
  premium: "₹25,000+",
  notsure: "Not sure / Flexible",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 1. Validate incoming data
    const parseResult = leadSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const leadData = parseResult.data;

    // 2. Write to Notion Database CRM
    let notionResult = { success: true, mocked: true, id: "" };
    try {
      const result = await addLeadToNotion({
        ...leadData,
        businessName: leadData.businessName || "",
      });
      if (result) notionResult = { ...notionResult, ...result, mocked: !!result.mocked };
    } catch (notionErr) {
      console.error("Failed writing to Notion database, continuing flow:", notionErr);
    }

    // 3. Dispatch Notification Email via Resend
    let emailResult = { success: false, mocked: true, id: "" };
    const readableService = serviceMap[leadData.serviceNeeded] || leadData.serviceNeeded;
    const readableTimeline = timelineMap[leadData.timeline] || leadData.timeline;
    const readableBudget = budgetMap[leadData.budget] || leadData.budget;

    if (resend) {
      try {
        const emailResponse = await resend.emails.send({
          from: "Apex Scaling Leads <onboarding@resend.dev>", // default sender for Resend free tier sandbox
          to: notificationEmail,
          subject: `⚡ New Lead: ${leadData.name} (${leadData.businessName || "No Company"})`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; padding: 20px; background-color: #0b0b14; color: #ffffff; border-radius: 12px; border: 1px solid #1a1a2e;">
              <h2 style="color: #6c63ff; border-bottom: 1px solid #1a1a2e; padding-bottom: 10px;">⚡ New Project Request</h2>
              <p style="color: #9999aa; font-size: 14px;">A lead has been successfully registered on the Apex Scaling website.</p>
              
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr>
                  <td style="padding: 8px 0; color: #9999aa; font-size: 13px; width: 140px;">Client Name:</td>
                  <td style="padding: 8px 0; color: #ffffff; font-size: 14px; font-weight: bold;">${leadData.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #9999aa; font-size: 13px;">Business Name:</td>
                  <td style="padding: 8px 0; color: #ffffff; font-size: 14px;">${leadData.businessName || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #9999aa; font-size: 13px;">Email Address:</td>
                  <td style="padding: 8px 0; color: #6c63ff; font-size: 14px;"><a href="mailto:${leadData.email}" style="color: #6c63ff; text-decoration: none;">${leadData.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #9999aa; font-size: 13px;">Phone Number:</td>
                  <td style="padding: 8px 0; color: #ffffff; font-size: 14px; font-family: monospace;">${leadData.phone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #9999aa; font-size: 13px;">Service Needed:</td>
                  <td style="padding: 8px 0; color: #f5a623; font-size: 14px; font-weight: bold;">${readableService}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #9999aa; font-size: 13px;">Timeline:</td>
                  <td style="padding: 8px 0; color: #ffffff; font-size: 14px;">${readableTimeline}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #9999aa; font-size: 13px;">Budget:</td>
                  <td style="padding: 8px 0; color: #ffffff; font-size: 14px; font-weight: bold;">${readableBudget}</td>
                </tr>
              </table>
              
              <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #1a1a2e; font-size: 11px; color: #9999aa;">
                • Notion Sync Status: ${notionResult.mocked ? "Local Mock Log Only" : `Synced (ID: ${notionResult.id})`}<br />
                • Received: ${new Date().toLocaleString("en-IN")}
              </div>
            </div>
          `,
        });
        
        if (emailResponse.data) {
          emailResult = { success: true, mocked: false, id: emailResponse.data.id };
        }
      } catch (resendErr) {
        console.error("Resend API failed, continuing flow:", resendErr);
      }
    } else {
      console.warn("Resend API key missing. Lead logged to server output.");
    }

    return NextResponse.json({
      success: true,
      message: "Lead processed successfully",
      crmSync: notionResult.mocked ? "mocked" : "synced",
      emailSync: emailResult.mocked ? "mocked" : "sent",
    });

  } catch (error) {
    console.error("Critical error inside lead API route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
