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

    if (line.startsWith("# ")) {
      elements.push(
        <h1 key={i} className="text-2xl font-sans font-bold tracking-tight border-b border-[var(--border-subtle)] pb-1 mt-6 mb-4 text-[var(--text-primary)]">
          {line.slice(2)}
        </h1>
      );
    } else if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-xl font-sans font-bold tracking-tight mt-5 mb-3 text-[var(--text-primary)]">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-lg font-mono font-bold mt-4 mb-2 text-[var(--text-primary)] uppercase tracking-wide">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={i} className="border-l-2 border-[var(--accent)] pl-4 py-1 italic text-sm text-[var(--text-secondary)] my-4 font-sans bg-[var(--bg-secondary)]/40 rounded-r">
          {parseInlineMarkdown(line.slice(2))}
        </blockquote>
      );
    } else if (line.startsWith("![") && line.includes("](")) {
      const altStart = 2;
      const altEnd = line.indexOf("](");
      const urlStart = altEnd + 2;
      const urlEnd = line.indexOf(")", urlStart);
      const alt = line.substring(altStart, altEnd);
      const url = line.substring(urlStart, urlEnd);
      elements.push(
        <div key={i} className="border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-2 my-6 rounded-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt={alt}
            className="max-w-full h-auto grayscale contrast-125 object-cover mx-auto rounded"
          />
          <span className="text-[10px] font-mono text-[var(--text-muted)] text-center block mt-1.5">
            {alt}
          </span>
        </div>
      );
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      inList = true;
      listItems.push(
        <li key={`li-${i}`} className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {parseInlineMarkdown(line.slice(2))}
        </li>
      );
    } else {
      elements.push(
        <p key={i} className="text-sm font-sans leading-relaxed text-[var(--text-secondary)] my-3">
          {parseInlineMarkdown(line)}
        </p>
      );
    }
  }

  if (inList) {
    elements.push(
      <ul key="list-end" className="list-disc pl-6 my-4 font-sans space-y-1.5 text-[var(--text-secondary)]">
        {listItems}
      </ul>
    );
  }

  return <div className="space-y-2">{elements}</div>;
}

function parseInlineMarkdown(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let currentText = text;
  let keyIdx = 0;

  while (currentText) {
    const boldMatch = currentText.match(/\*\*(.*?)\*\*/);
    const linkMatch = currentText.match(/\[(.*?)\]\((.*?)\)/);

    const boldIdx =
      boldMatch && boldMatch.index !== undefined ? boldMatch.index : Infinity;
    const linkIdx =
      linkMatch && linkMatch.index !== undefined ? linkMatch.index : Infinity;

    if (boldIdx === Infinity && linkIdx === Infinity) {
      parts.push(currentText);
      break;
    }

    if (boldIdx < linkIdx) {
      const before = currentText.substring(0, boldIdx);
      const matchText = boldMatch![1];
      parts.push(before);
      parts.push(
        <strong key={`b-${keyIdx++}`} className="font-bold text-[var(--text-primary)]">
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
          className="text-[var(--accent)] hover:underline font-medium"
        >
          {linkText}
        </a>
      );
      currentText = currentText.substring(linkIdx + linkMatch![0].length);
    }
  }

  return parts.length > 0 ? parts : text;
}
