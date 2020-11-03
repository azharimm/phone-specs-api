# Phone Specifications API
The data is based on gsmarena site
## 1. List Brands
```
[ENDPOINT] /brands
```
```
[GET] http://api-mobilespecs.azharimm.tk/brands?page=2&limit=5&search=&sort=brand:desc
```
### Query params
| params        | desc | required |
| --------------- |:---------:|:---------:|
| page | page of the data | `no` |
| limit | limit data being showed | `no` |
| search | search brand by query | `no` |
| sort | sorting data by field available | `no` |

## 2. List Phones
```
[ENDPOINT] /brands/{brand_slug}
```
```
[GET] http://api-mobilespecs.azharimm.tk/brands/samsung?page=2&limit=5&sort=brand:desc
```
### Query params
| params        | desc | required |
| --------------- |:---------:|:---------:|
| page | page of the data | `no` |
| limit | limit data being showed | `no` |
| sort | sorting data by field available | `no` |

## 3. Phone Specifications
```
[ENDPOINT] /brands/{brand_slug}/{phone_slug}
```
```
[GET] http://api-mobilespecs.azharimm.tk/brands/samsung/galaxy-note20-ultra-5g
```

## 4. Search
```
[ENDPOINT] /search
```
```
[GET] http://api-mobilespecs.azharimm.tk/search?query= Galaxy Note
```
### Query params
| params        | desc | required |
| --------------- |:---------:|:---------:|
| query | search query | `yes` |

## 4. Scrape
just in case there is a new data available in gsmarena or the data you need is not available yet on this api. you can scrape the data manually using this endpoint.
```
[ENDPOINT] /scrape
```
```
[GET] http://api-mobilespecs.azharimm.tk/scrape?url=https://www.gsmarena.com/samsung_galaxy_tab_s7+-10336.php
```
### Query params
| params        | desc | required |
| --------------- |:---------:|:---------:|
| url | url page you want to scrape | `yes` |
