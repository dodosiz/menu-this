import { Menu } from "@prisma/client";

export const BASE_MENU: Omit<Menu, "userId" | "id" | "template"> = {
  brand_color: "#319795",
  title_color: "#319795",
  name_color: "#2d3748",
  description_color: "#718096",
  brand_margin: 10,
  title_margin: 10,
  name_margin: 2,
  name_title_margin: 5,
  brand_size: "xl",
  title_size: "lg",
  name_size: "md",
  description_size: "1em",
  brand_font: "'Open Sans', sans-serif",
  title_font: "'Open Sans', sans-serif",
  content_font: "'Raleway', sans-serif",
  background_color: "#fdfdfd",
};

export const templateToMenu: { [key: string]: Partial<Menu> } = {
  light: {
    background_color: "#E3F6FF",
    brand_color: "#84C9BB",
    title_color: "#84C9BB",
    name_color: "#84C9BB",
    description_color: "#84C9BB",
    brand_font: "'Montserrat', sans-serif",
    title_font: "'Montserrat', sans-serif",
    content_font: "'Montserrat', sans-serif",
  },
  pastel: {
    brand_color: "#B08BBB",
    title_color: "#B08BBB",
    name_color: "#B08BBB",
    description_color: "#B08BBB",
    background_color: "#F5F5DC",
    brand_font: "'Roboto', sans-serif",
    title_font: "'Roboto', sans-serif",
    content_font: "'Roboto', sans-serif",
  },
  vintage: {
    background_color: "#4D455D",
    brand_color: "#F5E9CF",
    title_color: "#F5E9CF",
    name_color: "#F5E9CF",
    description_color: "#F5E9CF",
    brand_font: "'Playfair Display', serif",
    title_font: "'Playfair Display', serif",
    content_font: "'Playfair Display', serif",
  },
  retro: {
    background_color: "#4E6E81",
    brand_color: "#F9DBBB",
    title_color: "#F9DBBB",
    name_color: "#F9DBBB",
    description_color: "#F9DBBB",
    brand_font: "'Raleway', sans-serif",
    title_font: "'Raleway', sans-serif",
    content_font: "'Raleway', sans-serif",
  },
  summer: {
    background_color: "#FFF1DC",
    brand_color: "#3A98B9",
    title_color: "#3A98B9",
    name_color: "#3A98B9",
    description_color: "#3A98B9",
    brand_font: "'Montserrat', sans-serif",
    title_font: "'Montserrat', sans-serif",
    content_font: "'Montserrat', sans-serif",
  },
  dark: {
    background_color: "#1A120B",
    brand_color: "#E5E5CB",
    title_color: "#E5E5CB",
    name_color: "#E5E5CB",
    description_color: "#E5E5CB",
    brand_font: "'Open Sans', sans-serif",
    title_font: "'Open Sans', sans-serif",
    content_font: "'Open Sans', sans-serif",
  },
};

export const BACKGROUND_IMG: { [k: string]: { path: string; alt: string } } = {
  burger: {
    path: "/background/burger.jpg",
    alt: "A juicy burger",
  },
  burger_2: {
    path: "/background/burger_2.jpg",
    alt: "Double beef burger",
  },
  red_wine: {
    path: "/background/red_wine.jpg",
    alt: "Red wine",
  },
  white_wine: {
    path: "/background/white_wine.jpg",
    alt: "White wine",
  },
  beer: {
    path: "/background/beer.jpg",
    alt: "Blonde beer",
  },
  beer_2: {
    path: "/background/beer_2.jpg",
    alt: "Beer variety",
  },
  bread: {
    path: "/background/bread.jpg",
    alt: "Healthy bread",
  },
  coffee: {
    path: "/background/coffee.jpg",
    alt: "Cold coffee",
  },
  coffee_2: {
    path: "/background/coffee_2.jpg",
    alt: "Warm coffee",
  },
  hot_dog: {
    path: "/background/hot_dog.jpg",
    alt: "Hot dogs",
  },
  spaghetti: {
    path: "/background/spaghetti.jpg",
    alt: "Spaghetti",
  },
};
