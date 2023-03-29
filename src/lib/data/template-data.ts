import { Menu } from "./menu";

export const BASE_MENU: Omit<Menu, "userId" | "template"> = {
  brandColor: "#319795",
  titleColor: "#319795",
  nameColor: "#2d3748",
  descriptionColor: "#718096",
  brandMargin: 200,
  titleMargin: 100,
  nameMargin: 10,
  nameTitleMargin: 50,
  brandSize: "2xl",
  titleSize: "md",
  nameSize: "sm",
  descriptionSize: "1em",
  brandFont: "'Open Sans', sans-serif",
  titleFont: "'Open Sans', sans-serif",
  contentFont: "'Raleway', sans-serif",
  backgroundColor: "#fdfdfd",
  categoryVariant: "none",
  productVariant: "none",
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
    categoryVariant: "inverse",
    productVariant: "bordered",
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
    categoryVariant: "underlined",
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
    categoryVariant: "inverse",
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
    categoryVariant: "inverse",
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
    categoryVariant: "underlined",
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
    categoryVariant: "underlined",
    productVariant: "underlined",
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
    productVariant: "bordered",
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
    categoryVariant: "bordered",
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
    categoryVariant: "underlined",
  },
};

interface ImageData {
  path: string;
  alt: string;
}
type ImageDataMap = { [k: string]: ImageData };

export const BACKGROUND_IMG: { [k: string]: ImageDataMap } = {
  Beer: {
    beer1: {
      path: "/background/beer/beer1.jpg",
      alt: "Beers variety on table",
    },
    beer2: {
      path: "/background/beer/beer2.jpg",
      alt: "A 0,5 liter beer",
    },
    beer3: {
      path: "/background/beer/beer3.jpg",
      alt: "Beer with nice foam",
    },
    beer4: {
      path: "/background/beer/beer4.jpg",
      alt: "Beers variety on table",
    },
    beer5: {
      path: "/background/beer/beer5.jpg",
      alt: "Blonde beers",
    },
    beer6: {
      path: "/background/beer/beer6.jpg",
      alt: "Beer tasting",
    },
  },
  Wine: {
    wine1: {
      path: "/background/wine/wine1.jpg",
      alt: "Glasses of wine on barel",
    },
    wine2: {
      path: "/background/wine/wine2.jpg",
      alt: "Three glasses of white wine",
    },
    wine3: {
      path: "/background/wine/wine3.jpg",
      alt: "Red wine pouring in glass",
    },
    wine4: {
      path: "/background/wine/wine4.jpg",
      alt: "Red wine pouring in glass",
    },
    wine5: {
      path: "/background/wine/wine5.jpg",
      alt: "Wine by the beach",
    },
    wine6: {
      path: "/background/wine/wine6.jpg",
      alt: "Two glasses of red wine",
    },
  },
  Coffee: {
    coffee1: {
      path: "/background/coffee/coffee1.jpg",
      alt: "Esspresso with coffee beans",
    },
    coffee2: {
      path: "/background/coffee/coffee2.jpg",
      alt: "Warm esspresso shot",
    },
    coffee3: {
      path: "/background/coffee/coffee3.jpg",
      alt: "Fiter coffee",
    },
    coffee4: {
      path: "/background/coffee/coffee4.jpg",
      alt: "Coffee to go",
    },
    coffee5: {
      path: "/background/coffee/coffee5.jpg",
      alt: "Cold coffee variants",
    },
    coffee6: {
      path: "/background/coffee/coffee6.jpg",
      alt: "Two esspresso shots",
    },
  },
  Tea: {
    tea1: {
      path: "/background/tea/tea1.jpg",
      alt: "Tea with tea pot",
    },
    tea2: {
      path: "/background/tea/tea2.jpg",
      alt: "Black tea on table",
    },
    tea3: {
      path: "/background/tea/tea3.jpg",
      alt: "Green tea detox",
    },
    tea4: {
      path: "/background/tea/tea4.jpg",
      alt: "Black tea with bread",
    },
    tea5: {
      path: "/background/tea/tea5.jpg",
      alt: "Tea with pot",
    },
    tea6: {
      path: "/background/tea/tea6.jpg",
      alt: "Black tea",
    },
  },
  Drinks: {
    drink1: {
      path: "/background/drinks/drink1.jpg",
      alt: "Whiskey coctail",
    },
    drink2: {
      path: "/background/drinks/drink2.jpg",
      alt: "Three exotic coctails",
    },
    drink3: {
      path: "/background/drinks/drink3.jpg",
      alt: "Whiskey sour",
    },
    drink4: {
      path: "/background/drinks/drink4.jpg",
      alt: "Three refreshing coctails",
    },
    drink5: {
      path: "/background/drinks/drink5.jpg",
      alt: "Bottles of drinks",
    },
    drink6: {
      path: "/background/drinks/drink6.jpg",
      alt: "Red coctail",
    },
  },
  "Meat plates": {
    grill1: {
      path: "/background/grill/grill1.jpg",
      alt: "Steak on grill",
    },
    grill2: {
      path: "/background/grill/grill2.jpg",
      alt: "Steaks on wood",
    },
    grill3: {
      path: "/background/grill/grill3.jpg",
      alt: "Hot dogs",
    },
    grill4: {
      path: "/background/grill/grill4.jpg",
      alt: "Burger with fries",
    },
    grill5: {
      path: "/background/grill/grill5.jpg",
      alt: "Burger",
    },
    grill6: {
      path: "/background/grill/grill6.jpg",
      alt: "Meat plate",
    },
  },
  Bread: {
    bread1: {
      path: "/background/bread/bread1.jpg",
      alt: "Whole grain bread",
    },
    bread2: {
      path: "/background/bread/bread2.jpg",
      alt: "Bread",
    },
    bread3: {
      path: "/background/bread/bread3.jpg",
      alt: "Croisson",
    },
  },
  Salat: {
    salat1: {
      path: "/background/salat/salat1.jpg",
      alt: "Salat with croutons",
    },
    salat2: {
      path: "/background/salat/salat2.jpg",
      alt: "Salat bowl",
    },
    salat3: {
      path: "/background/salat/salat3.jpg",
      alt: "Salat variety",
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
  return { alt: "Uploaded image", path: name };
}
