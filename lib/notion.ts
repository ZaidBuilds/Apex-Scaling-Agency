import { Client } from "@notionhq/client";

const notionKey = process.env.NOTION_API_KEY;
const databaseId = process.env.NOTION_DATABASE_ID;

// Lazily initialize client to prevent execution errors if keys are missing
export const notion = notionKey && !notionKey.includes("your_notion") 
  ? new Client({ auth: notionKey }) 
  : null;

export async function addLeadToNotion(data: {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  serviceNeeded: string;
  timeline: string;
  budget: string;
}) {
  if (!notion || !databaseId || databaseId.includes("your_notion")) {
    console.warn("Notion CRM keys missing or default. Logging lead locally:", data);
    return { success: true, mocked: true };
  }

  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: data.name,
              },
            },
          ],
        },
        Email: {
          email: data.email,
        },
        Phone: {
          phone_number: data.phone,
        },
        "Business Name": {
          rich_text: [
            {
              text: {
                content: data.businessName || "N/A",
              },
            },
          ],
        },
        "Service Needed": {
          rich_text: [
            {
              text: {
                content: data.serviceNeeded,
              },
            },
          ],
        },
        Timeline: {
          rich_text: [
            {
              text: {
                content: data.timeline,
              },
            },
          ],
        },
        Budget: {
          rich_text: [
            {
              text: {
                content: data.budget,
              },
            },
          ],
        },
      },
    });
    return { success: true, id: response.id };
  } catch (error) {
    console.error("Error writing to Notion Database:", error);
    throw error;
  }
}
