import React from "react";
import { 
  Twitter, 
  Linkedin, 
  Facebook, 
  Share2, 
  Mail, 
  X, 
  Copy 
} from "lucide-react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface SocialShareProps {
  title?: string;
  description?: string;
  hashtags?: string[];
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  buttonText?: string;
  showLabel?: boolean;
}

export const SocialShare: React.FC<SocialShareProps> = ({
  title = "Vibe Coding Conference 2026 | Houston, TX",
  description = "Join the most vibrant tech event of 2026. Five days of coding, connection, and creativity in Houston, TX.",
  hashtags = ["VibeCoding2026", "TechConference", "Houston"],
  className = "",
  variant = "outline",
  size = "default",
  buttonText = "Share",
  showLabel = false,
}) => {
  const { toast } = useToast();
  const url = window.location.href;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const encodedHashtags = encodeURIComponent(hashtags.join(","));

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=${encodedHashtags}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${url}`
  };

  const shareToSocial = (platform: keyof typeof shareLinks) => {
    const shareUrl = shareLinks[platform];
    window.open(shareUrl, "_blank", "width=600,height=450");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Link copied!",
        description: "Conference URL has been copied to clipboard",
      });
    }).catch(() => {
      toast({
        variant: "destructive",
        title: "Copy failed",
        description: "Failed to copy the link to clipboard",
      });
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant={variant} 
          size={size} 
          className={`flex items-center ${className}`}
        >
          <Share2 className="h-4 w-4 mr-2" />
          {buttonText}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2">
        <div className="grid gap-2">
          <h3 className="font-medium text-sm mb-1">Share this event</h3>
          <div className="flex flex-wrap gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => shareToSocial("twitter")}
                    className="h-9 w-9 rounded-full bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white"
                  >
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only">Share on Twitter</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share on Twitter</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => shareToSocial("facebook")}
                    className="h-9 w-9 rounded-full bg-[#1877F2] hover:bg-[#1877F2]/90 text-white"
                  >
                    <Facebook className="h-4 w-4" />
                    <span className="sr-only">Share on Facebook</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share on Facebook</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => shareToSocial("linkedin")}
                    className="h-9 w-9 rounded-full bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">Share on LinkedIn</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share on LinkedIn</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => shareToSocial("email")}
                    className="h-9 w-9 rounded-full bg-gray-500 hover:bg-gray-600 text-white"
                  >
                    <Mail className="h-4 w-4" />
                    <span className="sr-only">Share via Email</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share via Email</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={copyToClipboard}
                    className="h-9 w-9 rounded-full bg-gray-700 hover:bg-gray-800 text-white"
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy Link</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy Link</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          {showLabel && (
            <div className="text-xs text-gray-500 mt-2">
              Help spread the word about Vibe Coding Conference 2026!
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SocialShare;