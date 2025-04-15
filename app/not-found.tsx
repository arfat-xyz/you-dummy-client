import { metaDataGeneratorForNormalPage } from "@/lib/meta-generator";
import Link from "next/link";

export const metadata = metaDataGeneratorForNormalPage("Not Found");
export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center p-6 bg-white shadow-md rounded-lg max-w-md w-full">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <h2 className="mt-4 text-xl text-gray-700">Page Not Found</h2>
        <p className="mt-2 text-gray-500">
          Oops! The page you are looking for doesn’t exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-full"
          >
            Go back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
