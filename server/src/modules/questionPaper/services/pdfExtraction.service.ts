import fs from "fs";
import {PDFParse} from "pdf-parse";

export const extractPdfText = async (
  filePath: string,
): Promise<string> => {
  try {
    const pdfBuffer = fs.readFileSync(filePath);

    const parser = new PDFParse({
      data: pdfBuffer,
    });

    const result = await parser.getText();

    await parser.destroy();

    return result.text;
  } catch (error) {
    console.error("PDF TEXT EXTRACTION ERROR:", error);

    throw new Error("Failed to extract text from PDF");
  }
};