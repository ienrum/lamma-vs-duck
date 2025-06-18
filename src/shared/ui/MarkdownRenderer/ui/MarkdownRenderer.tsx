import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer = ({ content, className }: MarkdownRendererProps) => {
  return (
    <div className={className}>
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="mb-4 !text-black">{children}</p>,
          ul: ({ children }) => <ul className="mb-4 list-disc pl-6 !text-black">{children}</ul>,
          ol: ({ children }) => <ol className="mb-4 list-decimal pl-6 !text-black">{children}</ol>,
          li: ({ children }) => <li className="mb-2 !text-black">{children}</li>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
