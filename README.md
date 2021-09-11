## Important Notes:
Hi i've updated this api, if you're currently using this API please take a look at the new `/v2` endpoint and consider using it since the original version is about to be terminated anytime soon. Thanks!

# Phone Specifications API
The data is based on gsmarena site
## 1. List Brands
```
[ENDPOINT] /v2/brands
```
```
[GET] https://api-mobilespecs.azharimm.site/v2/brands
```

## 2. List Phones
```
[ENDPOINT] /v2/brands/{brand_slug}
```
```
[GET] https://api-mobilespecs.azharimm.site/v2/brands/apple-phones-48?page=2
```
### Query params
| params        | desc | required |
| --------------- |:---------:|:---------:|
| page | page of the data | `no` |


## 3. Phone Specifications
```
[ENDPOINT] /v2/brands/{brand_slug}/{phone_slug}
```
```
[GET] https://api-mobilespecs.azharimm.site/v2/apple_iphone_12_pro_max-10237
```

## 4. Search
```
[ENDPOINT] /v2/search
```
```
[GET] http://api-mobilespecs.azharimm.site/v2/search?query= iPhone 12 pro max
```
### Query params
| params        | desc | required |
| --------------- |:---------:|:---------:|
| query | search query | `yes` |

## 5. Latest
```
[ENDPOINT] /v2/latest
```
```
[GET] https://api-mobilespecs.azharimm.site/v2/latest
```

## 6. Top By Interest
```
[ENDPOINT] /v2/top-by-interest
```
```
[GET] https://api-mobilespecs.azharimm.site/v2/top-by-interest
```

## 7. Top By Fans
```
[ENDPOINT] /v2/top-by-fans
```
```
[GET] https://api-mobilespecs.azharimm.site/v2/top-by-fans
```

