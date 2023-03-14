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
  brand_size: "2xl",
  title_size: "lg",
  name_size: "md",
  description_size: "1em",
  brand_font: "'Open Sans', sans-serif",
  title_font: "'Open Sans', sans-serif",
  content_font: "'Raleway', sans-serif",
  background_color: "#fdfdfd",
};

export const templateToMenu: { [key: string]: Partial<Menu> } = {
  pastel: {
    brand_color: "#B08BBB",
    title_color: "#B08BBB",
    name_color: "#B08BBB",
    description_color: "#B08BBB",
    background_color: "#F5F5DC",
    brand_font: "'Gloria Hallelujah', cursive",
    title_font: "'Roboto', sans-serif",
    content_font: "'Roboto', sans-serif",
  },
  vintage: {
    background_color: "#4D455D",
    brand_color: "#F5E9CF",
    title_color: "#F5E9CF",
    name_color: "#F5E9CF",
    description_color: "#F5E9CF",
    brand_font: "'Lato', sans-serif",
    title_font: "'Lato', sans-serif",
    content_font: "'Lato', sans-serif",
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
    brand_font: "'Handlee', cursive",
    title_font: "'Montserrat', sans-serif",
    content_font: "'Montserrat', sans-serif",
  },
  dark: {
    background_color: "#1A120B",
    brand_color: "#E5E5CB",
    title_color: "#E5E5CB",
    name_color: "#E5E5CB",
    description_color: "#E5E5CB",
    brand_font: "'Gloria Hallelujah', cursive",
    title_font: "'Open Sans', sans-serif",
    content_font: "'Open Sans', sans-serif",
  },
  warm: {
    background_color: "#FCDDB0",
    brand_color: "#E97777",
    title_color: "#E97777",
    name_color: "#E97777",
    description_color: "#E97777",
    brand_font: "'Playfair Display', serif",
    title_font: "'Playfair Display', serif",
    content_font: "'Playfair Display', serif",
  },
  cold: {
    background_color: "#C0EEF2",
    brand_color: "#181823",
    title_color: "#181823",
    name_color: "#181823",
    description_color: "#181823",
    brand_font: "'Montserrat', sans-serif",
    title_font: "'Montserrat', sans-serif",
    content_font: "'Montserrat', sans-serif",
  },
  coffee: {
    background_color: "#F8EAD8",
    brand_color: "#A7727D",
    title_color: "#A7727D",
    name_color: "#A7727D",
    description_color: "#A7727D",
    brand_font: "'Lato', sans-serif",
    title_font: "'Lato', sans-serif",
    content_font: "'Lato', sans-serif",
  },
  food: {
    background_color: "#0A1D37",
    brand_color: "#FFEEDB",
    title_color: "#FFEEDB",
    name_color: "#FFEEDB",
    description_color: "#FFEEDB",
    brand_font: "'Beth Ellen', cursive",
    title_font: "'Raleway', sans-serif",
    content_font: "'Raleway', sans-serif",
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
  steak: {
    path: "/background/steak.jpg",
    alt: "Steak",
  },
  steak_2: {
    path: "/background/steak_2.jpg",
    alt: "Steak",
  },
  hot_dog: {
    path: "/background/hot_dog.jpg",
    alt: "Hot dogs",
  },
  spaghetti: {
    path: "/background/spaghetti.jpg",
    alt: "Spaghetti",
  },
  risotto: {
    path: "/background/risotto.jpg",
    alt: "Risotto",
  },
  pizza: {
    path: "/background/pizza.jpg",
    alt: "Pizza",
  },
  pizza_2: {
    path: "/background/pizza_2.jpg",
    alt: "Pizza",
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
  bread_2: {
    path: "/background/bread_2.jpg",
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
  tea: {
    path: "/background/tea.jpg",
    alt: "Tea",
  },
};
