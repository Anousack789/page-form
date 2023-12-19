"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db/prisma";
import { formSchemaType } from "@/schemas/form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
class UserNotFoundErr extends Error {}
export async function GetFormStats() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    // return redirect("/login");
    throw new UserNotFoundErr();
  }
  const { user } = session;
  const stats = await prisma.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });
  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;
  let submissionRate = 0;
  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;
  return {
    visits,
    submissionRate,
    submissions,
    bounceRate,
  };
}

export async function CreateForm(data: formSchemaType) {
  // const validation = formSchema.safeParse(data);
  // if (!validation.success) {
  //   throw new Error("form not valid");
  // }
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return redirect("/login");
  }
  const form = await prisma.form.create({
    data: {
      ...data,
      userId: session.user.id,
    },
  });

  return form.id;
}

export const GetForms = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new UserNotFoundErr();
  }
  try {
    const forms = await prisma.form.findMany({});
    return forms;
  } catch (err: any) {
    throw err;
  }
};

export const GetFormById = async (id: string) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new UserNotFoundErr();
  }
  try {
    const form = await prisma.form.findUnique({
      where: {
        id,
      },
    });
    return form;
  } catch (err: any) {
    throw err;
  }
};
