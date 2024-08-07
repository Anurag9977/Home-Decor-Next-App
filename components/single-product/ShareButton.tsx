"use client";

import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { GoShareAndroid } from "react-icons/go";
import {
  EmailIcon,
  EmailShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

type ShareButtonProps = {
  productID: string;
  name: string;
  company: string;
  description: string;
};

function ShareButton({
  productID,
  name,
  company,
  description,
}: ShareButtonProps) {
  const appURL = process.env.NEXT_PUBLIC_APP_URL;
  const shareURL = `${appURL}/products/${productID}`;
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon">
            <GoShareAndroid className="text-lg" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          side="top"
          sideOffset={10}
          className="w-full flex items-center gap-x-2"
        >
          <LinkedinShareButton
            url={shareURL}
            title={`${company} - ${name}`}
            summary={description}
          >
            <LinkedinIcon size={28} round />
          </LinkedinShareButton>
          <TwitterShareButton url={shareURL} title={name} hashtags={[company]}>
            <TwitterIcon size={28} round />
          </TwitterShareButton>
          <EmailShareButton url={shareURL} subject={name} body={description}>
            <EmailIcon size={28} round />
          </EmailShareButton>
        </PopoverContent>
      </Popover>
    </div>
  );
}
export default ShareButton;
