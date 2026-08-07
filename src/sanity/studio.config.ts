import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { sanityConfig } from "./config";

export default defineConfig({
  name: "ppmp-studio",
  title: "PPMP - আধুনিক পুলিশ প্রথম ব্যাচ ১৯৯০",
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
  basePath: "/studio",
});
