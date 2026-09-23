## Important Notes:

Hi I've updated this API, if you're currently still using the old one, please migrate to the new `/v2` endpoint now that the original version has been terminated.

## Donation

If you like this project, please consider buying me a cup of coffee 😊

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://saweria.co/azharimm)

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/azharimm)

# Phone Specifications API

The data is based on the [GSM Arena](https://gsmarena.com) website.

## 1. List Brands

```
[ENDPOINT] /brands
```

```
[GET] https://phone-specs-api-2.azharimm.dev/brands
```

## 2. List Phones

```
[ENDPOINT] /brands/{brand_slug}
```

```
[GET] https://phone-specs-api-2.azharimm.dev/brands/apple-phones-48?page=2
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
[GET] https://phone-specs-api-2.azharimm.dev/apple_iphone_12_pro_max-10237
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
[GET] https://phone-specs-api-2.azharimm.dev/latest
```

## 6. Top By Interest

```
[ENDPOINT] /top-by-interest
```

```
[GET] https://phone-specs-api-2.azharimm.dev/top-by-interest
```

## 7. Top By Fans

```
[ENDPOINT] /top-by-fans
```

```
[GET] https://phone-specs-api-2.azharimm.dev/top-by-fans
```
