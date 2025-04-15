import { useState } from "react";
import jsPDF from "jspdf";
import ReactRemarkdownDataVisualComponent from "@/components/react-markdown-data-visual-component";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { renderToString } from "react-dom/server";
import SpinnerLoader from "@/components/loader";
import { CustomToolTipComponent } from "@/components/custom-tooltip";

const DownloadContentAsPdf = ({
  content,
  name,
}: {
  content: string;
  name: string;
}) => {
  // State to track loading
  const [loading, setLoading] = useState(false);

  const downloadPDF = () => {
    setLoading(true); // Set loading to true when download starts

    // Convert markdown to HTML using ReactMarkdown
    const renderedHTML = (
      <div className="w-[575px] ms-4">
        <ReactRemarkdownDataVisualComponent context={content} />
      </div>
    );

    // Create a jsPDF instance with options for reduced file size
    const doc = new jsPDF("landscape", "px", "a4", true);

    // Convert the JSX rendered by ReactMarkdown to plain HTML string for jsPDF
    const htmlString = renderToString(renderedHTML); // this converts JSX to string

    // Set styles for the HTML content
    doc.html(htmlString, {
      callback: (doc) => {
        setLoading(false); // Set loading to false once the PDF is generated
        doc.save(`${name}.pdf`);
      },
      x: 10,
      y: 10,
      width: 800,
      html2canvas: {
        scale: 0.5, // Lower the scale to reduce file size (optional)
        logging: false, // Disable logging for smaller files
        useCORS: true, // Make sure images are loaded from external sources
        letterRendering: true, // Enable letter rendering for better text
      },
    });
  };

  return (
    <>
      <div className="hidden md:flex items-center justify-between px-4 py-3">
        <CustomToolTipComponent
          toolValue="Download content"
          triggerer={
            <Button
              variant="link"
              className="border-b-2 hover:border-blue-500 border-transparent rounded-none hover:no-underline "
              onClick={downloadPDF}
              disabled={loading}
            >
              {" "}
              Download
              {loading ? (
                <SpinnerLoader size={10} /> // Show loading text while PDF is being generated
              ) : (
                <>
                  <Download size={10} />
                </>
              )}
            </Button>
          }
        />
      </div>

      {/* Optional: Show a loading spinner if you prefer */}
      {loading && (
        <div className="flex justify-center items-center mt-4">
          <div className="animate-spin border-t-4 border-blue-600 w-8 h-8 rounded-full"></div>
        </div>
      )}
    </>
  );
};

export default DownloadContentAsPdf;
