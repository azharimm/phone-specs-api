## Important Notes:

Hi i've updated this api, if you're currently using this API please take a look at the new `/v2` endpoint and consider using it since the original version is about to be terminated anytime soon. Thanks!

## Donation

If you like this project, you can give me a cup of coffee :)

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://saweria.co/azharimm)

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/azharimm)

# Phone Specifications API

The data is based on gsmarena site

## 1. List Brands

```
[ENDPOINT] /brands
```

```
[GET] https://api-mobilespecs.azharimm.dev/brands
```

## 2. List Phones

```
[ENDPOINT] /brands/{brand_slug}
```

```
[GET] https://api-mobilespecs.azharimm.dev/brands/apple-phones-48?page=2
```

### Query params

| params |       desc       | required |
| ------ | :--------------: | :------: |
| page   | page of the data |   `no`   |

## 3. Phone Specifications

```
[ENDPOINT] /brands/{brand_slug}/{phone_slug}
```

```
[GET] https://api-mobilespecs.azharimm.dev/apple_iphone_12_pro_max-10237
```

## 4. Search

```
[ENDPOINT] /search
```

```
[GET] http://api-mobilespecs.azharimm.dev/search?query= iPhone 12 pro max
```

### Query params

| params |     desc     | required |
| ------ | :----------: | :------: |
| query  | search query |  `yes`   |

## 5. Latest

```
[ENDPOINT] /latest
```

```
[GET] https://api-mobilespecs.azharimm.dev/latest
```

## 6. Top By Interest

```
[ENDPOINT] /top-by-interest
```

```
[GET] https://api-mobilespecs.azharimm.dev/top-by-interest
```

## 7. Top By Fans

```
[ENDPOINT] /top-by-fans
```

```
[GET] https://api-mobilespecs.azharimm.dev/top-by-fans
```
