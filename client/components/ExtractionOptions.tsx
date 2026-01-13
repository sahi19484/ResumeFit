import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, Copy, CheckCircle2, Code } from "lucide-react";

interface ExtractionOptionsProps {
  extractionScript: string;
  onManualEntry: () => void;
  linkedInUrl: string;
}

export default function ExtractionOptions({
  extractionScript,
  onManualEntry,
  linkedInUrl,
}: ExtractionOptionsProps) {
  const [copied, setCopied] = useState(false);

  const copyScriptToClipboard = () => {
    navigator.clipboard.writeText(extractionScript).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-semibold">LinkedIn blocks automated access</p>
            <p className="mt-1">
              We tried automatic extraction, but LinkedIn requires manual data access. Choose one of the methods below:
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Method 1: Browser Console */}
        <Card className="p-6 border-2 hover:border-blue-400 transition-colors">
          <div className="flex items-start gap-3 mb-4">
            <Code className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg">Method 1: Browser Console</h3>
              <p className="text-sm text-muted-foreground">Fastest - 2 minutes</p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="space-y-2 text-sm">
              <p className="font-semibold">Steps:</p>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li>Open your LinkedIn profile</li>
                <li>Press <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">F12</kbd> (or <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Cmd+Option+I</kbd> on Mac)</li>
                <li>Go to the <strong>Console</strong> tab</li>
                <li>Paste the script below</li>
                <li>Press <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Enter</kbd></li>
                <li>Your profile data copies automatically!</li>
                <li>Paste JSON into the form below</li>
              </ol>
            </div>

            <div className="bg-black rounded p-3 font-mono text-xs text-green-400 max-h-32 overflow-y-auto">
              <div className="opacity-75">$ paste script...</div>
            </div>

            <Button
              onClick={copyScriptToClipboard}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Script Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Extraction Script
                </>
              )}
            </Button>
          </div>

          <div className="text-xs text-muted-foreground bg-gray-50 rounded p-2">
            <p>💡 <strong>Pro Tip:</strong> The script will automatically copy your profile data to your clipboard when done!</p>
          </div>
        </Card>

        {/* Method 2: Manual Form */}
        <Card className="p-6 border-2 hover:border-green-400 transition-colors">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg">Method 2: Manual Entry</h3>
              <p className="text-sm text-muted-foreground">Safest - 5 minutes</p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="space-y-2 text-sm">
              <p className="font-semibold">What to copy from your profile:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li><strong>Name:</strong> Your profile heading</li>
                <li><strong>Headline:</strong> Professional summary under your name</li>
                <li><strong>Location:</strong> City, State/Country</li>
                <li><strong>Skills:</strong> From endorsed skills section</li>
                <li><strong>Experience:</strong> Job titles, companies, dates</li>
                <li><strong>Education:</strong> School names, degrees, dates</li>
              </ul>
            </div>

            <Button
              onClick={onManualEntry}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Fill Form Manually
            </Button>
          </div>

          <div className="text-xs text-muted-foreground bg-gray-50 rounded p-2">
            <p>✓ <strong>No Tech Required:</strong> Just copy-paste your info from LinkedIn into our form</p>
          </div>
        </Card>
      </div>

      {/* Additional Info */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <p className="text-sm text-blue-900 font-semibold mb-2">Why Manual Extraction?</p>
        <p className="text-sm text-blue-800">
          LinkedIn actively blocks automated bots to protect user data. We respect that! Our hybrid approach gives you options:
          <br />
          <br />
          <strong>Browser Method:</strong> Works because you're already logged in to LinkedIn in your browser.
          <br />
          <strong>Manual Method:</strong> Puts you in 100% control of your data.
        </p>
      </Card>
    </div>
  );
}
