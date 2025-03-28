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
          p: ({ children }) => <p className="mb-4">{children}</p>,
          ul: ({ children }) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-6 mb-4">{children}</ol>,
          li: ({ children }) => <li className="mb-2">{children}</li>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}; 