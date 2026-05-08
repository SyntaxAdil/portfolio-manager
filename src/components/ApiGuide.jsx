"use client";

import { useState } from "react";

import { Copy, Check, Eye, EyeOff, Info } from "lucide-react";
import { authClient } from "../lib/auth/auth-client";
import { Button } from "./ui/button";

const ApiGuide = () => {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URI;
  const projectsUrl = `${baseUrl}/api/projects/userId`;

  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(projectsUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="my-8 mx-auto max-w-md">
      <h2 className="text-lg font-medium mb-1">API Integration</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Use this endpoint to fetch your projects publicly.
      </p>

      {/* URL */}
      <div className="border rounded-lg p-5 mb-3">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
          Your projects URL
        </p>
        <div className="flex items-center gap-2">
          <code className="flex-1 text-xs bg-muted px-3 py-2 rounded-md break-all">
            {projectsUrl}
          </code>
          <Button size="sm" variant="outline" onClick={handleCopy}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      </div>

      {/* User ID */}
      <div className="border rounded-lg p-5 mb-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            Your User ID
          </p>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setRevealed((p) => !p)}
          >
            {revealed ? <EyeOff size={14} /> : <Eye size={14} />}
            {revealed ? "Hide" : "Reveal"}
          </Button>
        </div>
        <code className="block text-sm bg-muted px-3 py-2 rounded-md tracking-widest">
          {revealed ? userId : "••••••••••••••••••••••••"}
        </code>
      </div>

      {/* Instructions */}
      <div className="border rounded-lg p-5 mb-3">
        <p className="text-sm font-medium mb-3">Setup instructions</p>
        <ol className="flex flex-col gap-2 list-decimal pl-4">
          <li className="text-sm text-muted-foreground leading-relaxed">
            Create a{" "}
            <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
              .env.local
            </code>{" "}
            file in your project root.
          </li>
          <li className="text-sm text-muted-foreground leading-relaxed">
            Add{" "}
            <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
              USER_ID=your_user_id
            </code>{" "}
            — reveal and copy your ID above.
          </li>
          <li className="text-sm text-muted-foreground leading-relaxed">
            Copy the URL above and use it in your{" "}
            <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
              fetch()
            </code>{" "}
            call.
          </li>
        </ol>
      </div>

      {/* Note */}
      <div className="flex items-start gap-2 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-md px-4 py-3">
        <Info size={15} className="text-blue-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
          This endpoint is <strong className="font-medium">GET only</strong>.
          For adding or editing projects, use the web app directly.
        </p>
      </div>
    </section>
  );
};

export default ApiGuide;
