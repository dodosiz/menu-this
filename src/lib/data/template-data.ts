import { Menu } from "./menu";

export const BASE_MENU: Omit<Menu, "userId" | "template"> = {
  brandColor: "#319795",
  titleColor: "#319795",
  nameColor: "#2d3748",
  descriptionColor: "#718096",
  brandMargin: 200,
  titleMargin: 200,
  nameMargin: 10,
  nameTitleMargin: 100,
  brandSize: "2xl",
  titleSize: "lg",
  nameSize: "md",
  descriptionSize: "1em",
  brandFont: "'Open Sans', sans-serif",
  titleFont: "'Open Sans', sans-serif",
  contentFont: "'Raleway', sans-serif",
  backgroundColor: "#fdfdfd",
};

export const templateToMenu: { [key: string]: Partial<Menu> } = {
  pastel: {
    brandColor: "#B08BBB",
    titleColor: "#B08BBB",
    nameColor: "#B08BBB",
    descriptionColor: "#B08BBB",
    backgroundColor: "#F5F5DC",
    brandFont: "'Gloria Hallelujah', cursive",
    titleFont: "'Roboto', sans-serif",
    contentFont: "'Roboto', sans-serif",
  },
  vintage: {
    backgroundColor: "#4D455D",
    brandColor: "#F5E9CF",
    titleColor: "#F5E9CF",
    nameColor: "#F5E9CF",
    descriptionColor: "#F5E9CF",
    brandFont: "'Lato', sans-serif",
    titleFont: "'Lato', sans-serif",
    contentFont: "'Lato', sans-serif",
  },
  retro: {
    backgroundColor: "#4E6E81",
    brandColor: "#F9DBBB",
    titleColor: "#F9DBBB",
    nameColor: "#F9DBBB",
    descriptionColor: "#F9DBBB",
    brandFont: "'Raleway', sans-serif",
    titleFont: "'Raleway', sans-serif",
    contentFont: "'Raleway', sans-serif",
  },
  summer: {
    backgroundColor: "#FFF1DC",
    brandColor: "#3A98B9",
    titleColor: "#3A98B9",
    nameColor: "#3A98B9",
    descriptionColor: "#3A98B9",
    brandFont: "'Handlee', cursive",
    titleFont: "'Montserrat', sans-serif",
    contentFont: "'Montserrat', sans-serif",
  },
  dark: {
    backgroundColor: "#1A120B",
    brandColor: "#E5E5CB",
    titleColor: "#E5E5CB",
    nameColor: "#E5E5CB",
    descriptionColor: "#E5E5CB",
    brandFont: "'Gloria Hallelujah', cursive",
    titleFont: "'Open Sans', sans-serif",
    contentFont: "'Open Sans', sans-serif",
  },
  warm: {
    backgroundColor: "#FCDDB0",
    brandColor: "#E97777",
    titleColor: "#E97777",
    nameColor: "#E97777",
    descriptionColor: "#E97777",
    brandFont: "'Playfair Display', serif",
    titleFont: "'Playfair Display', serif",
    contentFont: "'Playfair Display', serif",
  },
  cold: {
    backgroundColor: "#C0EEF2",
    brandColor: "#181823",
    titleColor: "#181823",
    nameColor: "#181823",
    descriptionColor: "#181823",
    brandFont: "'Montserrat', sans-serif",
    titleFont: "'Montserrat', sans-serif",
    contentFont: "'Montserrat', sans-serif",
  },
  coffee: {
    backgroundColor: "#F8EAD8",
    brandColor: "#A7727D",
    titleColor: "#A7727D",
    nameColor: "#A7727D",
    descriptionColor: "#A7727D",
    brandFont: "'Lato', sans-serif",
    titleFont: "'Lato', sans-serif",
    contentFont: "'Lato', sans-serif",
  },
  food: {
    backgroundColor: "#0A1D37",
    brandColor: "#FFEEDB",
    titleColor: "#FFEEDB",
    nameColor: "#FFEEDB",
    descriptionColor: "#FFEEDB",
    brandFont: "'Beth Ellen', cursive",
    titleFont: "'Raleway', sans-serif",
    contentFont: "'Raleway', sans-serif",
  },
};

interface ImageData {
  path: string;
  alt: string;
}
type ImageDataMap = { [k: string]: ImageData };

export const BACKGROUND_IMG: { [k: string]: ImageDataMap } = {
  Burger: {
    burger: {
      path: "/background/burger.jpg",
      alt: "A juicy burger",
    },
    burger_2: {
      path: "/background/burger_2.jpg",
      alt: "Double beef burger",
    },
  },
  "Meat and grill": {
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
  },
  Italian: {
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
  },
  Wine: {
    red_wine: {
      path: "/background/red_wine.jpg",
      alt: "Red wine",
    },
    white_wine: {
      path: "/background/white_wine.jpg",
      alt: "White wine",
    },
  },
  Beer: {
    beer: {
      path: "/background/beer.jpg",
      alt: "Blonde beer",
    },
    beer_2: {
      path: "/background/beer_2.jpg",
      alt: "Beer variety",
    },
  },
  "Coffee and tea": {
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
  },
  Bread: {
    bread: {
      path: "/background/bread.jpg",
      alt: "Healthy bread",
    },
    bread_2: {
      path: "/background/bread_2.jpg",
      alt: "Healthy bread",
    },
  },
};

export function getImageData(name: string): ImageData {
  for (const sectionKey of Object.keys(BACKGROUND_IMG)) {
    const section = BACKGROUND_IMG[sectionKey];
    if (!!section[name]) {
      return section[name];
    }
  }
  return { alt: "", path: "" };
}
