# How to Add Images — Australian by Design

The website code is fully ready. All you need to do is download the images below
and save them into this `images/` folder with the exact filenames listed.

---

## STEP 1 — Download the logo (most important)

Open this URL in your browser, then right-click the image and choose "Save image as…"

| Save as                              | Download from                                                                              |
|--------------------------------------|--------------------------------------------------------------------------------------------|
| `australian-by-design-logo.png`      | https://www.australianbydesign.com.au/wp-content/uploads/2020/12/logo-hd.png              |

This replaces the old "AUSTRALIAN BY DESIGN" text in every page header.

---

## STEP 2 — Download the product and hero images

Same process — open each URL, right-click the image, "Save image as…"

| Save as this filename           | Download from this URL                                                                     | Used for                            |
|---------------------------------|--------------------------------------------------------------------------------------------|-------------------------------------|
| `hero-gifts.jpg`                | https://www.australianbydesign.com.au/wp-content/uploads/2024/10/Christmas-300x300.webp   | Hero banner on the home page        |
| `flora-koala.jpg`               | https://www.australianbydesign.com.au/wp-content/uploads/2024/10/Koala-180x180.webp       | Decoration Flora Koala              |
| `flora-kangaroo.jpg`            | https://www.australianbydesign.com.au/wp-content/uploads/2024/10/Kangaroo-180x180.webp    | Decoration Flora Kangaroo           |
| `gumleaf-kookaburra.jpg`        | https://www.australianbydesign.com.au/wp-content/uploads/2024/11/Kookaburra-180x180.webp  | Decoration Gumleaf Kookaburra       |
| `christmas-tree-card.jpg`       | https://www.australianbydesign.com.au/wp-content/uploads/2024/11/Card1-180x180.webp       | Christmas Tree Card                 |
| `christmas-koala.jpg`           | https://www.australianbydesign.com.au/wp-content/uploads/2024/11/Koala-180x180.webp       | Christmas Koala Decoration          |
| `christmas-kangaroo.jpg`        | https://www.australianbydesign.com.au/wp-content/uploads/2024/11/Kangaroo-180x180.webp    | Christmas Kangaroo Decoration       |
| `festive-christmas-tree.jpg`    | https://www.australianbydesign.com.au/wp-content/uploads/2024/10/Festive-180x180.webp     | Festive Christmas Tree Decoration   |
| `animal-decoration-box.jpg`     | https://www.australianbydesign.com.au/wp-content/uploads/2024/11/Box1-180x180.webp        | Box of Animal Christmas Decoration  |

> **Tip:** The website URLs end in `.webp` but you can save them with a `.jpg`
> extension — browsers display both formats correctly, and your filenames say `.jpg`.

---

## STEP 3 — Check your images/ folder

After saving, your `images/` folder should contain these files:

```
images/
  australian-by-design-logo.png   ← logo (most important!)
  hero-gifts.jpg
  flora-koala.jpg
  flora-kangaroo.jpg
  gumleaf-kookaburra.jpg
  christmas-tree-card.jpg
  christmas-koala.jpg
  christmas-kangaroo.jpg
  festive-christmas-tree.jpg
  animal-decoration-box.jpg       ← extra image (for future use)
```

Spelling matters — use lowercase letters and hyphens, no spaces.

---

## STEP 4 — Open the website

Open `index.html` in your browser. Everything should appear automatically.
No other code changes are needed.

---

## What the code does (for your tutor)

### Logo
Every page header now has:
```html
<a class="logo-link" href="index.html">
  <img src="images/australian-by-design-logo.png"
       alt="Australian by Design logo"
       class="site-logo" />
</a>
```
This replaces the old `<p class="logo">AUSTRALIAN BY DESIGN</p>` text.
The `<a>` makes the logo a clickable link back to the home page.

### Cart and Account icons
The old "C" and "A" letters have been replaced with SVG icons:
```html
<!-- Cart icon — two shapes drawn with code, no library needed -->
<svg class="cart-icon" viewBox="0 0 24 24" ...>
  <circle cx="9" cy="21" r="1"/>   <!-- left wheel -->
  <circle cx="20" cy="21" r="1"/>  <!-- right wheel -->
  <path d="M1 1h4l2.68 13.39..."/> <!-- basket shape -->
</svg>
```
SVG stands for Scalable Vector Graphic. It is an image format written
directly in HTML using shapes like `<circle>` and `<path>`.
`stroke="currentColor"` makes the icon draw in the same colour as the
button it sits inside, so we never need to hardcode a hex colour.

### Product images
Every `<img>` tag uses two CSS classes:
- A size class (e.g. `.grid-img`) — sets the width and height
- `.product-img` — adds `object-fit: cover` (crops to fill without stretching)
  and `border-radius: 16px` (rounded corners matching the card design)

### Image paths in JavaScript
The `PRODUCTS` array in `cart.js` now has an `img` field:
```javascript
{ id: 0, name: "Decoration Flora Koala", price: 15.00, img: "images/flora-koala.jpg" }
```
This means `product.html` and `cart.html` can automatically show the right
product image by reading `PRODUCTS[id].img` in JavaScript.
