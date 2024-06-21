import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // throw new Error('Failed to fetch meals');
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug: string) {
  new Promise((resolve) => setTimeout(resolve, 2000));
  const stmt = db.prepare("SELECT * FROM meals WHERE slug = ?");
  return stmt.get(slug);
}

export async function saveMeal(meal: any) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extenstion = meal.image.name.split(".").pop();
  const filename = `${meal.slug}.${extenstion}`;

  const stream = fs.createWriteStream(`public/images/${filename}`);
  const bufferImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferImage), (error: any) => {
    if (error) {
      throw new Error("Failed to save image");
    }
  });

  meal.image = `/images/${filename}`;

  db.prepare(
    `INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug) 
    VALUES (
      @title, @summary, @instructions, @creator, @creator_email, @image, @slug)`
  ).run(meal);
}
