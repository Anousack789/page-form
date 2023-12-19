import { ArrowUpFromLine } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

function PublishFormBtn() {
  return (
    <Button className="gap-2 text-white bg-gradient-to-t from-indigo-400 to-cyan-400">
      <ArrowUpFromLine size={16} />
      Publish
    </Button>
  );
}

export default PublishFormBtn;
