import CodeBlock from "../CodeBlock/CodeBlock";
import "./CommentContent.css";

function CommentContent({ content }: { content: string }) {
  // Split content by code blocks while preserving the delimiters
  const parts = content.split(/(```[\w-]*\n[\s\S]*?\n```)/g);

  return (
    <div className="comment-content">
      {parts.map((part, index) => {
        // Check if this part is a code block
        if (part.startsWith("```")) {
          // Match pattern: ```language\ncode\n```
          const match = part.match(/```([\w-]*)\n([\s\S]*?)\n```/);

          if (match) {
            const [, language, code] = match;
            return (
              <CodeBlock 
                language={language || "text"} 
                code={code} 
                key={index} 
              />
            );
          }
        }

        // Handle regular text content
        return part.split("\n").map((line, lineIdx) => (
          <p key={`${index}-${lineIdx}`} className="comment-paragraph">
            {line || "\u00A0"} {/* Non-breaking space for empty lines */}
          </p>
        ));
      })}
    </div>
  );
}

export default CommentContent;