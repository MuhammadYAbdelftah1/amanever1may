"use client";

import type { Block } from "@/lib/chatbot/types";
import { ExternalLink, Calendar, Star, Crown, Percent, Wallet, Gift, MapPin, Building2, Ticket, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface BlocksRendererProps {
  blocks: Block[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  calendar: Calendar,
  star: Star,
  crown: Crown,
  percent: Percent,
  wallet: Wallet,
  gift: Gift,
  "map-pin": MapPin,
  "building-2": Building2,
  ticket: Ticket,
  "file-text": FileText,
};

export function BlocksRenderer({ blocks }: BlocksRendererProps) {
  return (
    <div className="flex flex-col gap-2">
      {blocks.map((block, index) => (
        <BlockRenderer key={index} block={block} />
      ))}
    </div>
  );
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "text":
      return <TextBlock text={block.text} />;

    case "card":
      return (
        <CardBlock
          title={block.title}
          body={block.body}
          icon={block.icon}
          href={block.href}
        />
      );

    case "list":
      return <ListBlock items={block.items} />;

    case "link":
      return (
        <LinkBlock
          label={block.label}
          href={block.href}
          external={block.external}
        />
      );

    case "divider":
      return <div className="border-t border-slate-200 my-2" />;

    case "image":
      return (
        <Image
          src={block.src}
          alt={block.alt}
          width={300}
          height={200}
          className="rounded-lg max-w-full h-auto"
        />
      );

    default:
      return null;
  }
}

function TextBlock({ text }: { text: string }) {
  // Support basic markdown: **bold** and [label](url)
  const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);

  return (
    <p className="text-sm leading-relaxed">
      {parts.map((part, i) => {
        // Bold
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold">
              {part.slice(2, -2)}
            </strong>
          );
        }

        // Link
        const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
        if (linkMatch) {
          const [, label, url] = linkMatch;
          return (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:underline"
            >
              {label}
            </a>
          );
        }

        return <span key={i}>{part}</span>;
      })}
    </p>
  );
}

function CardBlock({
  title,
  body,
  icon,
  href,
}: {
  title: string;
  body?: string;
  icon?: string;
  href?: string;
}) {
  const Icon = icon ? iconMap[icon] : null;

  const content = (
    <div className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-xl hover:border-emerald-300 transition-colors">
      {Icon && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
          <Icon className="w-5 h-5 text-emerald-600" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-slate-900 text-sm">{title}</h4>
        {body && <p className="text-xs text-slate-600 mt-1">{body}</p>}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </Link>
    );
  }

  return content;
}

function ListBlock({ items }: { items: Array<{ label: string; value: string }> }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-start gap-3 px-3 py-2 border-b border-slate-100 last:border-b-0"
        >
          <span className="text-xs text-slate-600 flex-shrink-0">{item.label}</span>
          <span className="text-xs font-medium text-slate-900 text-end">
            <bdi>{item.value}</bdi>
          </span>
        </div>
      ))}
    </div>
  );
}

function LinkBlock({
  label,
  href,
  external,
}: {
  label: string;
  href: string;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-full text-sm font-medium hover:bg-emerald-700 transition-colors w-fit"
    >
      {label}
      {external && <ExternalLink className="w-4 h-4" />}
    </Link>
  );
}
