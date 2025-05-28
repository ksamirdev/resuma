import { Document, Page, Text, View } from "@react-pdf/renderer";
import { pdfTw } from "./utils";
import type { FC } from "react";
import type { ResumeT } from "@/types/form";

export const DefaultResumeTemplate: FC<{ data: Partial<ResumeT> }> = ({
  data,
}) => (
  <Document pageMode="useNone">
    <Page size="A4" style={pdfTw("p-6 font-default text-sm text-gray-900")}>
      {/* Header */}
      <View style={pdfTw("flex flex-row justify-between items-start mb-6")}>
        {/* Left section - Name & Contact */}
        <View>
          <Text style={pdfTw("text-3xl font-bold")}>{data?.name || ""}</Text>
          <Text style={pdfTw("text-base")}>{data?.location || ""}</Text>
        </View>

        {/* Right section - Contact Info */}
        <View style={pdfTw("text-right text-sm")}>
          {data?.phone && <Text>{data.phone}</Text>}
          {data?.email && <Text>{data.email}</Text>}
        </View>
      </View>
    </Page>
  </Document>
);
