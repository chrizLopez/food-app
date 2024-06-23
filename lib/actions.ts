"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

const isInvalidText = (text: string) => {
  return !text || text.length < 3 || text.trim() === "";
};

export const shareMeal = async (prevState: any, formdata: any) => {
  const mealData = {
    creator: formdata.get("name"),
    creator_email: formdata.get("email"),
    title: formdata.get("title"),
    summary: formdata.get("summary"),
    instructions: formdata.get("instructions"),
    image: formdata.get("image"),
  };

  // validate
  if (
    isInvalidText(mealData.creator) ||
    isInvalidText(mealData.creator_email) ||
    isInvalidText(mealData.title) ||
    isInvalidText(mealData.summary) ||
    isInvalidText(mealData.instructions) ||
    !mealData.creator_email.includes("@") ||
    !mealData.image ||
    mealData.image.size === 0
  ) {
    return {
      message: "Invalid input",
    };
  }

  await saveMeal(mealData);
  revalidatePath("/meals");
  redirect("/meals");
};
