import React from "react";
import { Button } from "../ui/button";
import { Save } from "lucide-react";

function SaveFormBtn() {
  return (
    <Button variant={"outline"} className="gap-2 h-full">
      <Save size={16} />
      Save
    </Button>
  );
}

export default SaveFormBtn;
