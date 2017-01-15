## V0.1

# Product Management
## Pages
### main page
- EGG (carousel)
- header/footer/special (use current view)
- product category thumbnail
- show max 12 categories per page
- thumbnail ratio TBD
- pagination

### category page
- EGG (carousel)
- categorydescription
- product listing (follow current view)
- pagination
- (sort popularity?)

### product detail page
- if a generated page, need to have creator’s info in its meta page for sharing
- need to be editable from backend, currently it is editable by directly accessing MySQL database

### info page (keep old one)

## Products

- Dynamic (Generated) products can know its parent, so it can be traced back to its origin

- Static (user-uploaded) products will be uploaded by a user or an admin, will the following info: category, type, svg, thumbnail, title, short description, long description, price, price_original, size, and colors

## Product Page (product_detail) show
- within product detail page, users can select between different types
and colors
- A dynamic (generated) product will inherit specific details from its parent
- A static (user-uploaded) product will have its details defined by its uploader/admin

## Randomly generate a product from Dynamic Product.
- If an item is purchased (when check out is clicked), send request to
backend and generate a product. (if there are multiple items in the
cart, create multiple products)
- The newly created products will need thumbnails, and these
thumbnails will be determined based on the type and color PURCHASED (all other characteristics will follow its parent)
- Run a Crontab job to remove hidden products (cronjob 決定要刪除 的原因不會是因為 hide is set to 1, need to have another attribute. 因為有些 item 有時候會被 hide 起來)
- How to determine if a product has not yet been created, by its image

## All Products (Dynamic/Static) will belong to a Category
- All products must belong to a category, i.e. samurai, brotherhood,
etc.
- A dynamic (generated) product will inherit its original EGG, will copy its title, short description, long description, price, price_original, size, colors
- A static (user-uploaded) product will have its info filled by the uploader/admin

## Porting UI to New Platform
## Analytics
- product
  - purchased times
  - view count
- category
  - view count
- others

## Section Management
## Enable/ Disable Section Session Management
