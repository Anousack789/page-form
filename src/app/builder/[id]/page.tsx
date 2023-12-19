import { GetFormById } from "@/actions/form";
import FormBuilder from "@/components/FormBuilder";
import { notFound } from "next/navigation";
import React from "react";
interface Props {
  params: {
    id: string;
  };
}
async function BuilderPage({ params: { id } }: Props) {
  //   throw new Error("Text Error");
  const form = await GetFormById(id);
  if (!form) {
    return notFound();
  }
  return <FormBuilder form={form} />;
}

export default BuilderPage;
