import { Menu } from "@prisma/client";

export const BASE_MENU: Omit<Menu, "userId" | "id" | "template"> = {
  title_color: "#319795",
  name_color: "#2d3748",
  description_color: "#718096",
  title_margin: 10,
  name_margin: 2,
  name_title_margin: 5,
  title_size: "lg",
  name_size: "md",
  description_size: "1em",
  title_font: "'Open Sans', sans-serif",
  content_font: "'Raleway', sans-serif",
  background_color: "#fdfdfd",
};

export const templateToMenu: { [key: string]: Partial<Menu> } = {
  light: {
    background_color: "#E3F6FF",
    title_color: "#84C9BB",
    name_color: "#84C9BB",
    description_color: "#84C9BB",
    title_font: "'Montserrat', sans-serif",
    content_font: "'Montserrat', sans-serif",
  },
  pastel: {
    title_color: "#B08BBB",
    name_color: "#B08BBB",
    description_color: "#B08BBB",
    background_color: "#F5F5DC",
    title_font: "'Roboto', sans-serif",
    content_font: "'Roboto', sans-serif",
  },
  vintage: {
    background_color: "#4D455D",
    title_color: "#F5E9CF",
    name_color: "#F5E9CF",
    description_color: "#F5E9CF",
    title_font: "'Playfair Display', serif",
    content_font: "'Playfair Display', serif",
  },
  retro: {
    background_color: "#4E6E81",
    title_color: "#F9DBBB",
    name_color: "#F9DBBB",
    description_color: "#F9DBBB",
    title_font: "'Raleway', sans-serif",
    content_font: "'Raleway', sans-serif",
  },
  summer: {
    background_color: "#FFF1DC",
    title_color: "#3A98B9",
    name_color: "#3A98B9",
    description_color: "#3A98B9",
    title_font: "'Montserrat', sans-serif",
    content_font: "'Montserrat', sans-serif",
  },
  dark: {
    background_color: "#1A120B",
    title_color: "#E5E5CB",
    name_color: "#E5E5CB",
    description_color: "#E5E5CB",
    title_font: "'Open Sans', sans-serif",
    content_font: "'Open Sans', sans-serif",
  },
};
