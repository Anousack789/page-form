import React from "react";
import { Button } from "../ui/button";
import { View } from "lucide-react";

function PreviewDialogBtn() {
  return (
    <Button variant={"outline"} className="gap-2 h-full">
      <View size={16} />
      Preview
    </Button>
  );
}

export default PreviewDialogBtn;
