"use client";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "react-toastify";
import remarkGfm from "remark-gfm";

const HandleCopy = ({
  children,
  content,
}: {
  children: ReactNode;
  content: string;
}) => {
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(content);
    toast.success("Link copied successfully");
  };
  return <span onClick={handleCopyUrl}>{children}</span>;
};

const ReactRemarkdownDataVisualComponent = ({
  context,
}: {
  context: string;
}) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        img: ({ src, alt, className, ...props }) => {
          return (
            <div className="my-4">
              <Image
                {...props}
                className={`${className} h-auto w-full rounded-lg`}
                alt={alt ?? ""}
                src={src ?? ""}
                width={600}
                height={400}
              />
            </div>
          );
        },
        code: Code,
        a: ({ href, children, ...props }) => {
          return href
            ?.toLocaleLowerCase()
            .includes("https://res.cloudinary.com") ? (
            <div className="my-4">
              <Image
                className="h-auto w-full rounded-lg"
                alt={""}
                src={href}
                width={600}
                height={400}
              />
            </div>
          ) : (
            <Link
              {...props}
              href={href ? href : "#"}
              className="text-blue-600 underline transition-colors duration-300 hover:text-blue-800"
            >
              {children}
            </Link>
          );
        },
        ul: ({ children }) => {
          return (
            <ul className="my-4 list-inside list-disc space-y-2 pl-6">
              {children}
            </ul>
          );
        },
        ol: ({ children }) => {
          return (
            <ol className="my-4 list-inside list-decimal space-y-2 pl-6">
              {children}
            </ol>
          );
        },
        h1: ({ children }) => {
          return (
            <h1 className="my-6 border-b-2 border-gray-200 pb-2 text-4xl font-bold">
              {children}
            </h1>
          );
        },
        h2: ({ children }) => {
          return (
            <h2 className="my-5 border-b-2 border-gray-200 pb-2 text-3xl font-bold">
              {children}
            </h2>
          );
        },
        h3: ({ children }) => {
          return <h3 className="my-4 text-2xl font-bold">{children}</h3>;
        },
        h4: ({ children }) => {
          return <h4 className="my-3 text-xl font-bold">{children}</h4>;
        },
        p: ({ children }) => {
          return <p className="my-3 leading-relaxed">{children}</p>;
        },
        blockquote: ({ children }) => {
          return (
            <blockquote className="my-4 border-l-4 border-gray-300 pl-4 italic text-gray-600">
              {children}
            </blockquote>
          );
        },
      }}
    >
      {context}
    </ReactMarkdown>
  );
};

export default ReactRemarkdownDataVisualComponent;

type CodeProps = {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
};

const Code: React.FC<CodeProps> = ({
  inline,
  className,
  children,
  ...props
}) => {
  const match = /language-(\w+)/.exec(className || "");
  console.log({ inline, children, type: typeof children });
  if (inline) {
    return (
      <code className="rounded-md bg-gray-100 px-2 py-1 text-sm">
        {children}
      </code>
    );
  }
  if (typeof children === "string" && children.length < 100) return children;
  return (
    <div className="relative my-4">
      <SyntaxHighlighter
        style={a11yDark}
        language={match ? match[1] : "javascript"}
        PreTag="pre"
        {...props}
        codeTagProps={{
          style: {
            padding: "1rem",
            borderRadius: "5px",
            overflowX: "auto",
          },
        }}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
      <HandleCopy content={children as string}>
        <button className="absolute right-2 top-2 rounded-md bg-[#3d3d3d] p-2 text-white transition-colors hover:bg-[#4d4d4d]">
          Copy code
        </button>
      </HandleCopy>
    </div>
  );
};
