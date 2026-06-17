import React from "react";

interface MarkdownProps {
  content: string;
}

export default function Markdown({ content }: MarkdownProps) {
  if (!content) return null;

  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inList = false;
  let listItems: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Close list if line is not a list item anymore
    if (inList && !line.startsWith("- ") && !line.startsWith("* ")) {
      elements.push(
        <ul key={`list-${i}`} className="list-disc pl-6 my-4 font-sans space-y-1.5">
          {listItems}
        </ul>
      );
      inList = false;
      listItems = [];
    }

    if (line === "") {
      continue;
    }

    // Headers
    if (line.startsWith("# ")) {
      elements.push(
        <h1 key={i} className="text-2xl font-bold font-mono border-b border-[#1a1a1a]/10 pb-1 mt-6 mb-4 uppercase">
          {line.slice(2)}
        </h1>
      );
    } else if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-xl font-bold font-mono mt-5 mb-3 uppercase">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-lg font-bold font-mono mt-4 mb-2 uppercase">
          {line.slice(4)}
        </h3>
      );
    }
    // Blockquote
    else if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={i} className="border-l-2 border-[#c02b2b] pl-4 italic text-sm text-[#1a1a1a]/70 my-4 font-sans">
          {parseInlineMarkdown(line.slice(2))}
        </blockquote>
      );
    }
    // Images: ![alt](url)
    else if (line.startsWith("![") && line.includes("](")) {
      const altStart = 2;
      const altEnd = line.indexOf("](");
      const urlStart = altEnd + 2;
      const urlEnd = line.indexOf(")", urlStart);
      const alt = line.substring(altStart, altEnd);
      const url = line.substring(urlStart, urlEnd);
      elements.push(
        <div key={i} className="border border-[#1a1a1a]/15 bg-white p-2 my-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt={alt} className="max-w-full h-auto grayscale contrast-125 object-cover mx-auto" />
          <span className="text-[10px] font-mono text-[#1a1a1a]/50 text-center block mt-1.5">{alt}</span>
        </div>
      );
    }
    // List Items
    else if (line.startsWith("- ") || line.startsWith("* ")) {
      inList = true;
      listItems.push(
        <li key={`li-${i}`} className="text-sm text-[#1a1a1a]/85 leading-relaxed">
          {parseInlineMarkdown(line.slice(2))}
        </li>
      );
    }
    // Standard Paragraph
    else {
      elements.push(
        <p key={i} className="text-sm font-sans leading-relaxed text-[#1a1a1a]/85 my-3">
          {parseInlineMarkdown(line)}
        </p>
      );
    }
  }

  // Handle trailing list items
  if (inList) {
    elements.push(
      <ul key={`list-end`} className="list-disc pl-6 my-4 font-sans space-y-1.5">
        {listItems}
      </ul>
    );
  }

  return <div className="space-y-2">{elements}</div>;
}

// Parse bold **text** and links [text](url)
function parseInlineMarkdown(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let currentText = text;
  let keyIdx = 0;

  while (currentText) {
    const boldMatch = currentText.match(/\*\*(.*?)\*\*/);
    const linkMatch = currentText.match(/\[(.*?)\]\((.*?)\)/);

    const boldIdx = boldMatch && boldMatch.index !== undefined ? boldMatch.index : Infinity;
    const linkIdx = linkMatch && linkMatch.index !== undefined ? linkMatch.index : Infinity;

    if (boldIdx === Infinity && linkIdx === Infinity) {
      parts.push(currentText);
      break;
    }

    if (boldIdx < linkIdx) {
      const before = currentText.substring(0, boldIdx);
      const matchText = boldMatch![1];
      parts.push(before);
      parts.push(
        <strong key={`b-${keyIdx++}`} className="font-bold">
          {matchText}
        </strong>
      );
      currentText = currentText.substring(boldIdx + boldMatch![0].length);
    } else {
      const before = currentText.substring(0, linkIdx);
      const linkText = linkMatch![1];
      const linkUrl = linkMatch![2];
      parts.push(before);
      parts.push(
        <a
          key={`a-${keyIdx++}`}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#c02b2b] hover:underline"
        >
          {linkText}
        </a>
      );
      currentText = currentText.substring(linkIdx + linkMatch![0].length);
    }
  }

  return parts.length > 0 ? parts : text;
}
